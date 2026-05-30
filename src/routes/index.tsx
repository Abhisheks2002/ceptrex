import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { ProblemSection } from "@/components/site/ProblemSection";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Portfolio } from "@/components/site/Portfolio";
import { StatsBand } from "@/components/site/StatsBand";
import { TechCloud } from "@/components/site/TechCloud";
import { Testimonials } from "@/components/site/Testimonials";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ceptrex",
  url: "https://ceptrex.lovable.app",
  logo: "https://ceptrex.lovable.app/favicon.ico",
  description:
    "Premium AI automation agency building production-grade agents, n8n workflows, WhatsApp AI and voice agents.",
  sameAs: ["https://www.linkedin.com/", "https://twitter.com/"],
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@ceptrex.com",
    areaServed: ["US", "GB", "AE", "EU"],
    availableLanguage: ["English"],
  }],
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ceptrex — AI Agents & Automation Agency" },
      {
        name: "description",
        content:
          "Premium AI automation agency building production-grade agents, n8n workflows, WhatsApp AI and voice agents for high-growth companies in the US, UK, UAE & Europe.",
      },
      { property: "og:title", content: "Ceptrex — Automate Everything. Scale Infinitely." },
      { property: "og:description", content: "180+ AI systems shipped. $2M+ in client revenue. 28-day delivery." },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify(orgJsonLd),
    }],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <ProblemSection />
      <Services />
      <Process />
      <Portfolio />
      <StatsBand />
      <TechCloud />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </SiteLayout>
  );
}
