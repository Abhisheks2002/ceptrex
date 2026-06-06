#!/usr/bin/env node
/**
 * build-vercel.mjs — Assembles Vercel Build Output API v3 from TanStack Start dist/
 *
 * ROOT CAUSE OF "Dynamic require of util is not supported":
 *   esbuild --format=esm bundles react-dom (a CJS package) into ESM.
 *   react-dom internally uses dynamic require("util") which is illegal in ESM bundles.
 *   FIX: use --format=cjs so CJS packages like react-dom work correctly.
 *   The handler.mjs wrapper uses require() to load the CJS bundle.
 */
import fs   from "fs";
import path from "path";
import { execSync }      from "child_process";
import { fileURLToPath } from "url";

const ROOT     = path.dirname(fileURLToPath(import.meta.url));
const DIST_CLI = path.join(ROOT, "dist/client");
const DIST_SRV = path.join(ROOT, "dist/server");
const OUT      = path.join(ROOT, ".vercel/output");
const STATIC   = path.join(OUT, "static");
const FUNC     = path.join(OUT, "functions/index.func");

// ── 0. Clean ──────────────────────────────────────────────────────────────────
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(FUNC,   { recursive: true });
fs.mkdirSync(STATIC, { recursive: true });

// ── 1. Bundle server.js into a self-contained CJS file ────────────────────────
// MUST use --format=cjs (not esm) because react-dom uses dynamic require() internally.
// ESM bundles forbid dynamic require() → "Dynamic require of util is not supported".
console.log("🔨  Bundling server → bundle.cjs (esbuild, format=cjs)...");
execSync(
  [
    "bunx esbuild",
    path.join(DIST_SRV, "server.js"),
    "--bundle",
    "--platform=node",
    "--target=node20",
    "--format=cjs",           // ← THE FIX: CJS allows dynamic require()
    `--outfile=${path.join(FUNC, "bundle.cjs")}`,
    "--external:node:*",      // keep node built-ins as external (they exist in Node runtime)
    "--log-level=error",
  ].join(" "),
  { stdio: "inherit", cwd: ROOT }
);
const bundleSize = (fs.statSync(path.join(FUNC, "bundle.cjs")).size / 1024 / 1024).toFixed(1);
console.log(`   ✓ bundle.cjs (${bundleSize} MB)`);

// ── 2. Copy server-side route chunk assets ────────────────────────────────────
const serverAssets = path.join(DIST_SRV, "assets");
if (fs.existsSync(serverAssets)) {
  copyDir(serverAssets, path.join(FUNC, "assets"));
  console.log("   ✓ server chunk assets copied");
}

// ── 3. Write Node.js req/res → Web fetch adapter ─────────────────────────────
// Uses require() (CommonJS) to load bundle.cjs — this is correct for a CJS bundle.
console.log("📝  Writing Node.js handler...");
fs.writeFileSync(path.join(FUNC, "handler.cjs"), `
"use strict";
/**
 * Vercel Node.js Serverless Function — Ceptrex SSR handler.
 * Loads the CJS server bundle and adapts Node.js req/res to Web fetch API.
 */
const { Readable } = require("node:stream");

// Load the CJS bundle synchronously (safe — module is cached after first load)
const serverBundle = require("./bundle.cjs");
const serverEntry  = serverBundle.default ?? serverBundle;

module.exports = async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const host     = req.headers["x-forwarded-host"] ?? req.headers["host"] ?? "localhost";
  const url      = protocol + "://" + host + req.url;

  // Read request body for POST/PUT/PATCH
  let body = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks = [];
    await new Promise((resolve) => {
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", resolve);
    });
    if (chunks.length > 0) body = Buffer.concat(chunks);
  }

  // Convert Node.js headers to Web Headers
  const webHeaders = new Headers();
  for (const [key, val] of Object.entries(req.headers)) {
    if (val == null) continue;
    if (Array.isArray(val)) val.forEach((v) => webHeaders.append(key, v));
    else webHeaders.set(key, val);
  }

  const webRequest = new Request(url, {
    method:  req.method,
    headers: webHeaders,
    body:    body ?? null,
    ...(body ? { duplex: "half" } : {}),
  });

  try {
    const webResponse = await serverEntry.fetch(webRequest);

    res.statusCode = webResponse.status;
    webResponse.headers.forEach((val, key) => res.setHeader(key, val));

    if (webResponse.body) {
      const reader = webResponse.body.getReader();
      const stream = new Readable({
        async read() {
          const { done, value } = await reader.read();
          done ? this.push(null) : this.push(Buffer.from(value));
        },
      });
      stream.pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error("[Ceptrex SSR Error]", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      "<!doctype html><html><body>" +
      "<h1>500 Internal Server Error</h1>" +
      "<pre>" + String(err) + "</pre>" +
      "</body></html>"
    );
  }
};
`.trimStart());

// ── 4. Vercel function config ─────────────────────────────────────────────────
fs.writeFileSync(path.join(FUNC, ".vc-config.json"), JSON.stringify({
  runtime:      "nodejs20.x",
  handler:      "handler.cjs",
  launcherType: "Nodejs",
}, null, 2));

// ── 5. Copy static client assets ─────────────────────────────────────────────
console.log("📦  Copying static assets → .vercel/output/static/");
copyDir(DIST_CLI, STATIC);

// ── 6. Vercel routing config ──────────────────────────────────────────────────
fs.writeFileSync(path.join(OUT, "config.json"), JSON.stringify({
  version: 3,
  routes: [
    {
      src: "^/assets/(.+)$",
      dest: "/assets/$1",
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    {
      src: "^/(favicon[^/]*|apple-touch-icon[^/]*)$",
      dest: "/$1",
    },
    {
      src: "/(.*)",
      dest: "/index",
    },
  ],
}, null, 2));

const nStatic = countFiles(STATIC);
console.log(`\n✅  .vercel/output ready:`);
console.log(`   • ${nStatic} static files`);
console.log(`   • Node.js SSR function (CJS bundle, nodejs20.x)\n`);

// ── Helpers ───────────────────────────────────────────────────────────────────
function copyDir(src, dest) {
  if (!fs.existsSync(src)) { console.warn("  ⚠ missing:", src); return; }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    fs.statSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
function countFiles(dir, n = 0) {
  if (!fs.existsSync(dir)) return n;
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    n = fs.statSync(p).isDirectory() ? countFiles(p, n) : n + 1;
  }
  return n;
}
