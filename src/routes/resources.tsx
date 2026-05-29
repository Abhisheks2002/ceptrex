import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { FileText, Wrench, BookOpen, Calculator, Sparkles } from "lucide-react";

export const Route = createFileRoute("/resources")({
  component: Resources,
  head: () => ({
    meta: [
      { title: "Resources — Ceptrex" },
      { name: "description", content: "Free playbooks, calculators, templates and guides for shipping AI in production." },
      { property: "og:title", content: "Free AI automation resources" },
      { property: "og:description", content: "Templates, playbooks and calculators we use with clients." },
    ],
  }),
});

const items = [
  { icon: Calculator, title: "AI ROI Calculator", desc: "Quantify the cost of manual work in your business.", to: "/roi-calculator", tag: "Tool" },
  { icon: FileText, title: "Free AI Audit", desc: "30-min live audit + 1-page roadmap in 48h.", to: "/ai-audit", tag: "Service" },
  { icon: BookOpen, title: "Blog & Playbooks", desc: "Field notes from 180+ AI deployments.", to: "/blog", tag: "Reading" },
  { icon: Wrench, title: "n8n Project Library", desc: "24 production-grade workflows with stack & metrics.", to: "/n8n-projects", tag: "Library" },
  { icon: Sparkles, title: "Case Studies", desc: "Detailed stories with architecture & results.", to: "/case-studies", tag: "Reading" },
];

function Resources() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Resources" title="Free tools, templates &" highlight="playbooks" subtitle="Everything we'd hand a friend trying to ship AI in production." />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((r) => (
            <Link key={r.to} to={r.to} className="group rounded-2xl border border-border bg-surface/60 backdrop-blur p-7 hover:border-primary/50 transition-all hover:-translate-y-1">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-cyan/10 border border-primary/30 mb-4">
                <r.icon className="h-5 w-5 text-cyan" />
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">{r.tag}</div>
              <h3 className="font-display text-xl font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              <div className="mt-4 text-sm text-cyan group-hover:translate-x-1 transition-transform inline-block">Open →</div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
