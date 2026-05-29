import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, BarChart3, LogOut, Sparkles, ShieldCheck } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/leads", label: "Leads", icon: Users, exact: false },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3, exact: false },
] as const;

export function DashboardShell({ children, title }: { children: ReactNode; title: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-surface/60 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-border">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display font-bold">Ceptrex<span className="text-gradient"> AI</span></span>
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-foreground border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface-elevated">
            <LogOut className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-surface/40 backdrop-blur flex items-center justify-between px-6">
          <div>
            <div className="text-xs font-mono text-cyan uppercase tracking-wider">// Admin</div>
            <h1 className="font-display text-lg font-bold leading-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-border bg-surface-elevated rounded-full px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              Demo view
            </span>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-primary-foreground text-sm font-semibold">
              NF
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
