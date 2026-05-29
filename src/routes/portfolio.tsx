import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Portfolio } from "@/components/site/Portfolio";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";

const extra = [
  { industry: "Fintech", title: "Compliance copilot for KYC analysts", metric: "8x", metricLabel: "faster file review" },
  { industry: "Legal", title: "Contract-review agent across 14 firms", metric: "72%", metricLabel: "review-time saved" },
  { industry: "Logistics", title: "Voice agent for fleet dispatch", metric: "$2.4M", metricLabel: "yearly savings" },
  { industry: "Education", title: "AI tutor across 60K students", metric: "94%", metricLabel: "completion rate" },
  { industry: "Hospitality", title: "Multilingual concierge across 22 hotels", metric: "4.9★", metricLabel: "guest rating" },
  { industry: "Manufacturing", title: "Predictive-maintenance agent on factory PLCs", metric: "31%", metricLabel: "downtime cut" },
];

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Ceptrex" },
      { name: "description", content: "180+ AI agents shipped across SaaS, healthcare, real estate, e-commerce, legal, fintech and logistics." },
      { property: "og:title", content: "Portfolio — Ceptrex" },
      { property: "og:description", content: "Case studies and measurable results from 180+ AI projects." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Case studies"
        title="180+ projects."
        highlight="$42M in client revenue."
        subtitle="A selection of AI agents, automations and copilots we've shipped to production across 12 industries."
      />
      <Portfolio />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {extra.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-7 hover:border-primary/50 transition-all"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                  {c.industry}
                </div>
                <div className="font-display text-4xl font-bold text-gradient">{c.metric}</div>
                <div className="text-sm text-muted-foreground mt-1">{c.metricLabel}</div>
                <h3 className="mt-5 font-display text-lg font-semibold leading-tight">{c.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </SiteLayout>
  );
}
