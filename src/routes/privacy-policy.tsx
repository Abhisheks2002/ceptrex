import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ceptrex" },
      { name: "description", content: "How Ceptrex collects, uses and protects your data." },
    ],
  }),
});

function Privacy() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Privacy" highlight="Policy" subtitle="Last updated: May 2026" />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 space-y-6 text-foreground/85 leading-relaxed">
          <p>Ceptrex ("we", "us") respects your privacy. This policy explains what we collect when you visit our website or engage us for services, and how we use it.</p>
          <H>1. Data we collect</H>
          <p>Contact data (name, email, company) you submit via forms; usage data (pages visited, device, approximate location) collected via privacy-respecting analytics; and project data shared under NDA during engagements.</p>
          <H>2. How we use it</H>
          <p>To respond to enquiries, deliver services under contract, improve our website, and comply with legal obligations. We never sell personal data.</p>
          <H>3. Sharing</H>
          <p>We use sub-processors (Supabase, Vercel-class hosting, Resend, OpenAI/Anthropic for our tools). All are GDPR-aligned. Client project data lives in your cloud whenever possible.</p>
          <H>4. Your rights</H>
          <p>GDPR & CCPA rights apply: access, rectification, deletion, portability and objection. Email <a href="mailto:privacy@ceptrex.com" className="text-cyan">privacy@ceptrex.com</a> to exercise.</p>
          <H>5. Retention</H>
          <p>Lead/contact data: 24 months from last interaction. Project data: per the engagement DPA, typically 90 days post-termination.</p>
          <H>6. Contact</H>
          <p>Ceptrex · ceptrexai@gmail.com · Stockholm, SE — Dubai, AE — New York, US.</p>
        </div>
      </section>
    </SiteLayout>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-bold mt-8">{children}</h2>;
}
