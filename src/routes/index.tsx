import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { Pricing } from "@/components/site/Pricing";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NexaForge AI — AI Agents & Automation Agency" },
      {
        name: "description",
        content:
          "We build production-grade AI agents, n8n workflows, WhatsApp AI and CRM automation for high-growth companies. Fixed-price builds in 28 days.",
      },
      { property: "og:title", content: "NexaForge AI — AI Agents & Automation Agency" },
      { property: "og:description", content: "Production-grade AI agents & automation in 28 days." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      {/* Index reuses SiteLayout-less structure so Hero can own the top */}
      <SiteLayout>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Pricing />
        <CTA />
      </SiteLayout>
    </div>
  );
}
