import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/roi-calculator")({
  component: ROI,
  head: () => ({
    meta: [
      { title: "AI ROI Calculator — Ceptrex" },
      { name: "description", content: "Estimate the annual cost of manual work in your business and how much AI automation could save you." },
      { property: "og:title", content: "AI ROI Calculator" },
      { property: "og:description", content: "How much is manual work costing you?" },
    ],
  }),
});

function ROI() {
  const [employees, setEmployees] = useState(10);
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(45);

  const m = useMemo(() => {
    const weekly = employees * hours * rate;
    const annual = weekly * 52;
    const saved = Math.round(annual * 0.7);
    const roi = Math.round((saved / 12000) * 100);
    return { weekly, annual, saved, roi };
  }, [employees, hours, rate]);

  return (
    <SiteLayout>
      <PageHeader eyebrow="ROI Calculator" title="How much is manual work" highlight="costing you?" subtitle="A back-of-the-envelope estimate. We'll do the real numbers in your free audit." />
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-border bg-surface/60 backdrop-blur p-8 space-y-6">
            <Field label="Employees doing repetitive work" value={employees} min={1} max={500} step={1} onChange={setEmployees} />
            <Field label="Hours/week wasted per person" value={hours} min={1} max={40} step={1} onChange={setHours} />
            <Field label="Loaded hourly rate ($)" value={rate} min={15} max={250} step={5} onChange={setRate} />
          </div>
          <div className="rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 to-surface p-8 space-y-5">
            <Stat label="Weekly cost" value={`$${m.weekly.toLocaleString()}`} />
            <Stat label="Annual cost" value={`$${m.annual.toLocaleString()}`} big />
            <Stat label="Recoverable with AI (70%)" value={`$${m.saved.toLocaleString()}`} accent />
            <Stat label="Estimated ROI on $12K build" value={`${m.roi}%`} accent />
            <Link to="/book-call" className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-6 py-3 text-sm font-semibold text-primary-foreground">
              Book a free audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="font-display text-xl font-bold text-gradient">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--color-primary)]"
      />
    </div>
  );
}

function Stat({ label, value, big, accent }: { label: string; value: string; big?: boolean; accent?: boolean }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div className={`font-display font-bold ${big ? "text-5xl" : "text-3xl"} ${accent ? "text-gradient" : ""}`}>{value}</div>
    </div>
  );
}
