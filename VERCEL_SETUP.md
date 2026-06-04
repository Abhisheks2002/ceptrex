# Vercel Setup

> Ceptrex is built primarily for **Cloudflare Workers** (see `wrangler.jsonc`). Vercel deployment is supported as a static + edge fallback by building the client and serving SSR via a Vercel edge function. Prefer Cloudflare for production.

## 1. Import the repository
1. Log in to <https://vercel.com>.
2. **Add New → Project → Import** your `ceptrex-lovable` repo.
3. Authorize the Vercel GitHub app for the org.

## 2. Build settings

| Setting           | Value                |
|-------------------|----------------------|
| Framework Preset  | **Other**            |
| Build Command     | `bun run build`      |
| Install Command   | `bun install`        |
| Output Directory  | `dist/client`        |
| Node Version      | `20.x`               |
| Root Directory    | `./`                 |

Bun on Vercel: enable under **Settings → General → Build & Development → Install Command** = `bun install`. Vercel auto-detects Bun when a `bun.lock` exists.

## 3. Environment variables

Add under **Project → Settings → Environment Variables** (Production + Preview):

| Name | Scope | Value source |
|---|---|---|
| `VITE_SITE_URL` | Public | your production URL |
| `VITE_SUPABASE_URL` | Public | Supabase project |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Encrypted** | Supabase service role |
| `RESEND_API_KEY` | **Encrypted** | Resend dashboard |
| `LOVABLE_API_KEY` | **Encrypted** | Lovable AI Gateway |
| `SENTRY_DSN` | **Encrypted** | Sentry project |

Mirror everything in `.env.production.example`.

## 4. Domains
**Settings → Domains → Add** → enter `ceptrex.com` → follow DNS instructions (A + CNAME or NS delegation).

SSL is automatic.

## 5. Deploy
Pushes to `main` deploy to Production. Pushes to any other branch create Preview deploys with their own URL.

## 6. Monitoring
- **Analytics**: enable Vercel Web Analytics (free tier).
- **Logs**: Project → Deployments → click a deployment → **Functions** tab.
- **Error tracking**: wire `SENTRY_DSN` per [`SECURITY.md`](./SECURITY.md).

## 7. Rollback
**Deployments → previous successful deploy → ⋯ → Promote to Production.**
