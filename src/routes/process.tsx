import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Process } from "@/components/site/Process";
import { CTA } from "@/components/site/CTA";

const deliverables = [
  { week: "Week 1", title: "Discovery & Audit", items: ["Stakeholder interviews", "Workflow mapping", "Top-3 opportunity scoring", "Tech-stack inventory"] },
  { week: "Week 2", title: "Blueprint", items: ["Architecture diagram", "Data-flow & security review", "KPI & ROI model", "Fixed-price proposal"] },
  { week: "Week 3", title: "Build Sprint 1", items: ["Core agent scaffolding", "Integrations wired", "Prompt + RAG iteration", "Internal demo Friday"] },
  { week: "Week 4", title: "Build Sprint 2 + Launch", items: ["UAT with your team", "Production deploy", "Monitoring dashboards", "Handover & training"] },
  { week: "Post-launch", title: "Optimise (90 days)", items: ["Weekly performance reviews", "Prompt & cost tuning", "New-use-case backlog", "Dedicated Slack channel"] },
];

const principles = [
  { t: "Senior-only delivery", d: "Every project led by ex-FAANG / scale-up engineers. No juniors learning on your bill." },
  { t: "Fixed price, fixed scope", d: "We quote once. Change orders are transparent and optional." },
  { t: "Your code, your cloud", d: "Everything ships to your GitHub and your cloud. No vendor lock-in, ever." },
  { t: "ROI dashboards day one", d: "Every agent ships with a live metrics dashboard tied to the KPIs in your proposal." },
];

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — NexaForge AI" },
      { name: "description", content: "From kickoff to production in 28 days. Discovery, blueprint, two build sprints, launch and 90 days of optimisation." },
      { property: "og:title", content: "Our Process — NexaForge AI" },
      { property: "og:description", content: "Senior-only delivery, fixed price, your code in your cloud." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="How we ship"
        title="Production in"
        highlight="28 days flat."
        subtitle="A four-week, fixed-price delivery model used on 180+ AI projects."
      />
      <Process />
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
            Week-by-week <span className="text-gradient">deliverables</span>
          </h2>
          <div className="space-y-4">
            {deliverables.map((d) => (
              <div
                key={d.week}
                className="grid md:grid-cols-[180px_1fr_2fr] gap-6 rounded-2xl border border-border bg-surface/60 backdrop-blur p-6"
              >
                <div className="font-mono text-xs uppercase tracking-wider text-cyan">{d.week}</div>
                <div className="font-display text-lg font-semibold">{d.title}</div>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  {d.items.map((i) => (
                    <li key={i}>— {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
            Operating <span className="text-gradient">principles</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((p) => (
              <div key={p.t} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-7">
                <h3 className="font-display text-xl font-semibold">{p.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed text-sm">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
