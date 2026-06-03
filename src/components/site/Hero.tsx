import { ArrowRight, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Hero() {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="flex justify-center mb-8 animate-[fadeUp_1.2s_ease-out]">
          <Logo height={120} priority className="!drop-shadow-[0_0_40px_rgba(108,99,255,0.45)]" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-success animate-ping" />
            <span className="relative rounded-full h-1.5 w-1.5 bg-success" />
          </span>
          Now accepting Q1 2026 enterprise clients
        </div>


        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] max-w-5xl mx-auto">
          We Build <span className="text-gradient">AI Agents</span><br />
          That Run Your Business
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Custom AI automations, n8n workflows, CRM intelligence and WhatsApp agents
          for high-growth companies in the US, UK, UAE and Europe.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/book-call"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-purple hover:scale-[1.02] transition-transform"
          >
            Get Your Free AI Audit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-6 py-3.5 text-sm font-semibold hover:bg-surface transition-colors"
          >
            <Play className="h-4 w-4 text-cyan" />
            See Case Studies
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border bg-border">
          {[
            { k: "180+", v: "AI Agents Built" },
            { k: "$42M", v: "Client Revenue Driven" },
            { k: "12", v: "Industries Served" },
            { k: "98%", v: "Retention Rate" },
          ].map((s) => (
            <div key={s.v} className="bg-surface/80 backdrop-blur p-6">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
