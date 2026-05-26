const steps = [
  { n: "01", t: "Discovery & Audit", d: "Free 30-min strategy call. We map your workflows and identify the top 3 automation opportunities.", days: "Day 0–3" },
  { n: "02", t: "Blueprint & Scope", d: "Architecture diagram, tech stack, KPIs and fixed-price proposal delivered within 5 business days.", days: "Day 3–7" },
  { n: "03", t: "Build & Train", d: "Agents built, integrations wired, prompts tuned. Weekly demos with your team.", days: "Day 7–28" },
  { n: "04", t: "Launch & Iterate", d: "Production deploy, monitoring dashboards, and 90 days of optimization included.", days: "Day 28+" },
];

export function Process() {
  return (
    <section id="process" className="py-28 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">// Process</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            From kickoff to <span className="text-gradient">production in 28 days</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4 relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center font-display text-xl font-bold text-primary-foreground glow-purple">
                  {s.n}
                </div>
              </div>
              <div className="text-xs font-mono text-muted-foreground mb-2">{s.days}</div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
