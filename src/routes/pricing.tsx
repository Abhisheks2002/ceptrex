import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Pricing } from "@/components/site/Pricing";
import { CTA } from "@/components/site/CTA";

const faqs = [
  { q: "Why fixed price?", a: "Because hourly billing punishes speed. We quote a fixed scope, deliver in 28 days, and absorb the risk of going over." },
  { q: "What's included in the retainer?", a: "Continued prompt & cost optimisation, new use-case discovery, weekly performance reviews, on-call Slack channel, and SLAs on uptime & response time." },
  { q: "Do you sign NDAs and DPAs?", a: "Yes — standard. We're SOC2 Type II underway, GDPR-compliant, and can sign HIPAA BAAs for healthcare clients." },
  { q: "What if my project is bigger than Scale?", a: "Most enterprises start with a Scale build to prove ROI, then upgrade to Enterprise once the first agent is in production." },
  { q: "Do you offer equity / revenue share?", a: "For 2 carefully selected pre-Series-A startups per quarter, yes — ask us about our Founders Programme." },
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Ceptrex" },
      { name: "description", content: "Transparent, fixed-price AI agency packages. Launch from $4,950. Scale from $12,500. Enterprise on retainer." },
      { property: "og:title", content: "Pricing — Ceptrex" },
      { property: "og:description", content: "Fixed-price AI builds. No surprises." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Pricing"
        title="Fixed price."
        highlight="No surprises."
        subtitle="Three packages designed to match where you are on your AI journey."
      />
      <Pricing />
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">
            Frequently <span className="text-gradient">asked</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-surface/60 backdrop-blur p-6 open:border-primary/50 transition-colors"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between font-display text-lg font-semibold">
                  {f.q}
                  <span className="text-cyan font-mono text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
