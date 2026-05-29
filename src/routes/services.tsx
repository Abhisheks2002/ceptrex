import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Services } from "@/components/site/Services";
import { CTA } from "@/components/site/CTA";
import { Check } from "lucide-react";

const deepDives = [
  {
    name: "AI Agents",
    desc: "Autonomous, multi-step agents built on GPT-5, Claude Sonnet, and Gemini 2.5 — orchestrated for sales, support, ops, and research.",
    bullets: [
      "Multi-tool agent orchestration (LangGraph, CrewAI)",
      "Long-term memory with vector stores (pgvector, Pinecone)",
      "Human-in-the-loop approval workflows",
      "Cost & latency monitoring dashboards",
    ],
  },
  {
    name: "n8n Workflow Automation",
    desc: "Self-hosted, source-controlled n8n environments connecting your entire SaaS stack with 500+ integrations.",
    bullets: [
      "Self-hosted n8n on your VPC (SOC2-ready)",
      "Versioned workflows in Git with CI/CD",
      "Error queues, retries, and on-call alerting",
      "Custom nodes for proprietary APIs",
    ],
  },
  {
    name: "WhatsApp AI Agents",
    desc: "Conversational agents on the official WhatsApp Business Cloud API — qualify leads, book meetings, close sales in 60+ languages.",
    bullets: [
      "Meta-verified Business API onboarding",
      "Multi-language NLU (Arabic, English, French, Spanish)",
      "CRM sync (HubSpot, Salesforce, Pipedrive)",
      "Voice notes → transcription → reply",
    ],
  },
  {
    name: "CRM Intelligence",
    desc: "Pipeline enrichment, AI lead scoring, deal coaching, and autonomous outbound on HubSpot, Salesforce and Pipedrive.",
    bullets: [
      "Predictive lead scoring (custom-trained)",
      "AI deal-risk alerts & next-best-action",
      "Auto-enrichment from Clearbit, Apollo, LinkedIn",
      "AI-written follow-ups in your brand voice",
    ],
  },
  {
    name: "Custom Chatbots & Copilots",
    desc: "Brand-trained assistants with retrieval over your docs, Notion, Confluence, Drive and SharePoint.",
    bullets: [
      "RAG pipelines with hybrid search & re-ranking",
      "Auth-aware retrieval (RBAC)",
      "Embeddable widget or Slack/Teams app",
      "Analytics: questions answered, deflection rate",
    ],
  },
  {
    name: "AI Strategy & Fractional CAIO",
    desc: "Embedded AI leadership — audit, roadmap, vendor selection, governance and team training.",
    bullets: [
      "AI maturity audit & opportunity scoring",
      "12-month AI roadmap & KPI framework",
      "AI governance, security & compliance (EU AI Act)",
      "Team enablement & prompt engineering training",
    ],
  },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ceptrex" },
      {
        name: "description",
        content:
          "AI agents, n8n workflows, WhatsApp AI, CRM intelligence, custom chatbots and fractional CAIO services for high-growth companies.",
      },
      { property: "og:title", content: "Services — Ceptrex" },
      { property: "og:description", content: "Six productised AI services with fixed scope and measurable ROI." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="What we build"
        title="AI services that"
        highlight="ship in weeks, not quarters"
        subtitle="Six productised offerings with fixed scope, fixed timelines, and ROI dashboards from day one."
      />
      <Services />
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 space-y-5">
          {deepDives.map((d) => (
            <div
              key={d.name}
              className="rounded-3xl border border-border bg-surface/60 backdrop-blur p-8 md:p-10 hover:border-primary/50 transition-colors"
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold">{d.name}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
                <ul className="md:col-span-2 grid sm:grid-cols-2 gap-3">
                  {d.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-foreground/85">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
