# Project Architecture

## High level

```text
                ┌────────────────────────────────────────────┐
   Browser ───▶ │  Cloudflare Worker  (src/server.ts)        │
                │   ├─ TanStack Start SSR handler            │
                │   ├─ /_serverFn/*  → createServerFn RPCs   │
                │   └─ /api/*        → file-based HTTP routes│
                └─────────────┬──────────────────────────────┘
                              │
                ┌─────────────┼──────────────┐
                ▼             ▼              ▼
            Supabase     Resend/Email    AI Gateway
           (optional)     (optional)     (optional)
```

## Frontend

- **TanStack Router** with **file-based routing** in `src/routes/`. The router is auto-generated to `src/routeTree.gen.ts` (do not edit).
- **TanStack Query** for data fetching. Loaders use `context.queryClient.ensureQueryData()` and components read with `useSuspenseQuery`.
- **React 19** with Suspense streaming SSR.
- **Tailwind v4** with design tokens (oklch) in `src/styles.css`. Components use semantic tokens (`bg-background`, `text-foreground`, `border-border`, `text-cyan`, etc.).
- **shadcn/ui** primitives under `src/components/ui/`.
- **Marketing components** under `src/components/site/` (Nav, Hero, Services, Portfolio, Footer, CookieBanner, AIChatWidget, …).
- **Branded boundaries** — every route declares `errorComponent` + `notFoundComponent`; the root declares a global 404.

## Backend (Cloudflare Worker)

- `src/server.ts` wraps the TanStack Start server entry, captures unhandled errors, and renders `src/lib/error-page.ts` as a branded 500 page.
- `src/start.ts` registers `attachSupabaseAuth` as a global serverFn middleware so the browser session token is attached to every RPC automatically.
- Server functions live in `src/lib/*.functions.ts`. Each one declares `inputValidator(zod)` and `handler({data, context})`.
- Server routes (HTTP endpoints, webhooks) live in `src/routes/api/`.

## Data flow — lead submission

```text
ContactPage  ──(useServerFn)──▶  submitLead serverFn  ──▶  Zod validation
       │                                                       │
       │◀─────── { ok, id } ──────────────────────────────────┘
                                                       (future) Resend / Supabase insert
```

## Booking flow

```text
/book-call route  ──▶  CalBooking component  ──▶  Cal.com iframe (public embed)
```

No backend involvement; the public Cal.com username is hardcoded as `ceptrex/30min`.

## Build pipeline

```text
bun install
   │
   ▼
vite build  (vite.config.ts → @lovable.dev/vite-tanstack-config)
   │   ├─ tanstackStart plugin (SSR + serverFn transform + code-splitter)
   │   ├─ @tailwindcss/vite
   │   └─ @cloudflare/vite-plugin   ← emits Worker bundle
   ▼
dist/   (client assets + Worker entry → wrangler.jsonc main = src/server.ts)
   │
   ▼
wrangler deploy   (or Lovable Publish)
```

## Runtime constraints

The app runs on Cloudflare Workers with `nodejs_compat` enabled. Avoid:
- `child_process`, `sharp`, `puppeteer`, native addons
- File-watching, raw TCP daemons, dynamic `require`

Safe: `fs` (virtual), `crypto`, `Buffer`, `stream`, fetch.

## SEO architecture

- Every route file declares its own `head()` with `title`, `description`, OG, Twitter.
- Dynamic routes (`portfolio.$slug`, `case-studies.$slug`, …) derive metadata from loader data.
- `/robots.txt` and `/sitemap.xml` are TanStack route files emitting `text/plain` and `application/xml`.
- JSON-LD on key landing pages (e.g. `/book-call` → `Service` schema).

## Folder map (quick lookup)

| Concern | Path |
|---|---|
| Pages | `src/routes/` |
| Server functions | `src/lib/*.functions.ts` |
| Marketing UI | `src/components/site/` |
| Reusable primitives | `src/components/ui/` |
| Brand assets | `src/assets/`, `public/` |
| Static content (services, cases, …) | `src/data/` |
| Design tokens | `src/styles.css` |
| Worker entry | `src/server.ts` |
| Worker config | `wrangler.jsonc` |
