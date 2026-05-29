import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/n8n-projects", label: "n8n" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/tech-stack", label: "Tech" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan glow-purple">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Ceptrex<span className="text-gradient"> AI</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/book-call"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-4px_var(--color-primary)] hover:shadow-[0_0_40px_-2px_var(--color-primary)] transition-shadow"
          >
            Book a Call
          </Link>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-surface"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1 text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-muted-foreground hover:text-foreground border-b border-border/40 last:border-0"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-2.5 text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              to="/book-call"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center items-center rounded-full bg-gradient-to-r from-primary to-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
