import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-28 relative">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/40 bg-gradient-to-br from-surface via-surface to-primary/10 p-12 md:p-20 text-center">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-primary/30 blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="relative">
            <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-4">// Let's talk</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
              Ready to deploy AI<br />
              <span className="text-gradient">that pays for itself?</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
              Book a 30-minute strategy call. We'll audit your workflows live and
              identify your top 3 automation opportunities — free.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-8 py-4 text-sm font-semibold text-primary-foreground glow-purple hover:scale-[1.02] transition-transform"
              >
                Book Your Free AI Audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="mailto:ceptrexai@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                or email ceptrexai@gmail.com →
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
              <span>✓ No-pitch guarantee</span>
              <span>✓ Reply within 4 hours</span>
              <span>✓ NDA on request</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
