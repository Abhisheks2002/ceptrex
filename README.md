# CEPTREX — AI Automation Agency Platform

[![Built with Lovable](https://img.shields.io/badge/built%20with-Lovable-6C63FF)](https://lovable.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-EF4444)](https://tanstack.com/start)
[![Cloudflare Workers](https://img.shields.io/badge/runtime-Cloudflare%20Workers-F38020)](https://workers.cloudflare.com/)

CEPTREX is a production-ready marketing + lead-generation platform for an AI automation agency. It ships with a portfolio, case studies, services catalog, ROI calculator, Cal.com booking, contact pipeline, and a serverless backend running on Cloudflare Workers.

> Live: <https://ceptrex.com>

---

## ✨ Features

- **8 Service offerings** — AI automations, AI agents, RAG/LLM, integrations, data pipelines, dashboards, website building, app development
- **Portfolio & Case Studies** — dynamic routes with per-page SEO + JSON-LD
- **Industries pages** — vertical-specific landing pages
- **Free AI Audit + Booking** — embedded Cal.com scheduler (`/book-call`)
- **Contact pipeline** — server-validated lead capture via `createServerFn`
- **ROI Calculator** — interactive client-side calculator
- **Resources, Blog, Pricing, Process, Tech Stack** pages
- **Ask Ceptra** AI chat widget
- **SEO** — per-route `<head>`, JSON-LD, sitemap.xml, robots.txt, OpenGraph/Twitter cards
- **Branded error/404 boundaries** with SSR-error normalization
- **Cookie consent banner**

---

## 🧱 Tech Stack

| Layer            | Choice |
|------------------|--------|
| Framework        | [TanStack Start](https://tanstack.com/start) v1 (React 19, SSR) |
| Routing          | TanStack Router (file-based, `src/routes/`) |
| Data             | TanStack Query v5 |
| Build            | Vite 7 + `@lovable.dev/vite-tanstack-config` |
| Styling          | Tailwind CSS v4 (via `@tailwindcss/vite`, tokens in `src/styles.css`) |
| UI Primitives    | shadcn/ui + Radix UI + `lucide-react` |
| Validation       | Zod |
| Forms            | react-hook-form + @hookform/resolvers |
| Charts           | Recharts |
| Booking          | `@calcom/embed-react` |
| Runtime          | Cloudflare Workers (`@cloudflare/vite-plugin`, `wrangler`) |
| Package manager  | Bun (`bun.lock`) |

---

## 📁 Folder Structure

```
ceptrex/
├── public/                     # static assets (favicons, og images)
├── src/
│   ├── assets/                 # imported images (logo, icon)
│   ├── components/
│   │   ├── site/               # marketing components (Nav, Hero, Footer, …)
│   │   ├── widgets/            # CalBooking, AIChatWidget
│   │   ├── dashboard/          # internal dashboard shell
│   │   └── ui/                 # shadcn/ui primitives
│   ├── data/                   # static content: services, cases, industries, blog
│   ├── hooks/                  # custom React hooks
│   ├── integrations/           # third-party clients (placeholder)
│   ├── lib/                    # server functions (*.functions.ts), utils
│   ├── routes/                 # file-based routes (pages + API)
│   │   ├── __root.tsx          # html/head/body shell
│   │   ├── index.tsx           # /
│   │   └── api/                # server routes (HTTP endpoints)
│   ├── router.tsx              # router factory
│   ├── server.ts               # Cloudflare Worker entry (SSR + error wrap)
│   ├── start.ts                # serverFn middleware registration
│   └── styles.css              # Tailwind v4 tokens + globals
├── vite.config.ts
├── wrangler.jsonc              # Cloudflare Worker config
├── tsconfig.json
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 20
- **Bun** ≥ 1.1 (recommended) — `curl -fsSL https://bun.sh/install | bash`

### Install & run

```bash
git clone https://github.com/Abhisheks2002/ceptrex-lovable.git
cd ceptrex-lovable
bun install
bun run dev          # http://localhost:5173
```

### Build & preview

```bash
bun run build        # production build (Cloudflare Worker bundle in dist/)
bun run preview      # local preview of the production build
bun run lint         # ESLint
bun run format       # Prettier
```

---

## 🔐 Environment Variables

The current codebase does **not** require any environment variables at runtime — the Cal.com embed uses a public username and the lead form logs server-side. Variables become required only when you wire optional integrations (Supabase, Resend, AI providers, analytics).

See [`.env.example`](./.env.example) for the full catalog and [`DEPLOYMENT.md`](./DEPLOYMENT.md#environment-variables) for per-host setup.

| Variable                       | Required | Scope    | Purpose                                  |
|--------------------------------|----------|----------|------------------------------------------|
| `VITE_SITE_URL`                | optional | public   | Canonical URL used in SEO tags           |
| `VITE_SUPABASE_URL`            | optional | public   | If Lovable Cloud / Supabase is enabled   |
| `VITE_SUPABASE_PUBLISHABLE_KEY`| optional | public   | Supabase anon key                        |
| `SUPABASE_SERVICE_ROLE_KEY`    | optional | **secret** | Server-only admin client                 |
| `RESEND_API_KEY`               | optional | **secret** | Outbound email for lead notifications    |
| `LOVABLE_API_KEY`              | optional | **secret** | Lovable AI Gateway (for Ask Ceptra)      |
| `CALCOM_API_KEY`               | optional | **secret** | Only if you replace the public embed     |

---

## 🌐 Deployment

This app is a **Cloudflare Worker** (see `wrangler.jsonc`). One-click deploy via Lovable:

> Open the project in Lovable → **Publish** → choose Update.

Other targets — Vercel, Netlify, self-hosted — are documented in [`DEPLOYMENT.md`](./DEPLOYMENT.md). Cloudflare specifics live in [`DEPLOYMENT.md#cloudflare-workers`](./DEPLOYMENT.md#cloudflare-workers).

---

## 🛡️ Security

- Server functions validate every input with **Zod**
- Service-role keys are **never** imported in client code
- See [`SECURITY.md`](./SECURITY.md) for the full hardening checklist

---

## 📚 Documentation Index

| Doc | Purpose |
|---|---|
| [`PROJECT_ARCHITECTURE.md`](./PROJECT_ARCHITECTURE.md) | System & data-flow architecture |
| [`API_REFERENCE.md`](./API_REFERENCE.md) | Server functions + HTTP routes |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Cloudflare / Vercel / Netlify / VPS |
| [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) | Enabling Lovable Cloud / Supabase |
| [`VERCEL_SETUP.md`](./VERCEL_SETUP.md) | Vercel deployment walkthrough |
| [`GITHUB_SETUP.md`](./GITHUB_SETUP.md) | Repo conventions + CI |
| [`SECURITY.md`](./SECURITY.md) | Security model + hardening |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Workflow + style guide |
| [`CHANGELOG.md`](./CHANGELOG.md) | Release history |

---

## 🧪 Troubleshooting

| Symptom | Fix |
|---|---|
| `Failed to resolve import` | Run `bun install`; ensure the file/route exists. |
| Build fails on Worker | Check `wrangler.jsonc` and that no `ssr.external` is set in `vite.config.ts`. |
| Cal.com embed blank | Verify the `calLink` username in `src/components/widgets/CalBooking.tsx`. |
| 404 on refresh | TanStack Start handles SPA fallback natively — confirm the file under `src/routes/` exists. |

---

## 📜 License

Proprietary © Ceptrex. All rights reserved.

## 📬 Contact

- Email: **ceptrexai@gmail.com**
- Book a call: <https://ceptrex.com/book-call>
