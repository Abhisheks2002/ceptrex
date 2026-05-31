import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

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
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center cursor-pointer"
          aria-label="CEPTREX — AI Automation Agency"
          onClick={() => setOpen(false)}
        >
          <Logo size={36} />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative cursor-pointer transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-to-r after:from-primary after:to-cyan after:transition-all hover:after:w-full"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/book-call"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-4px_var(--color-primary)] cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_-2px_var(--color-primary)] hover:scale-[1.03]"
          >
            Book a Call
          </Link>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-surface cursor-pointer"
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
                className="py-2.5 text-muted-foreground hover:text-foreground border-b border-border/40 last:border-0 cursor-pointer"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-2.5 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Contact
            </Link>
            <Link
              to="/book-call"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center items-center rounded-full bg-gradient-to-r from-primary to-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground cursor-pointer"
            >
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
