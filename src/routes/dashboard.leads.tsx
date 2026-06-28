import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Search, Download, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Lead = Database["public"]["Tables"]["contact_leads"]["Row"];
type LeadStatus = Database["public"]["Enums"]["lead_status"];

export const Route = createFileRoute("/dashboard/leads")({
  head: () => ({
    meta: [
      { title: "Leads — Ceptrex Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LeadsPage,
});

const STATUSES: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "CLIENT", "LOST"];

const statusColor: Record<LeadStatus, string> = {
  NEW: "text-cyan border-cyan/40",
  CONTACTED: "text-primary border-primary/40",
  QUALIFIED: "text-gold border-gold/40",
  PROPOSAL: "text-gold border-gold/40",
  CLIENT: "text-success border-success/40",
  LOST: "text-muted-foreground border-border",
};

function LeadsPage() {
  const [rows, setRows] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | LeadStatus>("All");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setLoading(false);
    if (error) {
      setForbidden(true);
      return;
    }
    setForbidden(false);
    setRows(data ?? []);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(
    () => rows.filter((l) =>
      (status === "All" || l.status === status) &&
      (q === "" || `${l.name} ${l.company ?? ""} ${l.email}`.toLowerCase().includes(q.toLowerCase()))
    ),
    [rows, q, status]
  );

  async function updateStatus(id: string, next: LeadStatus) {
    const prev = rows;
    setRows((r) => r.map((l) => (l.id === id ? { ...l, status: next } : l)));
    const { error } = await supabase.from("contact_leads").update({ status: next }).eq("id", id);
    if (error) {
      setRows(prev);
      toast.error("Couldn't update status");
    } else {
      toast.success("Status updated");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("contact_leads").delete().eq("id", id);
    if (error) {
      toast.error("Delete failed");
      return;
    }
    setRows((r) => r.filter((l) => l.id !== id));
    toast.success("Lead deleted");
  }

  const exportCsv = () => {
    const headers = ["Created", "Name", "Email", "Company", "Service", "Budget", "Status", "Source", "UTM Source", "Message"];
    const rowsCsv = filtered.map((l) => [
      l.created_at, l.name, l.email, l.company ?? "", l.service ?? "", l.budget ?? "", l.status, l.source, l.utm_source ?? "", (l.message ?? "").replace(/\n/g, " "),
    ]);
    const csv = [headers, ...rowsCsv].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${new Date().toISOString().slice(0,10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardShell title="Contact Leads">
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
          value={status}
          onChange={(e) => setStatus(e.target.value as "All" | LeadStatus)}
          className="bg-surface border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary/60"
        >
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
          <p className="text-muted-foreground">
            Sign in with an account that has the <code className="text-cyan">admin</code> role to view submissions.
          </p>
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
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Budget</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium hidden sm:table-cell">Received</th>
                  <th className="text-right p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={6} className="p-10 text-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin inline" /></td></tr>
                )}
                {!loading && filtered.map((l) => (
                  <tr key={l.id} className="border-t border-border hover:bg-surface-elevated/40 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.email}</div>
                      {l.message && <div className="text-xs text-muted-foreground mt-1 max-w-md truncate">{l.message}</div>}
                    </td>
                    <td className="p-4 hidden md:table-cell">{l.company ?? "—"}</td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground">{l.budget ?? "—"}</td>
                    <td className="p-4">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l.id, e.target.value as LeadStatus)}
                        className={`bg-surface-elevated border rounded-full px-3 py-1 text-xs outline-none ${statusColor[l.status]}`}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="p-4 text-right text-muted-foreground hidden sm:table-cell text-xs">
                      {new Date(l.created_at).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => remove(l.id)} className="text-xs text-destructive hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No leads yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
