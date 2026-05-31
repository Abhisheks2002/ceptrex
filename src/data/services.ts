export type ServiceDetail = {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  hero: string;
  problems: string[];
  capabilities: { title: string; desc: string }[];
  stack: string[];
  outcomes: { metric: string; label: string }[];
  deliverables: string[];
  timeline: string;
  startingAt: string;
};

export const services: ServiceDetail[] = [
  {
    slug: "ai-agents",
    icon: "Bot",
    title: "AI Agents",
    tagline: "Autonomous teammates that work 24/7 across sales, ops, and support.",
    hero: "Custom AI agents trained on your data, connected to your tools, and accountable to your KPIs. Built on GPT-4o, Claude 3.5 and open-source models — orchestrated with LangGraph + your own guardrails.",
    problems: [
      "Reps spend 60% of the day on research, follow-ups and CRM hygiene",
      "Support tickets sit in queue overnight while customers churn",
      "Operations buried in repetitive cross-system tasks",
    ],
    capabilities: [
      { title: "Multi-step reasoning", desc: "Plan → act → reflect loops with tool use across 200+ integrations." },
      { title: "Memory & RAG", desc: "Vector + structured memory so agents recall every customer, deal and doc." },
      { title: "Human-in-the-loop", desc: "Approval flows for high-stakes actions — Slack, email, dashboards." },
      { title: "Observability", desc: "Full trace logs, cost tracking, evals and rollback on every agent run." },
    ],
    stack: ["GPT-4o / Claude 3.5", "LangGraph", "Pinecone / pgvector", "n8n", "Supabase", "Slack"],
    outcomes: [
      { metric: "412%", label: "more qualified meetings" },
      { metric: "24/7", label: "always-on coverage" },
      { metric: "$2M+", label: "in driven revenue" },
    ],
    deliverables: ["Agent architecture & spec", "Production deployment", "Eval suite + dashboards", "90 days optimization"],
    timeline: "21–28 days",
    startingAt: "$8,500",
  },
  {
    slug: "ai-automation",
    icon: "Sparkles",
    title: "AI Automation",
    tagline: "End-to-end automated workflows powered by LLMs across your entire stack.",
    hero: "We don't just connect APIs — we add intelligence at every step. Classify, extract, summarise, route and act, with humans only in the loop where it counts.",
    problems: [
      "Zapier breaks when data is messy or unstructured",
      "Teams copy-paste between 12+ SaaS tools daily",
      "Approval bottlenecks stall revenue and ops",
    ],
    capabilities: [
      { title: "Intelligent routing", desc: "LLMs classify inputs and route to the right team, queue or agent." },
      { title: "Data extraction", desc: "Pull structured data from PDFs, emails, screenshots and voice transcripts." },
      { title: "Auto-summarisation", desc: "Daily briefings, meeting notes and CRM-ready summaries." },
      { title: "Closed-loop QA", desc: "AI checks AI — automatic eval + retry on every workflow step." },
    ],
    stack: ["OpenAI", "Anthropic", "n8n", "Make.com", "Zapier", "Airtable", "Notion"],
    outcomes: [
      { metric: "10,000+", label: "hours automated/yr" },
      { metric: "85%", label: "less manual work" },
      { metric: "3 days", label: "average payback" },
    ],
    deliverables: ["Workflow maps", "Versioned automations", "Error queues + alerts", "Cost dashboards"],
    timeline: "14–21 days",
    startingAt: "$4,950",
  },
  {
    slug: "n8n-automation",
    icon: "Workflow",
    title: "n8n Automation",
    tagline: "Self-hosted, source-controlled automation built for scale and security.",
    hero: "n8n gives you Zapier-class speed with full code control, on-prem hosting, and no per-task fees. We build, deploy and operate it for you.",
    problems: [
      "SaaS automation costs scale linearly with growth",
      "Data leaves your perimeter and that's a no-go for compliance",
      "No visibility into failures until customers complain",
    ],
    capabilities: [
      { title: "Self-hosted deploy", desc: "VPC, Docker or Kubernetes — your data never leaves your cloud." },
      { title: "Git-versioned flows", desc: "PR-reviewed workflows with staging, prod and instant rollback." },
      { title: "Custom nodes", desc: "TypeScript nodes for proprietary APIs and internal systems." },
      { title: "24/7 monitoring", desc: "PagerDuty hooks, retry queues and SLA-backed support." },
    ],
    stack: ["n8n", "Docker", "PostgreSQL", "Redis", "Grafana", "GitHub Actions"],
    outcomes: [
      { metric: "$48K", label: "avg annual savings vs Zapier" },
      { metric: "99.9%", label: "workflow uptime" },
      { metric: "24+", label: "production projects" },
    ],
    deliverables: ["Hosted n8n instance", "Workflow library", "Runbook + monitoring", "Team training"],
    timeline: "10–28 days",
    startingAt: "$6,500",
  },
  {
    slug: "crm-automation",
    icon: "Database",
    title: "CRM Automation",
    tagline: "Turn HubSpot or Salesforce into an AI-native revenue machine.",
    hero: "Enrichment, scoring, sequencing, and a co-pilot for every rep — all running inside your existing CRM.",
    problems: [
      "Lead data is incomplete and stale within 30 days",
      "Reps work the wrong accounts because scoring is a guess",
      "Pipeline reviews are spreadsheet archaeology",
    ],
    capabilities: [
      { title: "Auto-enrichment", desc: "Apollo, Clay, LinkedIn + custom signals piped in nightly." },
      { title: "AI lead scoring", desc: "Behavioural + firmographic + intent models — explainable & tunable." },
      { title: "Outbound co-pilot", desc: "Hyper-personalised email + LinkedIn sequences from one prompt." },
      { title: "Forecast intelligence", desc: "AI-cleaned pipeline and revenue forecasts board-ready every Monday." },
    ],
    stack: ["HubSpot", "Salesforce", "Apollo", "Clay", "Smartlead", "Snowflake"],
    outcomes: [
      { metric: "35%", label: "more SQLs from same volume" },
      { metric: "8.4%", label: "outbound reply rate" },
      { metric: "63%", label: "faster response time" },
    ],
    deliverables: ["CRM audit", "Enrichment pipeline", "Scoring model", "Rep co-pilot rollout"],
    timeline: "14–28 days",
    startingAt: "$7,500",
  },
  {
    slug: "whatsapp-automation",
    icon: "MessageCircle",
    title: "WhatsApp AI",
    tagline: "Conversational agents on WhatsApp Business that qualify, book and sell.",
    hero: "We build WhatsApp agents on the official Meta Cloud API — multilingual, multi-tenant and connected to your CRM and calendar.",
    problems: [
      "60% of WhatsApp inbounds wait >2 hours for a human reply",
      "Sales teams in MENA & LATAM lose deals to slow responders",
      "Manual booking + qualification = bottleneck",
    ],
    capabilities: [
      { title: "Lead qualification", desc: "Ask the right questions, score the lead, hand off only the qualified ones." },
      { title: "Calendar booking", desc: "Native Cal.com / Google Calendar booking inside the chat." },
      { title: "Multi-broker routing", desc: "Round-robin or smart routing to the right rep based on language & spec." },
      { title: "Catalog & checkout", desc: "Browse, configure and pay — all inside WhatsApp." },
    ],
    stack: ["Meta Cloud API", "Twilio", "n8n", "Supabase", "OpenAI", "Cal.com"],
    outcomes: [
      { metric: "63%", label: "faster response time" },
      { metric: "9×", label: "broker capacity" },
      { metric: "85%", label: "ticket deflection" },
    ],
    deliverables: ["WhatsApp number + verified profile", "Agent + flows", "CRM sync", "Live dashboard"],
    timeline: "14–21 days",
    startingAt: "$5,500",
  },
  {
    slug: "ai-chatbots",
    icon: "MessagesSquare",
    title: "AI Chatbots",
    tagline: "Brand-trained assistants for your website, app, and help center.",
    hero: "RAG-powered chatbots that actually know your product, pricing, and policies — with citations, fallbacks, and human handoff.",
    problems: [
      "Generic bots hallucinate and damage trust",
      "Support tickets balloon while docs sit unread",
      "No insight into what customers actually ask",
    ],
    capabilities: [
      { title: "Retrieval-augmented", desc: "Trained on your docs, tickets, Notion, Confluence — kept fresh nightly." },
      { title: "Citations & sources", desc: "Every answer linked back to the source doc — zero hallucinations." },
      { title: "Human handoff", desc: "Native Intercom, Zendesk, Slack and Crisp integrations." },
      { title: "Conversation analytics", desc: "Top topics, deflection rate, CSAT — exec-ready dashboards." },
    ],
    stack: ["OpenAI", "Pinecone", "LangChain", "Intercom", "Crisp", "Zendesk"],
    outcomes: [
      { metric: "91%", label: "tickets auto-resolved" },
      { metric: "$82K", label: "saved per year" },
      { metric: "4.7/5", label: "CSAT on bot replies" },
    ],
    deliverables: ["Trained chatbot", "Admin console", "Handoff integration", "Analytics dashboard"],
    timeline: "10–21 days",
    startingAt: "$3,950",
  },
  {
    slug: "voice-ai",
    icon: "PhoneCall",
    title: "Voice AI",
    tagline: "Phone agents that book appointments, qualify leads and handle support.",
    hero: "Sub-300ms voice agents on real phone numbers — barge-in, interruptions, accents, all handled.",
    problems: [
      "Missed calls = missed revenue, especially after hours",
      "Receptionists cost $40K+ and don't scale",
      "Manual call summaries kill rep productivity",
    ],
    capabilities: [
      { title: "Inbound receptionist", desc: "Answer, route, book — 24/7 in 30+ languages." },
      { title: "Outbound qualifier", desc: "Call inbound web leads in <60s and book the meeting." },
      { title: "Call summaries", desc: "Auto-pushed to CRM with action items and sentiment." },
      { title: "EHR / CRM sync", desc: "Native HubSpot, Salesforce and Epic / Athena integrations." },
    ],
    stack: ["Vapi", "Retell", "ElevenLabs", "Twilio", "Deepgram", "OpenAI"],
    outcomes: [
      { metric: "$1.2M", label: "annual labor savings" },
      { metric: "100%", label: "call answer rate" },
      { metric: "24/7", label: "appointment booking" },
    ],
    deliverables: ["Voice agent", "Phone numbers", "CRM/EHR integration", "Call analytics"],
    timeline: "14–28 days",
    startingAt: "$6,950",
  },
  {
    slug: "ai-analytics",
    icon: "LineChart",
    title: "AI Analytics",
    tagline: "Natural-language analytics on top of your warehouse and CRM.",
    hero: "Ask any question. Get a chart, a number and the SQL behind it. Built on your Snowflake, BigQuery or Postgres.",
    problems: [
      "Execs wait days for data team to pull a number",
      "Dashboards proliferate and no one trusts them",
      "Anomalies are noticed last by the people who should know first",
    ],
    capabilities: [
      { title: "Text-to-SQL", desc: "Semantic-layer-aware queries — never trains on raw schema." },
      { title: "Auto-narratives", desc: "Daily 'what changed' digests sent to Slack and email." },
      { title: "Anomaly alerts", desc: "ML-detected spikes and dips with root-cause suggestions." },
      { title: "Embedded analytics", desc: "Drop the assistant into your product or admin panel." },
    ],
    stack: ["Snowflake", "BigQuery", "Postgres", "dbt", "Cube.dev", "OpenAI"],
    outcomes: [
      { metric: "30×", label: "faster than waiting on data team" },
      { metric: "100%", label: "answers cited with SQL" },
      { metric: "Daily", label: "exec briefings" },
    ],
    deliverables: ["Semantic layer", "Assistant UI", "Alerting rules", "Adoption training"],
    timeline: "21–35 days",
    startingAt: "$9,500",
  },
  {
    slug: "website-building",
    icon: "Globe",
    title: "Website Building",
    tagline: "Award-worthy, conversion-obsessed marketing sites — engineered for AI-era growth.",
    hero: "We design and ship premium Next.js / TanStack websites with SSR, perfect SEO, blazing Core Web Vitals and a CMS your team actually enjoys. Every site we build is a sales engine — wired to your CRM, analytics and AI agents from day one.",
    problems: [
      "Slow, template-based sites that bleed conversions and SEO rankings",
      "No analytics, no A/B testing, no CRM — marketing is flying blind",
      "Dev backlog of 6+ months for every landing page or experiment",
    ],
    capabilities: [
      { title: "Premium design system", desc: "Bespoke Figma → Tailwind tokens, dark/light, motion + 3D where it counts." },
      { title: "Headless CMS", desc: "Sanity or Payload so marketing ships pages without engineering tickets." },
      { title: "SEO + performance", desc: "100/100 Lighthouse, structured data, sitemaps, OG, edge-cached SSR." },
      { title: "CRM + AI built in", desc: "Forms, chat, lead routing, AI assistant — wired to HubSpot / Salesforce / Slack." },
    ],
    stack: ["Next.js / TanStack Start", "TypeScript", "Tailwind v4", "Sanity CMS", "Vercel / Cloudflare", "PostHog"],
    outcomes: [
      { metric: "100/100", label: "Lighthouse score" },
      { metric: "3.2×", label: "lift in conversions" },
      { metric: "14d", label: "average launch" },
    ],
    deliverables: ["Design system + Figma", "Full Next.js codebase", "CMS + content migration", "Analytics + CRM wiring"],
    timeline: "14–28 days",
    startingAt: "$7,500",
  },
  {
    slug: "app-development",
    icon: "Smartphone",
    title: "App Development",
    tagline: "Production-grade web & mobile apps with AI baked into the core — not bolted on.",
    hero: "From internal tools to public SaaS to iOS / Android apps, we build typed, observable, AI-native products on Next.js, React Native and Supabase. Auth, billing, realtime, vector search and agents — wired from day one.",
    problems: [
      "MVP built by freelancers is now an unmaintainable liability",
      "Need AI features (chat, copilots, RAG) but the stack can't support them",
      "Scaling pains: no auth, no roles, no observability, no tests",
    ],
    capabilities: [
      { title: "Full-stack typed", desc: "Next.js / TanStack + tRPC + Drizzle / Prisma — types end-to-end, zero drift." },
      { title: "Mobile native", desc: "Expo + React Native, one codebase, App Store + Play Store delivery." },
      { title: "AI-native core", desc: "Built-in chat, RAG, agents, embeddings — not a bolted-on widget." },
      { title: "Production from day 1", desc: "Auth, RBAC, billing, queues, observability, CI/CD, evals." },
    ],
    stack: ["Next.js / TanStack", "React Native (Expo)", "Supabase", "Stripe", "OpenAI / Anthropic", "Sentry"],
    outcomes: [
      { metric: "4–8 wk", label: "MVP to production" },
      { metric: "99.95%", label: "uptime SLOs" },
      { metric: "0 → 1M", label: "users-ready architecture" },
    ],
    deliverables: ["Product + UX spec", "Web + mobile codebase", "Auth, billing, AI core", "30-day post-launch support"],
    timeline: "4–10 weeks",
    startingAt: "$14,500",
  },
];

