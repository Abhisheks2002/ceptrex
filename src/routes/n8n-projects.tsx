import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { CTA } from "@/components/site/CTA";
import {
  Workflow,
  Mail,
  MessageCircle,
  FileText,
  Database,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  Bot,
  Phone,
  Globe,
  Briefcase,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/n8n-projects")({
  head: () => ({
    meta: [
      { title: "n8n Automation Projects — NexaForge AI" },
      {
        name: "description",
        content:
          "24 production-grade n8n automation projects: AI lead-gen, WhatsApp bots, RAG chatbots, CRM sync, invoice OCR, social-media pipelines and more.",
      },
      { property: "og:title", content: "n8n Automation Projects — NexaForge AI" },
      {
        property: "og:description",
        content: "Real-world n8n workflows shipping in production across 12 industries.",
      },
    ],
  }),
  component: N8nProjectsPage,
});

const categories = [
  { key: "sales", label: "Sales & Lead Gen" },
  { key: "support", label: "Customer Support" },
  { key: "ops", label: "Operations" },
  { key: "content", label: "Content & Marketing" },
  { key: "data", label: "Data & RAG" },
  { key: "finance", label: "Finance & Admin" },
];

type Project = {
  icon: any;
  title: string;
  category: string;
  problem: string;
  solution: string;
  stack: string[];
  nodes: number;
  metric: string;
  metricLabel: string;
};

