# Deployment

Ceptrex is a **Cloudflare Worker** application built with TanStack Start. The build emits a Worker bundle at `dist/` driven by `wrangler.jsonc` + `@cloudflare/vite-plugin`.

---

## 1. Local Development

```bash
bun install
cp .env.example .env
bun run dev          # http://localhost:5173
```

Hot reload is on. Server functions (`src/lib/*.functions.ts`) run inside the Vite SSR worker that mirrors the Cloudflare runtime.

---

## 2. Production Build

```bash
bun run build
# Output: dist/ (Cloudflare Worker bundle + client assets)
```

To smoke-test the production bundle locally:

```bash
bun run preview
```

---

## 3. Deploy via Lovable (recommended)

1. Open the project in [Lovable](https://lovable.dev).
2. Click **Publish → Update**.
3. Frontend changes go live after the publish step; server functions deploy on every push.

Custom domain: **Project Settings → Domains** → add your domain → update DNS.

---

## 4. Cloudflare Workers (manual)

`wrangler.jsonc` already targets the Workers runtime with `nodejs_compat`.

```bash
bun add -d wrangler
bunx wrangler login
bunx wrangler deploy
```

Set secrets:

```bash
bunx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret put LOVABLE_API_KEY
```

Public (build-time) vars live in `wrangler.jsonc` under `vars`, or in Cloudflare Dashboard → Worker → Settings → Variables.

---

## 5. Vercel

See [`VERCEL_SETUP.md`](./VERCEL_SETUP.md). High-level:

| Setting           | Value                       |
|-------------------|-----------------------------|
| Framework preset  | Other / Vite                |
| Build command     | `bun run build`             |
| Install command   | `bun install`               |
| Output directory  | `dist/client`               |
| Node version      | 20.x                        |

Add every variable from `.env.production.example` under **Project → Settings → Environment Variables** (Production scope).

---

## 6. Netlify

```toml
# netlify.toml
[build]
  command = "bun run build"
  publish = "dist/client"

[build.environment]
  NODE_VERSION = "20"
```

Add env vars under **Site → Build & deploy → Environment**.

---

## 7. Custom VPS / Docker

```dockerfile
FROM oven/bun:1-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
EXPOSE 8787
CMD ["bunx", "wrangler", "dev", "--port", "8787", "--ip", "0.0.0.0"]
```

For real production prefer Cloudflare Workers — running a Worker bundle on a Node host requires a compatibility shim.

---

## Environment Variables

| Variable                        | Where to set                | Required for                |
|---------------------------------|------------------------------|-----------------------------|
| `VITE_SITE_URL`                 | Host env (build-time)        | Correct OG / canonical URLs |
| `VITE_SUPABASE_URL` + `_PUBLISHABLE_KEY` | Host env (build-time) | Lovable Cloud features      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Host **secret** (runtime)    | Admin server functions      |
| `RESEND_API_KEY`                | Host **secret** (runtime)    | Lead email notifications    |
| `LOVABLE_API_KEY`               | Host **secret** (runtime)    | Ask Ceptra chat             |
| `SENTRY_DSN`                    | Host secret                  | Error monitoring            |

Full catalog: [`.env.example`](./.env.example).

---

## Rollback

- **Lovable**: Project → Version history → Restore.
- **Cloudflare**: `bunx wrangler rollback <version-id>`.
- **Vercel**: Deployments tab → click previous deployment → **Promote to Production**.

---

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| `Failed to resolve import "@/..."` | Missing file or stale install | `bun install`; verify file path |
| `[unenv] X is not implemented yet!` | Using a Node-only API in Worker | Replace with a Web-standard / fetch-based lib |
| `Unauthorized: No authorization header provided` | ServerFn protected by `requireSupabaseAuth` called without session | Wrap caller in `_authenticated/` or call from a logged-in component |
| Cal embed blank | Wrong `calLink` | Update `src/components/widgets/CalBooking.tsx` |
| 500 on prod, fine in dev | Node-only dep bundled | Swap to a Worker-compatible package |
