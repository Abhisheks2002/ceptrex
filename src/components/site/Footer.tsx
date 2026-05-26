import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-14 mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display font-bold text-lg">NexaForge<span className="text-gradient"> AI</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              World-class AI agents & automation systems for high-growth companies.
              Stockholm · Dubai · New York.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Services</div>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-foreground text-muted-foreground">AI Agents</a></li>
                <li><a href="#services" className="hover:text-foreground text-muted-foreground">n8n Workflows</a></li>
                <li><a href="#services" className="hover:text-foreground text-muted-foreground">WhatsApp AI</a></li>
                <li><a href="#services" className="hover:text-foreground text-muted-foreground">CRM Automation</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Company</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-foreground text-muted-foreground">About</a></li>
                <li><a href="#portfolio" className="hover:text-foreground text-muted-foreground">Case Studies</a></li>
                <li><a href="#pricing" className="hover:text-foreground text-muted-foreground">Pricing</a></li>
                <li><a href="#contact" className="hover:text-foreground text-muted-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Legal</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-foreground text-muted-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground text-muted-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground text-muted-foreground">GDPR</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 NexaForge AI. All rights reserved.</div>
          <div className="font-mono">v1.0.0 · status: <span className="text-success">all systems operational</span></div>
        </div>
      </div>
    </footer>
  );
}