const projects: Project[] = [
  {
    icon: Users,
    title: "AI Lead Enrichment Pipeline",
    category: "sales",
    problem: "SDRs spent 4 hrs/day manually researching inbound leads on LinkedIn and Clearbit.",
    solution:
      "Webhook trigger → Clearbit + Apollo enrichment → GPT-5 scoring → HubSpot upsert → Slack alert for AE.",
    stack: ["HubSpot", "Apollo.io", "Clearbit", "OpenAI", "Slack"],
    nodes: 18,
    metric: "+412%",
    metricLabel: "qualified meetings booked",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp AI Sales Agent",
    category: "sales",
    problem: "Real-estate brokerage lost 60% of WhatsApp leads to slow human response time.",
    solution:
      "WhatsApp Cloud API → intent classification → property RAG → booking via Cal.com → CRM log.",
    stack: ["WhatsApp Business API", "OpenAI", "Cal.com", "Pipedrive", "Supabase"],
    nodes: 26,
    metric: "63%",
    metricLabel: "faster response time",
  },
  {
    icon: Mail,
    title: "Cold Outbound Personalization Engine",
    category: "sales",
    problem: "Generic outbound sequences had 0.4% reply rate across 50K prospects.",
    solution:
      "Smartlead trigger → website scraper → GPT personalization → A/B copy → reply-handling sub-workflow.",
    stack: ["Smartlead", "Firecrawl", "OpenAI", "Notion"],
    nodes: 22,
    metric: "8.2%",
    metricLabel: "reply rate",
  },
  {
    icon: Calendar,
    title: "Voice Inbound Qualifier",
    category: "sales",
    problem: "Inbound calls bounced after hours, killing 35% of pipeline.",
    solution:
      "Twilio voice → Whisper transcription → GPT qualification → Calendly booking → CRM note.",
    stack: ["Twilio", "OpenAI Whisper", "Calendly", "HubSpot"],
    nodes: 15,
    metric: "$1.8M",
    metricLabel: "recovered pipeline / yr",
  },
  {
    icon: Bot,
    title: "Tier-1 Support Auto-Resolver",
    category: "support",
    problem: "Shopify merchant network drowning in 12K monthly 'where is my order' tickets.",
    solution:
      "Intercom webhook → Shopify lookup → AI reply draft → auto-send if confidence > 0.85, else escalate.",
    stack: ["Intercom", "Shopify", "OpenAI", "Postgres"],
    nodes: 19,
    metric: "91%",
    metricLabel: "tickets auto-resolved",
  },
  {
    icon: Phone,
    title: "Multilingual Hotel Concierge",
    category: "support",
    problem: "22-property chain handling 6 languages with 14 night-shift agents.",
    solution:
      "WhatsApp inbound → language detect → RAG over hotel KB → booking-system actions → handoff if needed.",
    stack: ["WhatsApp", "DeepL", "Pinecone", "Mews PMS"],
    nodes: 31,
    metric: "4.9★",
    metricLabel: "guest satisfaction",
  },
  {
    icon: FileText,
    title: "Contract Review Copilot",
    category: "ops",
    problem: "Legal team spent 6 hrs per NDA reviewing clauses against playbook.",
    solution:
      "Email trigger → PDF parse → clause extraction → playbook diff via Claude → redline doc back to lawyer.",
    stack: ["Gmail", "Claude Sonnet", "DocuSign", "Postgres"],
    nodes: 24,
    metric: "72%",
    metricLabel: "review time saved",
  },
  {
    icon: Zap,
    title: "Fleet Dispatch Voice Agent",
    category: "ops",
    problem: "Dispatch desk drowning in driver calls for route updates.",
    solution:
      "Twilio voice → intent routing → Onfleet API actions → SMS confirmation → daily report.",
    stack: ["Twilio", "Onfleet", "OpenAI", "Google Sheets"],
    nodes: 17,
    metric: "$2.4M",
    metricLabel: "yearly savings",
  },
  {
    icon: Briefcase,
    title: "AI Recruiter — Screen & Schedule",
    category: "ops",
    problem: "Talent team manually screened 800+ resumes/week across 30 open roles.",
    solution:
      "Workable trigger → resume parse → JD-match scoring → top-10% auto-scheduled via Calendly.",
    stack: ["Workable", "OpenAI", "Calendly", "Slack"],
    nodes: 21,
    metric: "11x",
    metricLabel: "faster screening",
  },
  {
    icon: Globe,
    title: "SEO Content Factory",
    category: "content",
    problem: "Publisher needed 200 long-form articles/month across 6 niches.",
    solution:
      "Keyword sheet → SERP scrape → outline → draft → AI image → WordPress draft with internal links.",
    stack: ["Ahrefs", "Firecrawl", "OpenAI", "WordPress", "Cloudinary"],
    nodes: 34,
    metric: "240",
    metricLabel: "articles / month",
  },
  {
    icon: BarChart3,
    title: "Social Media Repurposing Engine",
    category: "content",
    problem: "Founder's podcast had 2-hr episodes but no distribution across short-form.",
    solution:
      "RSS trigger → Whisper transcript → GPT clip-finder → Opus Clip render → schedule on LinkedIn, X, TikTok, IG.",
    stack: ["OpenAI Whisper", "Opus Clip", "Buffer", "Notion"],
    nodes: 28,
    metric: "+340%",
    metricLabel: "follower growth",
  },
  {
    icon: Mail,
    title: "Newsletter Personalization at Scale",
    category: "content",
    problem: "120K-subscriber list saw 18% open rate due to one-size-fits-all copy.",
    solution:
      "Segment users by behavior → GPT subject + intro variants per segment → ESP send → engagement loop.",
    stack: ["Customer.io", "OpenAI", "Mixpanel", "Postgres"],
    nodes: 16,
    metric: "47%",
    metricLabel: "open rate",
  },
  {
    icon: Database,
    title: "Internal RAG Knowledge Assistant",
    category: "data",
    problem: "300-person SaaS team pinged senior eng 200×/week for tribal knowledge.",
    solution:
      "Notion + Confluence + GitHub sync → embeddings → Slack bot with auth-aware retrieval.",
    stack: ["Notion", "Confluence", "GitHub", "Pinecone", "Slack"],
    nodes: 23,
    metric: "85%",
    metricLabel: "questions deflected",
  },
  {
    icon: FileText,
    title: "Document OCR & Classification",
    category: "data",
    problem: "Insurance back-office hand-keyed 4K claim forms/week.",
    solution:
      "Email/SFTP intake → Google Doc AI OCR → GPT field extraction → validation → Guidewire API.",
    stack: ["Google Document AI", "OpenAI", "Guidewire", "Postgres"],
    nodes: 20,
    metric: "98.4%",
    metricLabel: "extraction accuracy",
  },
  {
    icon: BarChart3,
    title: "Daily Revenue Briefing",
    category: "data",
    problem: "CEO wanted a 7am AI briefing on KPIs across 4 tools.",
    solution:
      "Cron → Stripe + HubSpot + Mixpanel + Plausible → GPT synthesis → email + WhatsApp delivery.",
    stack: ["Stripe", "HubSpot", "Mixpanel", "OpenAI", "Resend"],
    nodes: 14,
    metric: "12 min",
    metricLabel: "saved daily",
  },
  {
    icon: ShoppingCart,
    title: "Abandoned Cart AI Recovery",
    category: "sales",
    problem: "DTC brand losing $90K/month to abandoned carts; generic emails ignored.",
    solution:
      "Shopify webhook → enrich with order history → personalized WhatsApp + email sequence → discount logic.",
    stack: ["Shopify", "Klaviyo", "WhatsApp", "OpenAI"],
    nodes: 19,
    metric: "+38%",
    metricLabel: "cart recovery",
  },
  {
    icon: Workflow,
    title: "Multi-CRM Sync Hub",
    category: "ops",
    problem: "M&A'd company had HubSpot, Salesforce, and Pipedrive — chaos.",
    solution:
      "Event bus pattern → bi-directional sync of contacts, deals, activities → conflict resolution AI.",
    stack: ["HubSpot", "Salesforce", "Pipedrive", "Redis"],
    nodes: 38,
    metric: "0",
    metricLabel: "data conflicts",
  },
  {
    icon: FileText,
    title: "AI Invoice Processing",
    category: "finance",
    problem: "Finance team processed 1,200 vendor invoices/month manually into NetSuite.",
    solution:
      "Email intake → OCR → GPT field map → 3-way match (PO, GRN, invoice) → NetSuite + approval routing.",
    stack: ["Google Doc AI", "OpenAI", "NetSuite", "Slack"],
    nodes: 26,
    metric: "94%",
    metricLabel: "touchless processing",
  },
  {
    icon: BarChart3,
    title: "Expense Report Automation",
    category: "finance",
    problem: "Sales team submitted expense reports late and inaccurately.",
    solution:
      "WhatsApp photo → receipt OCR → policy check → Expensify draft → manager approval bot.",
    stack: ["WhatsApp", "Veryfi OCR", "Expensify", "OpenAI"],
    nodes: 17,
    metric: "5 min",
    metricLabel: "per report",
  },
  {
    icon: Mail,
    title: "AR Collections Agent",
    category: "finance",
    problem: "60-day overdue AR ballooned to $1.4M with no chase cadence.",
    solution:
      "Stripe + Xero overdue → personalized dunning sequence → payment link → CFO escalation thread.",
    stack: ["Stripe", "Xero", "OpenAI", "Resend"],
    nodes: 18,
    metric: "$1.1M",
    metricLabel: "collected in 60 days",
  },
  {
    icon: Users,
    title: "Patient Intake Voice Agent",
    category: "support",
    problem: "Clinic front-desk overwhelmed; 28% no-show rate.",
    solution:
      "Twilio voice → HIPAA-safe transcription → EHR (Athena) booking → SMS reminder cadence.",
    stack: ["Twilio", "Whisper", "Athenahealth", "OpenAI"],
    nodes: 22,
    metric: "$1.2M",
    metricLabel: "annual labor savings",
  },
  {
    icon: Zap,
    title: "Predictive Maintenance Alerts",
    category: "ops",
    problem: "Factory PLC downtime cost €18K/hour; alerts came too late.",
    solution:
      "MQTT stream → anomaly model → GPT root-cause narrative → Microsoft Teams + work-order in SAP.",
    stack: ["MQTT", "Python ML", "OpenAI", "SAP", "Teams"],
    nodes: 25,
    metric: "31%",
    metricLabel: "downtime cut",
  },
  {
    icon: Bot,
    title: "AI Tutor for K-12 Platform",
    category: "data",
    problem: "EdTech platform with 60K students needed 1:1 tutoring at scale.",
    solution:
      "Lesson context + student progress → adaptive Socratic dialogue → progress logged → parent digest.",
    stack: ["Postgres", "OpenAI", "Pinecone", "Resend"],
    nodes: 29,
    metric: "94%",
    metricLabel: "course completion",
  },
  {
    icon: Globe,
    title: "Compliance Copilot for KYC",
    category: "finance",
    problem: "Fintech KYC team reviewed 600 files/day across 14 doc types.",
    solution:
      "Doc upload → OCR → sanctions list check → adverse-media GPT summary → analyst dashboard.",
    stack: ["Onfido", "OpenAI", "ComplyAdvantage", "Retool"],
    nodes: 27,
    metric: "8x",
    metricLabel: "faster file review",
  },
];

