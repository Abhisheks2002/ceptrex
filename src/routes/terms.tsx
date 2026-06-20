import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms of Service — Ceptrex" },
      { name: "description", content: "Terms governing use of the Ceptrex website and services." },
    ],
  }),
});

function Terms() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Terms of" highlight="Service" subtitle="Last updated: May 2026" />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 space-y-6 text-foreground/85 leading-relaxed">
          <p>By accessing the Ceptrex website or engaging our services you agree to these Terms.</p>
          <H>1. Services</H>
          <p>Ceptrex builds AI agents, automation, and related software for clients under separately executed Statements of Work. These Terms govern website usage; SoWs govern delivery.</p>
          <H>2. Acceptable use</H>
          <p>Don't reverse-engineer, scrape at scale, or use the site to send unsolicited messages.</p>
          <H>3. Intellectual property</H>
          <p>All site content is © Ceptrex. Client work is governed by the SoW; default position is full IP transfer to the client on final payment.</p>
          <H>4. Disclaimer</H>
          <p>The site is provided "as is" without warranty. AI outputs may contain errors and should be reviewed before relied upon for high-stakes decisions.</p>
          <H>5. Limitation of liability</H>
          <p>To the maximum extent permitted by law, Ceptrex's liability arising from site usage is limited to $100. Engagement-specific liability is governed by the SoW.</p>
          <H>6. Governing law</H>
          <p>These Terms are governed by the laws of Sweden, with venue in Stockholm District Court.</p>
          <H>7. Contact</H>
          <p>hello@ceptrex.com</p>
        </div>
      </section>
    </SiteLayout>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-bold mt-8">{children}</h2>;
}
