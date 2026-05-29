import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { cases } from "@/data/cases";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudiesIndex,
  head: () => ({
    meta: [
      { title: "Case Studies — Ceptrex" },
      { name: "description", content: "Detailed case studies of AI agents and automation systems we've shipped across SaaS, real estate, healthcare and finance." },
      { property: "og:title", content: "AI Case Studies — Ceptrex" },
      { property: "og:description", content: "Results that compound. Real metrics from real deployments." },
    ],
  }),
});

function CaseStudiesIndex() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Case studies" title="Results that" highlight="compound" subtitle="180+ AI systems in production. Here are the headline stories." />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-5">
          {cases.map((c) => (
            <Link
              key={c.slug}
              to="/case-studies/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface/60 backdrop-blur p-8 hover:border-primary/50 transition-all"
            >
              <div className={`absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="relative">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">{c.industry} · {c.category}</div>
                <div className={`font-display text-5xl font-bold bg-gradient-to-br ${c.color} bg-clip-text text-transparent`}>{c.metric}</div>
                <div className="text-sm text-muted-foreground mt-1">{c.metricLabel}</div>
                <h3 className="mt-6 font-display text-xl font-semibold leading-tight">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
                <div className="mt-5 text-sm text-cyan group-hover:translate-x-1 transition-transform inline-block">Read case study →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