function N8nProjectsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="n8n Automation Projects"
        title="24 production workflows."
        highlight="2,400+ nodes shipped."
        subtitle="Real n8n automations running in production for our clients — every project includes architecture diagrams, source workflows, and a 90-day optimization SLA."
      />

      {/* Stats strip */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "24", l: "live workflows" },
              { v: "2,400+", l: "nodes orchestrated" },
              { v: "47", l: "tools integrated" },
              { v: "12", l: "industries served" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6 text-center"
              >
                <div className="font-display text-4xl font-bold text-gradient">{s.v}</div>
                <div className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-wider">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category legend */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <span
                key={c.key}
                className="px-4 py-1.5 rounded-full border border-border bg-surface/40 text-xs font-mono text-muted-foreground"
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => {
              const cat = categories.find((c) => c.key === p.category)?.label;
              return (
                <article
                  key={p.title}
                  className="group relative rounded-2xl border border-border bg-surface/60 backdrop-blur p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-cyan/10 border border-primary/30">
                      <p.icon className="h-5 w-5 text-cyan" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-1 rounded-full border border-border/60">
                      {cat}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold leading-tight mb-3">
                    {p.title}
                  </h3>

                  <div className="space-y-2 text-xs mb-4">
                    <div>
                      <div className="font-mono text-muted-foreground uppercase tracking-wider mb-1">
                        Problem
                      </div>
                      <p className="text-foreground/85 leading-relaxed">{p.problem}</p>
                    </div>
                    <div>
                      <div className="font-mono text-muted-foreground uppercase tracking-wider mb-1 mt-3">
                        Workflow
                      </div>
                      <p className="text-foreground/85 leading-relaxed">{p.solution}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/60">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-foreground/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="font-display text-2xl font-bold text-gradient">
                          {p.metric}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{p.metricLabel}</div>
                      </div>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        {p.nodes} nodes
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture / What you get */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-3">
              // What's in the box
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Every n8n build ships with <span className="text-gradient">production guardrails</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                t: "Self-hosted n8n on your VPC",
                d: "Docker Compose + Postgres on your AWS, GCP or Hetzner — SOC2-friendly, your data never leaves.",
              },
              {
                t: "Git-versioned workflows",
                d: "Every workflow exported to a repo with CI checks, code review, and rollback.",
              },
              {
                t: "Error queues & retries",
                d: "Idempotent steps, exponential backoff, dead-letter queue and PagerDuty alerts on failure.",
              },
              {
                t: "Cost & latency dashboards",
                d: "Token spend, model latency, and per-workflow ROI tracked in Grafana from day one.",
              },
              {
                t: "Secrets in a vault",
                d: "Doppler / AWS Secrets Manager wired in — no API keys in workflow JSON.",
              },
              {
                t: "Human-in-the-loop",
                d: "Slack / WhatsApp approval steps for any high-stakes action (refunds, contracts, payouts).",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6 flex gap-4"
              >
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-semibold mb-1">{f.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-4px_var(--color-primary)] hover:shadow-[0_0_60px_-2px_var(--color-primary)] transition-shadow"
            >
              Scope your n8n project →
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </SiteLayout>
  );
}
