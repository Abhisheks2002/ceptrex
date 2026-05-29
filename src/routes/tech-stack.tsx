import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Check } from "lucide-react";

export const Route = createFileRoute("/tech-stack")({
  head: () => ({
    meta: [
      { title: "Tech Stack — NexaForge AI" },
      { name: "description", content: "The full-stack production stack we use to ship AI agents, n8n automations and WhatsApp AI: Next.js, TanStack, Supabase, OpenAI, Anthropic, n8n, Vercel, Stripe and more." },
      { property: "og:title", content: "Tech Stack — NexaForge AI" },
      { property: "og:description", content: "Production stack behind every NexaForge AI build." },
    ],
    links: [{ rel: "canonical", href: "https://ceptrex.lovable.app/tech-stack" }],
  }),
  component: TechStackPage,
});

const stack = [
  { group: "Frontend", items: [
    { name: "Next.js / TanStack Start", why: "App router, SSR/SSG, edge-deployable, best SEO + perf" },
    { name: "TypeScript (strict)", why: "Type-safe end-to-end, fewer runtime bugs" },
    { name: "TailwindCSS v4", why: "Utility-first design tokens, consistent dark system" },
    { name: "shadcn/ui + Radix", why: "Accessible primitives, fully customizable" },
    { name: "Framer Motion", why: "Physics-based animation, layout transitions" },
    { name: "Three.js / R3F", why: "WebGL hero backgrounds when needed" },
  ]},
  { group: "Backend & Data", items: [
    { name: "Supabase (PostgreSQL)", why: "Auth, storage, realtime, RLS — production from day one" },
    { name: "Drizzle / Prisma ORM", why: "Type-safe queries, auto-generated types" },
    { name: "Upstash Redis", why: "Serverless rate limiting & caching" },
    { name: "Resend", why: "Transactional email for leads & notifications" },
  ]},
  { group: "AI & Automation", items: [
    { name: "OpenAI (GPT-4o, GPT-5)", why: "Chat, embeddings, structured extraction" },
    { name: "Anthropic Claude", why: "Long-context reasoning, agent orchestration" },
    { name: "Google Gemini", why: "Multimodal, cost-efficient classification" },
    { name: "n8n (self-hosted)", why: "Visual workflows, 400+ integrations, Git-versioned" },
    { name: "Vapi + ElevenLabs", why: "Sub-300ms latency voice agents" },
    { name: "WhatsApp Cloud API", why: "Official Meta channel for WA agents" },
  ]},
  { group: "Infra, Payments & Ops", items: [
    { name: "Vercel / Cloudflare", why: "Zero-config deploys, global CDN, edge functions" },
    { name: "Stripe", why: "Billing for productized audits & retainers" },
    { name: "Sanity CMS", why: "Structured content for blog & case studies" },
    { name: "PostHog / GA4 / Clarity", why: "Product, marketing & session analytics" },
    { name: "Sentry", why: "Error monitoring across web + agents" },
    { name: "Doppler / Vault", why: "Centralized secrets management" },
  ]},
];

function TechStackPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Tech stack"
        title="The full-stack we ship"
        highlight="every build on"
        subtitle="Production-grade, type-safe, observable. No prototypes — these are the same tools running our largest enterprise agents in production."
      />
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-6">
          {stack.map((g) => (
            <div key={g.group} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-7">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-5">// {g.group}</div>
              <ul className="space-y-4">
                {g.items.map((i) => (
                  <li key={i.name} className="flex gap-3">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">{i.name}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{i.why}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
