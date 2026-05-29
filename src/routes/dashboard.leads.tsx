import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Search, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/leads")({
  head: () => ({
    meta: [
      { title: "Leads — NexaForge AI Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LeadsPage,
});

type Lead = { name: string; email: string; company: string; service: string; stage: string; value: number; date: string };

const seed: Lead[] = [
  { name: "Marcus Chen", email: "marcus@vantor.io", company: "Vantor SaaS", service: "AI Agents", stage: "Proposal", value: 48000, date: "2026-05-28" },
  { name: "Aisha Al-Rashid", email: "aisha@levant.ae", company: "Levant Properties", service: "WhatsApp AI", stage: "Discovery", value: 22500, date: "2026-05-28" },
  { name: "Daniel Pierre", email: "dp@helio.health", company: "Helio Health", service: "Voice AI", stage: "Closed Won", value: 96000, date: "2026-05-27" },
  { name: "Sara Lindqvist", email: "sara@nordiclog.se", company: "Nordic Logistics", service: "n8n Automation", stage: "Audit", value: 0, date: "2026-05-27" },
  { name: "James O'Connor", email: "james@atlascap.co.uk", company: "Atlas Capital", service: "CRM Automation", stage: "Negotiation", value: 72000, date: "2026-05-26" },
  { name: "Priya Sharma", email: "priya@neutron.ai", company: "Neutron AI", service: "AI Chatbots", stage: "Discovery", value: 18500, date: "2026-05-26" },
  { name: "Lukas Becker", email: "lukas@formel.de", company: "Formel GmbH", service: "AI Agents", stage: "Proposal", value: 54000, date: "2026-05-25" },
  { name: "Olivia Park", email: "olivia@brightline.co", company: "Brightline", service: "AI Analytics", stage: "Closed Won", value: 38000, date: "2026-05-24" },
  { name: "Yusuf Hassan", email: "yusuf@dunes.ae", company: "Dunes Holding", service: "WhatsApp AI", stage: "Audit", value: 0, date: "2026-05-23" },
];

const stageColor: Record<string, string> = {
  Audit: "text-muted-foreground border-border",
  Discovery: "text-cyan border-cyan/40",
  Proposal: "text-primary border-primary/40",
  Negotiation: "text-gold border-gold/40",
  "Closed Won": "text-success border-success/40",
};

function LeadsPage() {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<string>("All");

  const filtered = useMemo(
    () => seed.filter((l) =>
      (stage === "All" || l.stage === stage) &&
      (q === "" || `${l.name} ${l.company} ${l.email}`.toLowerCase().includes(q.toLowerCase()))
    ),
    [q, stage]
  );

  const exportCsv = () => {
    const rows = [["Name", "Email", "Company", "Service", "Stage", "Value", "Date"], ...filtered.map((l) => [l.name, l.email, l.company, l.service, l.stage, String(l.value), l.date])];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "leads.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const stages = ["All", "Audit", "Discovery", "Proposal", "Negotiation", "Closed Won"];

  return (
    <DashboardShell title="Leads">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, company, email…"
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-primary/60"
          />
        </div>
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className="bg-surface border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary/60"
        >
          {stages.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button onClick={exportCsv} className="ml-auto inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm hover:border-primary/60 transition-colors">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-elevated/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Company</th>
                <th className="text-left p-4 font-medium hidden lg:table-cell">Service</th>
                <th className="text-left p-4 font-medium">Stage</th>
                <th className="text-right p-4 font-medium">Value</th>
                <th className="text-right p-4 font-medium hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.email} className="border-t border-border hover:bg-surface-elevated/40 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.email}</div>
                  </td>
                  <td className="p-4 hidden md:table-cell">{l.company}</td>
                  <td className="p-4 hidden lg:table-cell text-muted-foreground">{l.service}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs ${stageColor[l.stage]}`}>{l.stage}</span>
                  </td>
                  <td className="p-4 text-right font-mono">${l.value.toLocaleString()}</td>
                  <td className="p-4 text-right text-muted-foreground hidden sm:table-cell">{l.date}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No leads match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
