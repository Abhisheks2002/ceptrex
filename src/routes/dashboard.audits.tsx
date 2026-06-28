import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Search, Download, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Audit = Database["public"]["Tables"]["audit_requests"]["Row"];
type AuditStatus = Database["public"]["Enums"]["audit_status"];

export const Route = createFileRoute("/dashboard/audits")({
  head: () => ({
    meta: [
      { title: "AI Audit Requests — Ceptrex Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuditsPage,
});

const STATUSES: AuditStatus[] = ["NEW", "REVIEWING", "SCHEDULED", "COMPLETED", "CLOSED"];

const statusColor: Record<AuditStatus, string> = {
  NEW: "text-cyan border-cyan/40",
  REVIEWING: "text-primary border-primary/40",
  SCHEDULED: "text-gold border-gold/40",
  COMPLETED: "text-success border-success/40",
  CLOSED: "text-muted-foreground border-border",
};

function AuditsPage() {
  const [rows, setRows] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | AuditStatus>("All");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("audit_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setLoading(false);
    if (error) { setForbidden(true); return; }
    setForbidden(false);
    setRows(data ?? []);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(
    () => rows.filter((l) =>
      (status === "All" || l.audit_status === status) &&
      (q === "" || `${l.name} ${l.company} ${l.email}`.toLowerCase().includes(q.toLowerCase()))
    ),
    [rows, q, status]
  );

  async function updateStatus(id: string, next: AuditStatus) {
    const prev = rows;
    setRows((r) => r.map((l) => (l.id === id ? { ...l, audit_status: next } : l)));
    const { error } = await supabase.from("audit_requests").update({ audit_status: next }).eq("id", id);
    if (error) { setRows(prev); toast.error("Couldn't update status"); } else { toast.success("Status updated"); }
  }

  async function remove(id: string) {
    if (!confirm("Delete this audit request?")) return;
    const { error } = await supabase.from("audit_requests").delete().eq("id", id);
    if (error) { toast.error("Delete failed"); return; }
    setRows((r) => r.filter((l) => l.id !== id));
    toast.success("Deleted");
  }

  const exportCsv = () => {
    const headers = ["Created", "Name", "Company", "Email", "Website", "Industry", "Employees", "Revenue", "Stack", "Biggest Problem", "Goal", "Preferred", "Status"];
    const rowsCsv = filtered.map((l) => [
      l.created_at, l.name, l.company, l.email, l.website ?? "", l.industry ?? "", l.employee_count ?? "", l.revenue ?? "", l.stack ?? "", (l.biggest_problem ?? "").replace(/\n/g, " "), (l.goal ?? "").replace(/\n/g, " "), l.preferred_contact ?? "", l.audit_status,
    ]);
    const csv = [headers, ...rowsCsv].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `audit-requests-${new Date().toISOString().slice(0,10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardShell title="AI Audit Requests">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, company, email…" className="w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-primary/60" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as "All" | AuditStatus)} className="bg-surface border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary/60">
          <option value="All">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={load} className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm hover:border-primary/60 transition-colors">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
        <button onClick={exportCsv} className="ml-auto inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm hover:border-primary/60 transition-colors">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      {forbidden && (
        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 text-sm">
          <div className="font-semibold mb-1">Admin access required</div>
          <p className="text-muted-foreground">Sign in with an account that has the <code className="text-cyan">admin</code> role to view submissions.</p>
        </div>
      )}

      {!forbidden && (
        <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-elevated/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Company</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Industry</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium hidden sm:table-cell">Received</th>
                  <th className="text-right p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={6} className="p-10 text-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin inline" /></td></tr>}
                {!loading && filtered.map((l) => (
                  <tr key={l.id} className="border-t border-border hover:bg-surface-elevated/40 transition-colors align-top">
                    <td className="p-4">
                      <div className="font-semibold">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.email}</div>
                      {l.goal && <div className="text-xs text-muted-foreground mt-1 max-w-md truncate">Goal: {l.goal}</div>}
                      {l.biggest_problem && <div className="text-xs text-muted-foreground mt-1 max-w-md truncate">Problem: {l.biggest_problem}</div>}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {l.company}
                      {l.website && <div className="text-xs text-cyan truncate max-w-[180px]">{l.website}</div>}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground">
                      {l.industry ?? "—"}
                      {l.employee_count && <div className="text-xs">{l.employee_count}</div>}
                    </td>
                    <td className="p-4">
                      <select
                        value={l.audit_status}
                        onChange={(e) => updateStatus(l.id, e.target.value as AuditStatus)}
                        className={`bg-surface-elevated border rounded-full px-3 py-1 text-xs outline-none ${statusColor[l.audit_status]}`}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="p-4 text-right text-muted-foreground hidden sm:table-cell text-xs">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="p-4 text-right"><button onClick={() => remove(l.id)} className="text-xs text-destructive hover:underline">Delete</button></td>
                  </tr>
                ))}
                {!loading && filtered.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No audit requests yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
