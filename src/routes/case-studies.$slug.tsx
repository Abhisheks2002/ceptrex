import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cases } from "@/data/cases";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/case-studies/$slug")({
  component: CaseDetail,
  loader: ({ params }) => {
    const study = cases.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    const related = cases.filter((c) => c.slug !== study.slug).slice(0, 3);
    return { study, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.study.title} — Ceptrex` },
          { name: "description", content: loaderData.study.summary },
          { property: "og:title", content: loaderData.study.title },
          { property: "og:description", content: loaderData.study.summary },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-4xl">Case study not found</h1>
        <Link to="/case-studies" className="text-cyan mt-4 inline-block">← All case studies</Link>
      </div>
    </SiteLayout>
  ),
});

function CaseDetail() {
  const { study, related } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className={`absolute top-0 right-0 h-[400px] w-[600px] rounded-full bg-gradient-to-br ${study.color} opacity-20 blur-[120px] pointer-events-none`} />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-4">{study.industry} · {study.category}</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">{study.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">{study.summary}</p>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl">
            {study.results.map((r: { metric: string; label: string }) => (
              <div key={r.label}>
                <div className={`font-display text-3xl md:text-4xl font-bold bg-gradient-to-br ${study.color} bg-clip-text text-transparent`}>{r.metric}</div>
                <div className="text-xs text-muted-foreground mt-1">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6 space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Problem</h2>
            <p className="text-foreground/85 leading-relaxed">{study.problem}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Solution</h2>
            <p className="text-foreground/85 leading-relaxed">{study.solution}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Architecture</h2>
            <ul className="space-y-2">
              {study.architecture.map((a: string) => (
                <li key={a} className="flex items-start gap-3 text-foreground/85">
                  <Check className="h-4 w-4 text-success mt-1 shrink-0" />{a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((s: string) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-sm border border-border bg-surface/60">{s}</span>
              ))}
            </div>
          </div>
          {study.testimonial && (
            <figure className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-7">
              <div className="text-cyan text-3xl font-display leading-none mb-3">"</div>
              <blockquote className="text-foreground/90 leading-relaxed">{study.testimonial.quote}</blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border/60 text-sm">
                <div className="font-semibold">{study.testimonial.author}</div>
                <div className="text-xs text-muted-foreground">{study.testimonial.role}</div>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-surface to-primary/10 p-10 text-center">
            <h2 className="font-display text-3xl font-bold">Want results like this?</h2>
            <Link to="/book-call" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-6 py-3 text-sm font-semibold text-primary-foreground">
              Book your free audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="font-display text-2xl font-bold mb-6">Related case studies</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {related.map((c: typeof cases[number]) => (
              <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="rounded-2xl border border-border bg-surface/60 p-5 hover:border-primary/50 transition-colors">
                <div className="text-xs text-muted-foreground mb-2">{c.industry}</div>
                <div className={`font-display text-2xl font-bold bg-gradient-to-br ${c.color} bg-clip-text text-transparent`}>{c.metric}</div>
                <div className="text-sm mt-2">{c.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
