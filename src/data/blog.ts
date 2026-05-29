export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  content: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "ai-sdr-playbook-2026",
    title: "The AI SDR Playbook for 2026",
    excerpt: "How leading B2B teams replaced human SDRs with always-on AI agents — and 4×'d pipeline in a quarter.",
    category: "AI Agents",
    readTime: "9 min",
    date: "2026-05-12",
    author: "Marcus Lee",
    content: [
      "Outbound has changed forever. The unit economics of human SDRs no longer make sense for most B2B teams under $50M ARR. Here's the operating model we deploy for clients across SaaS, fintech and proptech.",
      "Step one is data. A great AI SDR is only as good as its enrichment stack — Apollo + Clay + an in-house intent model is the floor.",
      "Step two is personalisation. We use a research agent that pulls recent LinkedIn posts, podcast appearances and product launches before composing the opener. Generic 'hope you're well' messages are dead.",
      "Step three is choreography. The AI SDR handles cadence, channel switching (email → LinkedIn → WhatsApp) and meeting booking via Chili Piper. Humans only get involved on replies.",
      "Step four is measurement. Reply rate, meeting-to-opp, and CAC payback are the only metrics that matter. Most teams over-instrument and under-act.",
    ],
  },
  {
    slug: "n8n-vs-zapier-enterprise",
    title: "n8n vs Zapier vs Make — the enterprise verdict",
    excerpt: "After 180+ production deployments, here's our honest breakdown of cost, control, and where each tool actually wins.",
    category: "Automation",
    readTime: "11 min",
    date: "2026-04-30",
    author: "Sofia Reyes",
    content: [
      "Zapier wins on speed-to-first-workflow. Make wins on visual debugging. n8n wins on cost, control and complexity.",
      "If you're processing more than 10,000 tasks/month, n8n self-hosted will pay for itself in under 8 weeks vs Zapier. Period.",
      "But n8n isn't a no-code tool — it's low-code with a learning curve. Teams without engineering capacity should stay on Make or invest in a partner.",
      "Our default stack is n8n in a client's VPC, Git-versioned, with Grafana + Loki for observability and PagerDuty for alerts.",
    ],
  },
  {
    slug: "whatsapp-ai-mena-playbook",
    title: "WhatsApp AI: the MENA growth playbook",
    excerpt: "Why every brand selling in UAE, KSA and Egypt needs a WhatsApp-first AI agent — and how to build one.",
    category: "WhatsApp",
    readTime: "7 min",
    date: "2026-04-18",
    author: "Aisha Al-Rashid",
    content: [
      "WhatsApp is the operating system of commerce in MENA. 87% of consumers prefer it for support, 62% have completed a purchase in-thread.",
      "Yet most brands respond in hours, not seconds. AI closes that gap — we routinely see 30-second response times across 12-hour spans.",
      "Three patterns that work: 1) Lead qualifier with broker handoff. 2) Catalog + checkout inside chat. 3) Multilingual support with smart escalation.",
    ],
  },
  {
    slug: "voice-ai-receptionist-economics",
    title: "Voice AI receptionists: the math behind $1.2M savings",
    excerpt: "Healthcare and dental groups are quietly replacing front desks with sub-300ms voice agents. Here's the ROI breakdown.",
    category: "Voice AI",
    readTime: "8 min",
    date: "2026-04-02",
    author: "Daniel Pierre",
    content: [
      "A 14-clinic group typically employs 18 receptionists at fully-loaded $65K — that's $1.17M/year, before missed-call revenue loss.",
      "A modern voice agent (Vapi + ElevenLabs + Athena integration) costs ~$2,800/month in usage at that scale. Even at $9,500 to build, payback is under 60 days.",
      "The hidden win is after-hours. 31% of calls go unanswered today; the agent captures every one.",
    ],
  },
  {
    slug: "rag-that-actually-works",
    title: "RAG that actually works in production",
    excerpt: "Most RAG projects die in pilot. Here's the eval-driven approach we use to ship retrieval that earns its keep.",
    category: "AI Agents",
    readTime: "12 min",
    date: "2026-03-19",
    author: "Jonas Berg",
    content: [
      "Don't pick a vector DB before you have an eval set. Reorder the operation: golden questions → eval harness → retrieval → generation.",
      "Hybrid (BM25 + dense) beats pure vector almost always. Rerankers (Cohere, Voyage) earn their cost.",
      "Citations are non-negotiable. If your bot can't link back to a source, your customers will not trust it twice.",
    ],
  },
  {
    slug: "ai-agency-stack-2026",
    title: "Our 2026 AI agency stack, end-to-end",
    excerpt: "The exact tooling we use to build and ship production AI for clients in 28 days.",
    category: "Engineering",
    readTime: "10 min",
    date: "2026-03-04",
    author: "Ceptrex Engineering",
    content: [
      "Models: GPT-4o for reasoning, Claude 3.5 Sonnet for writing, o1-mini for cheap classification, Llama 3.1 on Groq for latency-critical inference.",
      "Orchestration: LangGraph for agents, n8n for automations, Inngest for durable workflows.",
      "Data: Supabase + pgvector for 90% of cases, Pinecone when scale demands.",
      "Observability: LangSmith + Helicone + a custom Grafana board. Cost & latency dashboards live next to product analytics.",
    ],
  },
];
