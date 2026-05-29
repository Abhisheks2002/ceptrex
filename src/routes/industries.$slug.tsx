import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { industries } from "@/data/industries";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries/$slug")({
  component: IndustryDetail,
  loader: ({ params }) => {
    const industry = industries.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `AI Automation for ${loaderData.industry.name} — Ceptrex` },
          { name: "description", content: loaderData.industry.hero },
          { property: "og:title", content: `AI for ${loaderData.industry.name}` },
          { property: "og:description", content: loaderData.industry.hero },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-4xl">Industry not found</h1>
      </div>
    </SiteLayout>
  ),
});

function IndustryDetail() {
  const { industry } = Route.useLoaderData();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={`Industry / ${industry.slug}`}
        title={`AI for ${industry.name}`}
        highlight={industry.emoji}
        subtitle={industry.hero}
      />
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-destructive mb-4">// Pain points</div>
            <ul className="space-y-3 text-sm">
              {industry.painPoints.map((p: string) => (
                <li key={p} className="flex gap-2"><span className="text-destructive">×</span>{p}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
            {industry.solutions.map((s: { title: string; desc: string }) => (
              <div key={s.title} className="rounded-2xl border border-border bg-surface/60 p-5">
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-surface to-primary/10 p-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-2">// Featured case study</div>
              <h3 className="font-display text-2xl font-bold">{industry.caseStudy.title}</h3>
            </div>
            <div className="text-right">
              <div className="font-display text-5xl font-bold text-gradient">{industry.caseStudy.metric}</div>
              <div className="text-sm text-muted-foreground">{industry.caseStudy.label}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-4">// Stack</div>
          <div className="flex flex-wrap gap-2">
            {industry.stack.map((s: string) => (
              <span key={s} className="px-3 py-1.5 rounded-full text-sm border border-border bg-surface/60">{s}</span>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/book-call" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-6 py-3 text-sm font-semibold text-primary-foreground">
              Book an audit for {industry.name} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
