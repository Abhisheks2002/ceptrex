const quotes = [
  { q: "Ceptrex replaced our 6-person SDR team with one agent. Pipeline 4x'd in a quarter.", a: "Marcus Chen", r: "VP Sales, Vantor SaaS" },
  { q: "They shipped a Salesforce-connected WhatsApp agent in 19 days. Game changer for UAE market.", a: "Aisha Al-Rashid", r: "CMO, Levant Properties" },
  { q: "Best agency we've worked with. Senior engineers, no fluff, real ROI dashboards from day one.", a: "Daniel Pierre", r: "CTO, Helio Health" },
];

export function Testimonials() {
  return (
    <section className="py-28 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">// Trusted</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Operators who <span className="text-gradient">trust us with revenue</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((t) => (
            <figure key={t.a} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-7">
              <div className="text-cyan text-3xl font-display leading-none mb-3">"</div>
              <blockquote className="text-foreground/90 leading-relaxed text-[15px]">{t.q}</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border/60">
                <div className="font-semibold text-sm">{t.a}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
