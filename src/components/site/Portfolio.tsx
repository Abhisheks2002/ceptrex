const cases = [
  {
    industry: "SaaS",
    title: "Outbound AI SDR for B2B platform",
    metric: "+412%",
    metricLabel: "qualified meetings",
    color: "from-primary to-cyan",
  },
  {
    industry: "Real Estate",
    title: "WhatsApp lead-qualifier across 9 brokers",
    metric: "63%",
    metricLabel: "reduction in response time",
    color: "from-cyan to-success",
  },
  {
    industry: "Healthcare",
    title: "Patient-intake voice agent + EHR sync",
    metric: "$1.2M",
    metricLabel: "annual labor savings",
    color: "from-gold to-primary",
  },
  {
    industry: "E-commerce",
    title: "AI support agent across 12 Shopify stores",
    metric: "91%",
    metricLabel: "tickets auto-resolved",
    color: "from-success to-cyan",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-28 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">// Case studies</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Results that <span className="text-gradient">compound</span>
            </h2>
          </div>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border hover:border-primary pb-1">
            View all 180 projects →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {cases.map((c) => (
            <article
              key={c.title}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface/60 backdrop-blur p-8 md:p-10 hover:border-primary/50 transition-all"
            >
              <div className={`absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="relative">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-6">
                  {c.industry}
                </div>
                <div className={`font-display text-5xl md:text-6xl font-bold bg-gradient-to-br ${c.color} bg-clip-text text-transparent`}>
                  {c.metric}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{c.metricLabel}</div>
                <h3 className="mt-8 font-display text-xl font-semibold leading-tight max-w-sm">
                  {c.title}
                </h3>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/80 group-hover:text-cyan transition-colors">
                  Read case study →
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
