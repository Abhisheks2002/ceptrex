import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { ArrowRight, Mail, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ceptrex" },
      { name: "description", content: "Book a free 30-minute AI strategy call. We reply within 4 hours and never pitch on the call." },
      { property: "og:title", content: "Contact — Ceptrex" },
      { property: "og:description", content: "Book your free AI audit." },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

function readUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || undefined,
    utm_medium: p.get("utm_medium") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
  };
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Let's talk"
        title="Book your"
        highlight="free AI audit."
        subtitle="A 30-minute call. We map your workflows live and identify your top 3 automation opportunities. No pitch."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 rounded-3xl border border-border bg-surface/60 backdrop-blur p-8 md:p-10">
            {sent ? (
              <div className="text-center py-12">
                <div className="font-display text-3xl font-bold">Thank you — we're on it.</div>
                <p className="mt-3 text-muted-foreground">
                  A senior engineer will reply within 4 working hours.
                </p>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setError(null);
                  const fd = new FormData(e.currentTarget);
                  const parsed = contactSchema.safeParse({
                    name: fd.get("name"),
                    email: fd.get("email"),
                    company: fd.get("company"),
                    role: fd.get("role"),
                    budget: fd.get("budget"),
                    message: fd.get("message"),
                  });
                  if (!parsed.success) {
                    const first = parsed.error.issues[0]?.message ?? "Please check the form";
                    setError(first);
                    toast.error(first);
                    return;
                  }
                  setSubmitting(true);
                  const utm = readUtm();
                  const { error: insertErr } = await supabase.from("contact_leads").insert({
                    name: parsed.data.name,
                    email: parsed.data.email,
                    company: parsed.data.company || null,
                    budget: parsed.data.budget || null,
                    service: parsed.data.role || null,
                    message: parsed.data.message || null,
                    source: "contact",
                    browser: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
                    utm_source: utm.utm_source ?? null,
                    utm_medium: utm.utm_medium ?? null,
                    utm_campaign: utm.utm_campaign ?? null,
                  });
                  setSubmitting(false);
                  if (insertErr) {
                    setError("Couldn't submit — please email hello@ceptrex.com");
                    toast.error("Submission failed. Please try again.");
                    return;
                  }
                  toast.success("Thanks — we'll be in touch shortly.");
                  setSent(true);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" name="name" placeholder="Marcus Chen" required />
                  <Field label="Work email" name="email" type="email" placeholder="marcus@company.com" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Company" name="company" placeholder="Vantor SaaS" />
                  <Field label="Role" name="role" placeholder="VP Sales" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Budget range
                  </label>
                  <select
                    name="budget"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm focus:border-primary outline-none"
                  >
                    <option>$5K – $15K (Launch)</option>
                    <option>$15K – $50K (Scale)</option>
                    <option>$50K+ (Enterprise)</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    What are you trying to automate?
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="e.g. We want an AI SDR that books qualified meetings from inbound leads…"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm focus:border-primary outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-purple hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {submitting ? "Sending…" : "Request my free audit"}
                  {!submitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </button>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <p className="text-xs text-muted-foreground">
                  ✓ Reply within 4 hours · ✓ No-pitch guarantee · ✓ NDA on request
                </p>
              </form>
            )}
          </div>

          <div className="md:col-span-2 space-y-4">
            <ContactCard
              icon={Calendar}
              title="Book direct"
              line="Pick a 30-min slot on our shared calendar"
              cta="Book a Call"
              href="/book-call"
            />
            <ContactCard
              icon={Mail}
              title="Email"
              line="A senior engineer will reply"
              cta="hello@ceptrex.com"
              href="mailto:hello@ceptrex.com"
            />
            <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Offices
              </div>
              <ul className="space-y-2 text-sm">
                <li><span className="text-foreground font-semibold">Stockholm</span> · Birger Jarlsgatan 18</li>
                <li><span className="text-foreground font-semibold">Dubai</span> · DIFC Gate Village 10</li>
                <li><span className="text-foreground font-semibold">New York</span> · 220 5th Ave, Floor 9</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm focus:border-primary outline-none"
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  line,
  cta,
  href,
}: {
  icon: React.ElementType;
  title: string;
  line: string;
  cta: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-border bg-surface/60 backdrop-blur p-6 hover:border-primary/50 transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-cyan/10 border border-primary/30">
          <Icon className="h-5 w-5 text-cyan" />
        </div>
        <div className="flex-1">
          <div className="font-display text-lg font-semibold">{title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{line}</div>
          <div className="mt-2 text-sm text-cyan group-hover:underline">{cta} →</div>
        </div>
      </div>
    </a>
  );
}
