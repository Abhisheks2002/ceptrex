# Security Policy

## Reporting a Vulnerability

Email **hello@ceptrex.com** with the subject `SECURITY: <short title>`. Do **not** open a public GitHub issue for security reports. We acknowledge within 48 hours and aim to remediate critical issues within 7 days.

---

## Security Model

### Secrets
- Build-time public values use the `VITE_` prefix and are bundled into the client. Treat them as public.
- Server-only secrets (e.g. `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LOVABLE_API_KEY`) are injected at runtime via the host's secret manager (Cloudflare Workers Secrets, Vercel Encrypted Env, etc.). They are **never** committed to Git and **never** imported from any file consumed by client code.
- `.env`, `.env.local`, `.env.production`, `.dev.vars` are all gitignored.

### Server functions
- Every `createServerFn` call validates its input with **Zod** (`src/lib/leads.functions.ts`).
- Auth-protected functions use the `requireSupabaseAuth` middleware (when Lovable Cloud is enabled).
- The browser auth token is attached automatically by `attachSupabaseAuth` registered in `src/start.ts`.

### Server routes (`src/routes/api/`)
- Public webhook endpoints under `/api/public/*` MUST verify a signature (e.g. HMAC) before processing.
- Never return PII or service-role keys from public endpoints.

### XSS / CSRF
- React 19 escapes all rendered content by default.
- We never use `dangerouslySetInnerHTML` with user input.
- Form submissions go through serverFn RPC over same-origin POST; CSRF is mitigated by the bearer-token model.

### Headers (recommended)
Add at the edge (Cloudflare → Rules → Transform Rules):
```
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://app.cal.com; style-src 'self' 'unsafe-inline'; frame-src https://app.cal.com;
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Rate limiting
Use Cloudflare WAF Rate Limiting Rules on `/api/*` (e.g. 30 req/min per IP).

### Secret rotation
Rotate every 90 days, immediately on suspected exposure:
1. Generate new key in the provider dashboard.
2. Update the host secret (`wrangler secret put …` or Vercel UI).
3. Redeploy.
4. Revoke the old key.

### Dependency hygiene
- `bun update` monthly.
- Run `bun pm audit` (or `npm audit`) and resolve high/critical findings.

### OWASP Top 10 checklist
- [x] A01 Broken Access Control — `_authenticated/` route gate + serverFn middleware
- [x] A02 Cryptographic Failures — HTTPS-only, secrets in host vault
- [x] A03 Injection — Zod-validated inputs, parameterised Supabase queries
- [x] A05 Security Misconfiguration — strict CSP recommended above
- [x] A07 Identification & Auth — Supabase Auth (when enabled)
- [x] A09 Logging — Worker `console.error` shipped to Cloudflare Logs / Sentry
