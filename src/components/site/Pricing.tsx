import { Check } from "lucide-react";

const tiers = [
  {
    name: "Launch",
    price: "$4,950",
    cadence: "one-time build",
    desc: "One AI agent, production-ready in 14 days.",
    features: ["1 custom AI agent", "Up to 3 integrations", "Prompt + RAG setup", "30 days support", "Analytics dashboard"],
    cta: "Start small",
    featured: false,
  },
  {
    name: "Scale",
    price: "$12,500",
    cadence: "one-time + retainer",
    desc: "Multi-agent system with full automation suite.",
    features: ["Up to 5 AI agents", "n8n workflow library", "CRM + WhatsApp integration", "90 days optimization", "Dedicated Slack channel", "Weekly performance review"],
    cta: "Most picked",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "monthly retainer",
    desc: "Embedded AI team for ongoing transformation.",
    features: ["Unlimited agents", "Custom model fine-tuning", "SOC2 / GDPR compliance", "Fractional CAIO", "24/7 monitoring SLA", "Quarterly roadmap"],
    cta: "Talk to founders",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 relative">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">// Pricing</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Fixed-price builds. <span className="text-gradient">No surprises.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            All plans include strategy, build, deployment and post-launch optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-8 border ${
                t.featured
                  ? "border-primary/60 bg-gradient-to-b from-primary/10 to-surface/80 glow-purple"
                  : "border-border bg-surface/60"
              } backdrop-blur`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-cyan text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  Most popular
                </div>
              )}
              <h3 className="font-display text-2xl font-bold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 min-h-[40px]">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold">{t.price}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{t.cadence}</div>

              <a
                href="#contact"
                className={`mt-7 block text-center rounded-full py-3 text-sm font-semibold transition ${
                  t.featured
                    ? "bg-gradient-to-r from-primary to-cyan text-primary-foreground hover:scale-[1.02]"
                    : "border border-border hover:bg-surface-elevated text-foreground"
                }`}
              >
                {t.cta}
              </a>

              <ul className="mt-8 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
