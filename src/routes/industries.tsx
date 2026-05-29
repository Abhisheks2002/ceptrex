import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { industries } from "@/data/industries";

export const Route = createFileRoute("/industries")({
  component: IndustriesIndex,
  head: () => ({
    meta: [
      { title: "Industries — Ceptrex" },
      { name: "description", content: "AI automation playbooks for healthcare, real estate, e-commerce, finance, SaaS and logistics." },
      { property: "og:title", content: "Industries — Ceptrex" },
      { property: "og:description", content: "Industry-specific AI playbooks." },
    ],
  }),
});

function IndustriesIndex() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Industries" title="AI playbooks built" highlight="for your industry" subtitle="Vertical-specific architectures, compliance and integrations." />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((i) => (
            <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="group rounded-2xl border border-border bg-surface/60 backdrop-blur p-7 hover:border-primary/50 transition-all hover:-translate-y-1">
              <div className="text-4xl mb-4">{i.emoji}</div>
              <h3 className="font-display text-xl font-semibold mb-2">{i.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i.hero}</p>
              <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                <div>
                  <div className="font-display text-2xl font-bold text-gradient">{i.caseStudy.metric}</div>
                  <div className="text-xs text-muted-foreground">{i.caseStudy.label}</div>
                </div>
                <div className="text-sm text-cyan group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
