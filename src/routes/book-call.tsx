import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Check, Calendar } from "lucide-react";

export const Route = createFileRoute("/book-call")({
  component: BookCall,
  head: () => ({
    meta: [
      { title: "Book a Call — Ceptrex" },
      { name: "description", content: "Book a free 30-minute strategy call with Ceptrex. We'll map your workflows and identify your top automation opportunities." },
      { property: "og:title", content: "Book a Call — Ceptrex" },
      { property: "og:description", content: "Free 30-min strategy call. No pitch." },
    ],
  }),
});

function BookCall() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Book a Call" title="Let's map your" highlight="first AI workflow" subtitle="Pick a 30-min slot below. You'll talk to a senior engineer — never a SDR." />
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-6 grid lg:grid-cols-5 gap-8">
          <aside className="lg:col-span-2 space-y-4">
            <Item text="Talk to a senior engineer, not a salesperson" />
            <Item text="Live screen-share workflow audit" />
            <Item text="3 prioritised automation opportunities" />
            <Item text="1-page roadmap delivered within 48h" />
            <Item text="No-pitch guarantee" />
            <div className="rounded-2xl border border-border bg-surface/60 p-5 text-sm text-muted-foreground">
              Prefer email? Reach us at <a className="text-cyan" href="mailto:hello@ceptrex.com">hello@ceptrex.com</a> — we reply within 4 hours.
            </div>
          </aside>
          <div className="lg:col-span-3 rounded-3xl border border-border bg-surface/60 backdrop-blur p-7">
            <div className="flex items-center gap-3 mb-5">
              <Calendar className="h-5 w-5 text-cyan" />
              <h2 className="font-display text-xl font-bold">Pick your slot</h2>
            </div>
            <div className="aspect-[4/5] sm:aspect-[5/4] rounded-2xl border border-border bg-surface-elevated/60 flex flex-col items-center justify-center text-center p-8">
              <div className="font-display text-2xl font-bold mb-2">Schedule on Cal.com</div>
              <p className="text-sm text-muted-foreground mb-5">Embedded scheduler placeholder. Connect your Cal.com or Calendly to surface live availability here.</p>
              <a href="https://cal.com/ceptrex/strategy" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-6 py-3 text-sm font-semibold text-primary-foreground">
                Open scheduler
              </a>
              <Link to="/ai-audit" className="mt-4 text-xs text-muted-foreground hover:text-foreground">or request via the audit form →</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Item({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="h-5 w-5 text-success mt-0.5 shrink-0" />
      <div className="text-foreground/85">{text}</div>
    </div>
  );
}
