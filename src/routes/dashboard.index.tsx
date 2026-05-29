import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { TrendingUp, Users, DollarSign, Calendar, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Ceptrex" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DashboardOverview,
});

const stats = [
  { label: "New leads (30d)", value: "247", delta: "+18.2%", icon: Users },
  { label: "Pipeline value", value: "$1.42M", delta: "+24.6%", icon: DollarSign },
  { label: "Discovery calls", value: "63", delta: "+9.1%", icon: Calendar },
  { label: "Win rate", value: "34%", delta: "+4.0pt", icon: TrendingUp },
];

const recent = [
  { name: "Marcus Chen", co: "Vantor SaaS", stage: "Proposal", value: "$48,000", when: "2h ago" },
  { name: "Aisha Al-Rashid", co: "Levant Properties", stage: "Discovery", value: "$22,500", when: "5h ago" },
  { name: "Daniel Pierre", co: "Helio Health", stage: "Closed Won", value: "$96,000", when: "1d ago" },
  { name: "Sara Lindqvist", co: "Nordic Logistics", stage: "Audit", value: "$0", when: "1d ago" },
  { name: "James O'Connor", co: "Atlas Capital", stage: "Negotiation", value: "$72,000", when: "2d ago" },
];

function DashboardOverview() {
  return (
    <DashboardShell title="Overview">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-5">
            <div className="flex items-center justify-between mb-3">
              <s.icon className="h-4 w-4 text-cyan" />
              <span className="text-xs text-success">{s.delta}</span>
            </div>
            <div className="font-display text-3xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-bold">Recent leads</h2>
            <Link to="/dashboard/leads" className="text-xs text-cyan inline-flex items-center gap-1 hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recent.map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-surface-elevated/50 transition-colors">
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{r.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{r.co}</div>
                </div>
                <div className="hidden sm:block text-xs text-muted-foreground">{r.stage}</div>
                <div className="text-sm font-mono">{r.value}</div>
                <div className="hidden md:block text-xs text-muted-foreground w-16 text-right">{r.when}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur p-6">
          <h2 className="font-display text-lg font-bold mb-5">Active workflows</h2>
          <div className="space-y-4">
            {[
              { name: "Lead qualifier", runs: "12,847 runs", status: "healthy" },
              { name: "WhatsApp triage", runs: "8,431 runs", status: "healthy" },
              { name: "CRM sync", runs: "3,209 runs", status: "warning" },
              { name: "Invoice OCR", runs: "1,128 runs", status: "healthy" },
            ].map((w) => (
              <div key={w.name} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{w.name}</div>
                  <div className="text-xs text-muted-foreground">{w.runs}</div>
                </div>
                <span className={`h-2 w-2 rounded-full ${w.status === "healthy" ? "bg-success" : "bg-gold"} animate-pulse`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
