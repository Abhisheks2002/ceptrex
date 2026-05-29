import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { services } from "@/data/services";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Ceptrex` },
          { name: "description", content: loaderData.service.tagline },
          { property: "og:title", content: `${loaderData.service.title} — Ceptrex` },
          { property: "og:description", content: loaderData.service.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-4xl">Service not found</h1>
        <Link to="/services" className="text-cyan mt-4 inline-block">← Back to services</Link>
      </div>
    </SiteLayout>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  return (
    <SiteLayout>
      <PageHeader eyebrow={`Service / ${service.slug}`} title={service.title} subtitle={service.tagline} />
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-lg text-foreground/85 leading-relaxed">{service.hero}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10">
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-7">
            <div className="text-xs font-mono uppercase tracking-wider text-destructive mb-4">// Problems we solve</div>
            <ul className="space-y-3">
              {service.problems.map((p: string) => (
                <li key={p} className="flex items-start gap-3 text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-success/30 bg-success/5 p-7">
            <div className="text-xs font-mono uppercase tracking-wider text-success mb-4">// Outcomes</div>
            <div className="grid grid-cols-3 gap-4">
              {service.outcomes.map((o: { metric: string; label: string }) => (
                <div key={o.label}>
                  <div className="font-display text-3xl font-bold text-gradient">{o.metric}</div>
                  <div className="text-xs text-muted-foreground mt-1">{o.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.capabilities.map((c: { title: string; desc: string }) => (
              <div key={c.title} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
                <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-3">// Stack</div>
            <div className="flex flex-wrap gap-2">
              {service.stack.map((s: string) => (
                <span key={s} className="px-3 py-1 rounded-full text-xs border border-border bg-surface-elevated">{s}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface/60 p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-3">// Deliverables</div>
            <ul className="space-y-2 text-sm">
              {service.deliverables.map((d: string) => (
                <li key={d} className="flex items-start gap-2"><Check className="h-4 w-4 text-success mt-0.5 shrink-0" />{d}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-surface p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-3">// Engagement</div>
            <div className="text-sm text-muted-foreground">Timeline</div>
            <div className="font-display text-2xl font-bold mb-3">{service.timeline}</div>
            <div className="text-sm text-muted-foreground">Starting at</div>
            <div className="font-display text-3xl font-bold text-gradient">{service.startingAt}</div>
            <Link to="/book-call" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Get a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
