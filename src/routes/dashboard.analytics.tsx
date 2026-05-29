import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — NexaForge AI Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AnalyticsPage,
});

const traffic = [12, 18, 14, 22, 28, 24, 32, 38, 30, 42, 48, 44, 56, 62];
const max = Math.max(...traffic);

const topPages = [
  { path: "/", views: 18420, conv: "4.8%" },
  { path: "/services/ai-agents", views: 8120, conv: "6.2%" },
  { path: "/case-studies", views: 6230, conv: "5.1%" },
  { path: "/pricing", views: 5840, conv: "9.4%" },
  { path: "/n8n-projects", views: 4310, conv: "3.7%" },
  { path: "/roi-calculator", views: 3920, conv: "12.1%" },
];

const sources = [
  { name: "Organic search", pct: 42, color: "bg-primary" },
  { name: "LinkedIn", pct: 24, color: "bg-cyan" },
  { name: "Direct", pct: 18, color: "bg-success" },
  { name: "Referral", pct: 10, color: "bg-gold" },
  { name: "Other", pct: 6, color: "bg-muted-foreground" },
];

function AnalyticsPage() {
  return (
    <DashboardShell title="Analytics">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { l: "Visitors (30d)", v: "48,210", d: "+22%" },
          { l: "Sessions", v: "62,840", d: "+18%" },
          { l: "Avg. duration", v: "3m 42s", d: "+11%" },
          { l: "Conversion rate", v: "5.6%", d: "+1.4pt" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-5">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
            <div className="font-display text-3xl font-bold mt-2">{s.v}</div>
            <div className="text-xs text-success mt-1">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
          <h2 className="font-display text-lg font-bold mb-5">Traffic (last 14 days)</h2>
          <div className="flex items-end gap-2 h-48">
            {traffic.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary to-cyan"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground font-mono">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
          <h2 className="font-display text-lg font-bold mb-5">Traffic sources</h2>
          <div className="space-y-4">
            {sources.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{s.name}</span>
                  <span className="font-mono text-muted-foreground">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-elevated overflow-hidden">
                  <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
        <h2 className="font-display text-lg font-bold mb-5">Top pages</h2>
        <div className="space-y-1">
          {topPages.map((p) => (
            <div key={p.path} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-elevated/50 transition-colors">
              <span className="font-mono text-sm">{p.path}</span>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-muted-foreground">{p.views.toLocaleString()} views</span>
                <span className="text-success font-mono w-12 text-right">{p.conv}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
