import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CalBooking } from "@/components/widgets/CalBooking";
import { Check, Calendar } from "lucide-react";

export const Route = createFileRoute("/book-call")({
  component: BookCall,
  head: () => ({
    meta: [
      { title: "Book AI Automation Strategy Call | CEPTREX" },
      { name: "description", content: "Schedule a free AI automation consultation with CEPTREX. Talk to a senior engineer — never an SDR." },
      { property: "og:title", content: "Book AI Automation Strategy Call | CEPTREX" },
      { property: "og:description", content: "Free 30-min strategy call. No pitch. 1-page roadmap within 48h." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Free AI Automation Strategy Call",
        provider: { "@type": "Organization", name: "Ceptrex" },
        areaServed: ["US", "GB", "AE", "EU"],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }),
    }],
  }),
});

function BookCall() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Book a Call"
        title="Let's map your"
        highlight="first AI workflow"
        subtitle="Pick a 30-min slot below. You'll talk to a senior engineer — never an SDR."
      />
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-8">
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
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-5 w-5 text-cyan" />
              <h2 className="font-display text-xl font-bold">Pick your slot</h2>
            </div>
            <CalBooking />
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
