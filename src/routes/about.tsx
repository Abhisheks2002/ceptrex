import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CTA } from "@/components/site/CTA";

const values = [
  { t: "Outcomes, not output", d: "We measure ourselves on the revenue and hours we unlock — not lines of code shipped." },
  { t: "Senior or nothing", d: "Every contributor has shipped AI to production at scale. No bootcamp grads on your project." },
  { t: "Own your stack", d: "Your code in your repo, your data in your cloud. Zero lock-in. We're partners, not platforms." },
  { t: "Pragmatic over hype", d: "We say no to AI when a rules engine is better. Honest scoping beats inflated invoices." },
];




const offices = [
  { city: "Stockholm", line: "HQ · Engineering", time: "GMT+1" },
  { city: "Dubai", line: "MENA delivery", time: "GMT+4" },
  { city: "New York", line: "Americas client success", time: "GMT-5" },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ceptrex" },
      { name: "description", content: "We're a senior-only AI agency from Stockholm, Dubai and New York shipping production-grade AI agents to high-growth companies." },
      { property: "og:title", content: "About — Ceptrex" },
      { property: "og:description", content: "A senior-only AI agency operating across three continents." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="Senior AI engineers,"
        highlight="three continents, one playbook."
        subtitle="Ceptrex was founded in 2023 by ex-Klarna, DeepMind and Stripe operators who got tired of watching agencies overpromise and under-ship on AI."
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              We exist because <span className="text-gradient">AI is too important</span> to leave to generalists.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Every week another agency adds "AI" to its homepage. Few of them
              have ever shipped a multi-agent system to production. Fewer still
              have managed the cost, latency, hallucination and security risks
              that come with running agents on real revenue.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We do — every day — for companies in the US, UK, UAE and Europe.
              Our team has shipped AI to production at Klarna, DeepMind, Stripe,
              Spotify, and a dozen high-growth scale-ups. That experience is
              what you hire when you hire Ceptrex.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
                <h3 className="font-display text-lg font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">

        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
            Where we <span className="text-gradient">work from</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {offices.map((o) => (
              <div key={o.city} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-7">
                <div className="font-display text-2xl font-bold">{o.city}</div>
                <div className="mt-2 text-sm text-muted-foreground">{o.line}</div>
                <div className="mt-4 text-xs font-mono text-cyan">{o.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </SiteLayout>
  );
}
