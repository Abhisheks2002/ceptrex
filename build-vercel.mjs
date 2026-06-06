#!/usr/bin/env node
/**
 * build-vercel.mjs — Assembles Vercel Build Output API v3 from TanStack Start dist/
 *
 * WHY THIS EXISTS:
 *   TanStack Start builds for Cloudflare Workers by default (via @lovable.dev/vite-tanstack-config).
 *   Vercel requires a completely different output format AND runtime.
 *
 * WHAT IT DOES:
 *   1. Bundles dist/server/server.js + all npm deps into ONE self-contained file (esbuild)
 *      → eliminates "unsupported modules" edge runtime errors
 *   2. Wraps it in a Node.js Serverless Function (not Edge) that adapts Web fetch → Node req/res
 *   3. Copies dist/client/ static assets to .vercel/output/static/
 *   4. Writes Vercel routing config
 *
 * OUTPUT:
 *   .vercel/output/config.json                        — routing rules
 *   .vercel/output/static/                            — CDN-served static assets
 *   .vercel/output/functions/index.func/bundle.mjs    — fully bundled SSR handler
 *   .vercel/output/functions/index.func/handler.mjs   — Node.js req/res wrapper
 *   .vercel/output/functions/index.func/.vc-config.json
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

// ── 0. Clean ─────────────────────────────────────────────────────────────────
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(FUNC,   { recursive: true });
fs.mkdirSync(STATIC, { recursive: true });

// ── 1. Bundle server.js + all npm deps into one self-contained ESM file ──────
console.log("🔨  Bundling server → bundle.mjs (esbuild)...");
execSync(
  [
    "bunx esbuild",
    path.join(DIST_SRV, "server.js"),
    "--bundle",
    "--platform=node",
    "--target=node20",
    "--format=esm",
    `--outfile=${path.join(FUNC, "bundle.mjs")}`,
    "--external:node:*",   // keep node built-ins as-is
    "--log-level=error",   // suppress sideEffects warnings
  ].join(" "),
  { stdio: "inherit", cwd: ROOT }
);
console.log(`   ✓ bundle.mjs (${(fs.statSync(path.join(FUNC,"bundle.mjs")).size/1024/1024).toFixed(1)} MB)`);

// ── 2. Copy server assets (lazy-loaded route chunks) ────────────────────────
const serverAssets = path.join(DIST_SRV, "assets");
if (fs.existsSync(serverAssets)) {
  copyDir(serverAssets, path.join(FUNC, "assets"));
  console.log("   ✓ server chunk assets copied");
}

// ── 3. Write Node.js req/res → Web fetch adapter ────────────────────────────
console.log("📝  Writing Node.js handler wrapper...");
fs.writeFileSync(path.join(FUNC, "handler.mjs"), `
/**
 * Vercel Node.js Serverless Function handler for Ceptrex (TanStack Start SSR).
 *
 * TanStack Start's server bundle exports a Web-standard fetch handler:
 *   serverEntry.fetch(Request) => Promise<Response>
 *
 * Vercel Node.js functions use the old Node.js HTTP API (req, res).
 * This adapter bridges the two.
 */
import { Readable } from "node:stream";
import serverEntry from "./bundle.mjs";

export default async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const host     = req.headers["x-forwarded-host"] ?? req.headers["host"] ?? "localhost";
  const url      = \`\${protocol}://\${host}\${req.url}\`;

  // Read body (for POST/PUT/PATCH)
  let body = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const chunks = [];
    await new Promise((res) => { req.on("data", c => chunks.push(c)); req.on("end", res); });
    if (chunks.length > 0) body = Buffer.concat(chunks);
  }

  // Build Web Headers from Node headers
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v == null) continue;
    Array.isArray(v) ? v.forEach(x => headers.append(k, x)) : headers.set(k, v);
  }

  const webRequest = new Request(url, {
    method:  req.method,
    headers,
    body:    body ?? null,
    ...(body ? { duplex: "half" } : {}),
  });

  try {
    const webResponse = await serverEntry.fetch(webRequest);

    res.statusCode = webResponse.status;
    webResponse.headers.forEach((v, k) => res.setHeader(k, v));

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
    console.error("[Ceptrex SSR]", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(\`<!doctype html><html><body><h1>500 Internal Server Error</h1><pre>\${String(err)}</pre></body></html>\`);
  }
}
`.trimStart());

// ── 4. Vercel function config — Node.js runtime ──────────────────────────────
fs.writeFileSync(path.join(FUNC, ".vc-config.json"), JSON.stringify({
  runtime:    "nodejs20.x",
  handler:    "handler.mjs",
  launcherType: "Nodejs",
}, null, 2));

// ── 5. Copy static client assets ─────────────────────────────────────────────
console.log("📦  Copying static assets → .vercel/output/static/");
copyDir(DIST_CLI, STATIC);

// ── 6. Vercel routing config ──────────────────────────────────────────────────
fs.writeFileSync(path.join(OUT, "config.json"), JSON.stringify({
  version: 3,
  routes: [
    // Static assets — served from CDN with long cache
    {
      src: "^/assets/(.+)$",
      dest: "/assets/$1",
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    // Favicons / root-level static files
    {
      src: "^/(favicon[^/]*|apple-touch-icon[^/]*)$",
      dest: "/$1",
    },
    // All other requests → Node.js SSR function
    {
      src: "/(.*)",
      dest: "/index",
    },
  ],
}, null, 2));

const nStatic = countFiles(STATIC);
console.log(`\n✅  .vercel/output ready:`);
console.log(`   • ${nStatic} static files in .vercel/output/static/`);
console.log(`   • Node.js SSR function in .vercel/output/functions/index.func/`);
console.log(`   • Runtime: nodejs20.x (NOT edge — required for react + node:async_hooks)\n`);

// ── Helpers ───────────────────────────────────────────────────────────────────
function copyDir(src, dest) {
  if (!fs.existsSync(src)) { console.warn("  ⚠ missing:", src); return; }
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src)) {
    const s = path.join(src, e), d = path.join(dest, e);
    fs.statSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
function countFiles(dir, n = 0) {
  if (!fs.existsSync(dir)) return n;
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e);
    n = fs.statSync(p).isDirectory() ? countFiles(p, n) : n + 1;
  }
  return n;
}
