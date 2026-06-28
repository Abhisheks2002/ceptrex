import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/ai-audit")({
  component: Audit,
  head: () => ({
    meta: [
      { title: "Free AI Audit — Ceptrex" },
      { name: "description", content: "Get a free 30-minute AI audit. We'll map your workflows live and identify the top 3 automation opportunities." },
      { property: "og:title", content: "Free AI Audit" },
      { property: "og:description", content: "Live workflow audit. No pitch. Real recommendations." },
    ],
  }),
});

const auditSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  industry: z.string().trim().max(120).optional().or(z.literal("")),
  employee_count: z.string().trim().max(60).optional().or(z.literal("")),
  revenue: z.string().trim().max(120).optional().or(z.literal("")),
  stack: z.string().trim().max(400).optional().or(z.literal("")),
  biggest_problem: z.string().trim().max(2000).optional().or(z.literal("")),
  goal: z.string().trim().max(2000).optional().or(z.literal("")),
  preferred_contact: z.string().trim().max(60).optional().or(z.literal("")),
});

function Audit() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    website: "",
    industry: "",
    employee_count: "",
    revenue: "",
    stack: "",
    biggest_problem: "",
    goal: "",
    preferred_contact: "Email",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = auditSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("audit_requests").insert({
      name: parsed.data.name,
      company: parsed.data.company,
      email: parsed.data.email,
      website: parsed.data.website || null,
      industry: parsed.data.industry || null,
      employee_count: parsed.data.employee_count || null,
      revenue: parsed.data.revenue || null,
      stack: parsed.data.stack || null,
      biggest_problem: parsed.data.biggest_problem || null,
      goal: parsed.data.goal || null,
      preferred_contact: parsed.data.preferred_contact || null,
      source: "ai-audit",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't submit — please try again or email hello@ceptrex.com");
      return;
    }
    toast.success("Audit request received. We'll reach out within 4 hours.");
    setSent(true);
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Free AI Audit" title="A 30-min audit that" highlight="actually finds money" subtitle="We'll map your workflows live and ship a 1-page automation roadmap within 48 hours. No pitch, no fluff." />
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 grid lg:grid-cols-5 gap-8">
          <aside className="lg:col-span-2 space-y-4">
            <Item title="Workflow mapping" desc="Live walkthrough of your top 5 manual processes." />
            <Item title="Opportunity scoring" desc="Each ranked by ROI, time-to-build, and risk." />
            <Item title="Stack assessment" desc="Where your existing tools can be extended vs replaced." />
            <Item title="Written deliverable" desc="A 1-page roadmap and budget sent within 48h." />
            <div className="rounded-2xl border border-success/30 bg-success/5 p-5 text-sm">
              <div className="text-success font-mono uppercase tracking-wider text-xs mb-1">// Guarantee</div>
              If we can't show $50K+ in annual automation value, the call is on us — and you keep the roadmap.
            </div>
          </aside>
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-3xl border border-border bg-surface/60 backdrop-blur p-7 space-y-4"
          >
            {sent ? (
              <div className="py-10 text-center">
                <div className="text-cyan text-4xl mb-3">✓</div>
                <h3 className="font-display text-2xl font-bold">Request received</h3>
                <p className="mt-3 text-muted-foreground">We'll reach out within 4 hours to book your slot.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <Input label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Work email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                  <Input label="Website" value={form.website} onChange={(v) => setForm({ ...form, website: v })} placeholder="https://…" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Industry" value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} placeholder="SaaS, Real Estate…" />
                  <Input label="Employees" value={form.employee_count} onChange={(v) => setForm({ ...form, employee_count: v })} placeholder="1-10, 11-50, 51-200…" />
                </div>
                <Input label="Annual revenue" value={form.revenue} onChange={(v) => setForm({ ...form, revenue: v })} placeholder="$1M–$10M" />
                <Input label="Current stack (3-5 tools)" value={form.stack} onChange={(v) => setForm({ ...form, stack: v })} placeholder="HubSpot, Slack, Notion..." />
                <Textarea label="Biggest operational problem right now?" value={form.biggest_problem} onChange={(v) => setForm({ ...form, biggest_problem: v })} />
                <Textarea label="What would you automate first?" value={form.goal} onChange={(v) => setForm({ ...form, goal: v })} />
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Preferred contact</label>
                  <select
                    value={form.preferred_contact}
                    onChange={(e) => setForm({ ...form, preferred_contact: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/60"
                  >
                    <option>Email</option>
                    <option>Phone</option>
                    <option>WhatsApp</option>
                    <option>Slack</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-gradient-to-r from-primary to-cyan py-3.5 text-sm font-semibold text-primary-foreground glow-purple inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Submitting…" : "Request my free audit"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Item({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="h-5 w-5 text-success mt-0.5 shrink-0" />
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, required }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</label>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/60"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/60 resize-none"
      />
    </div>
  );
}
