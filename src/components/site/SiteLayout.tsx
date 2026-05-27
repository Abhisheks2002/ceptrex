import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative pt-20 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm text-cyan font-mono uppercase tracking-wider mb-4">
          // {eyebrow}
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
