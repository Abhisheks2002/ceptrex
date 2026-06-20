# Changelog

All notable changes to this project. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · SemVer.

## [Unreleased]
### Added
- Full documentation set: `README`, `DEPLOYMENT`, `SECURITY`, `CONTRIBUTING`, `API_REFERENCE`, `PROJECT_ARCHITECTURE`, `GITHUB_SETUP`, `VERCEL_SETUP`, `SUPABASE_SETUP`, `CHANGELOG`.
- `.env.example` and `.env.production.example` env catalogs.

## [0.4.0] — 2026-06-04
### Added
- Cal.com inline booking on `/book-call` with scrollable container and dark theme tokens.
- "Book a Call" CTA in Hero → `/book-call`.

### Changed
- All contact emails unified to `hello@ceptrex.com`.
- Contact page "Book direct" routes to `/book-call`.

### Removed
- WhatsApp contact card.
- Admin link from Footer → Company.

## [0.3.0]
### Added
- CEPTREX brand lockup (`Logo` component) across Nav, Footer, Hero, AI chat widget.
- 8-service catalog including Website Building and App Development.
- Favicon system: `favicon.png` (512), `favicon-32.png`, `apple-touch-icon.png`.
- Cookie consent banner.
- `robots.txt` and `sitemap.xml` routes.

### Removed
- Founding Team section from About.

## [0.2.0]
### Added
- Portfolio, Case Studies, Industries, Pricing, Process, Tech Stack, Resources, Blog, ROI Calculator, AI Audit pages.
- Lead-capture server function (`submitLead`) with Zod validation.
- Branded 500 error page + 404 boundary.

## [0.1.0]
### Added
- Initial TanStack Start scaffold on Cloudflare Workers.
- Tailwind v4 design tokens (oklch) + shadcn/ui primitives.
- Marketing home page (Hero, Services, Portfolio, Testimonials, FAQ, CTA).
