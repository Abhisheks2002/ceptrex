const logos = [
  "OpenAI", "Anthropic", "n8n", "Supabase", "Make.com", "Zapier",
  "HubSpot", "Salesforce", "Twilio", "Stripe", "Notion", "Slack",
];

export function Marquee() {
  return (
    <section className="py-12 border-y border-border/40 bg-surface/30">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
        Powered by the world's leading AI & automation stack
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex gap-16 animate-marquee w-max">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={i}
              className="font-display text-2xl font-semibold text-muted-foreground/60 hover:text-foreground transition-colors whitespace-nowrap"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
