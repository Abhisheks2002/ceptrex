import { Bot, Workflow, MessageCircle, Database, Sparkles, LineChart, Globe, Smartphone } from "lucide-react";
import { Link } from "@tanstack/react-router";

const services = [
  { icon: Bot, title: "AI Agents", slug: "ai-agents", desc: "Autonomous agents that handle sales, support, ops and research 24/7.", tag: "GPT-5 · Claude · Gemini" },
  { icon: Workflow, title: "n8n Workflows", slug: "n8n-automation", desc: "Self-hosted automation pipelines connecting your entire SaaS stack.", tag: "500+ integrations" },
  { icon: MessageCircle, title: "WhatsApp AI", slug: "whatsapp-automation", desc: "Conversational agents on the WhatsApp Business API — qualify, book, sell.", tag: "Meta Cloud API" },
  { icon: Database, title: "CRM Automation", slug: "crm-automation", desc: "Pipeline enrichment, lead scoring and outbound on HubSpot & Salesforce.", tag: "AI-native CRM" },
  { icon: Sparkles, title: "Custom Chatbots", slug: "ai-chatbots", desc: "Brand-trained assistants with retrieval over your knowledge base.", tag: "RAG · Vector DB" },
  { icon: LineChart, title: "AI Analytics", slug: "ai-analytics", desc: "Predictive dashboards, anomaly detection and AI-generated insights.", tag: "Real-time ML" },
  { icon: Globe, title: "Website Building", slug: "website-building", desc: "Premium Next.js sites engineered for SEO, conversion and AI integration.", tag: "Next.js · CMS · SSR" },
  { icon: Smartphone, title: "App Development", slug: "app-development", desc: "Web & mobile apps with AI agents, auth, billing and observability built-in.", tag: "Next.js · Expo · AI-native" },
];

export function Services() {
  return (
    <section id="services" className="py-28 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">// Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Eight ways we <span className="text-gradient">automate revenue</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Productised AI, web and mobile services with fixed scope, fixed timeline and measurable ROI.
          </p>
        </div>


        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl border border-border bg-surface/60 backdrop-blur p-7 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-cyan/5 transition-all duration-500" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-cyan/10 border border-primary/30 mb-5 group-hover:scale-110 transition-transform">
                  <s.icon className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 pt-4 border-t border-border/60 text-xs font-mono text-muted-foreground">
                  {s.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
