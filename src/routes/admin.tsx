import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, Clock3, Eye, MapPin, MessageCircle, RefreshCw, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTripRequests, updateTripStatus, type StoredTripRequest } from "@/lib/booking";
import { getAdminSession, logoutAdmin } from "@/lib/admin-auth";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "PravasX — Operations Dashboard" }] }),
  component: Admin,
});

const statuses: StoredTripRequest["status"][] = ["New", "Contacted", "Confirmed", "Completed", "Cancelled"];

function seedDemo() {
  const existing = getTripRequests();
  if (existing.length) return;
  const demo: StoredTripRequest[] = [
    { reference: "PX-DEMO01", createdAt: new Date().toISOString(), status: "New", matchScore: 94, guide: "Aarav Mehta", name: "Demo Traveller", phone: "+91 90000 00000", destination: "Mumbai", pickup: "Bandra", date: "2026-08-22", time: "10:00", duration: "8 hours", travellers: "2", budget: "₹2,500–₹5,000", travelStyle: "Local & slow", interests: ["Culture", "Food"], pace: "Balanced", guideLanguage: "Hindi", notes: "First-time Mumbai visit" },
    { reference: "PX-DEMO02", createdAt: new Date(Date.now() - 86400000).toISOString(), status: "Confirmed", matchScore: 91, guide: "Riya Kulkarni", name: "Demo Family", phone: "+91 91111 11111", destination: "Pune", pickup: "Pune Station", date: "2026-08-25", time: "09:30", duration: "4 hours", travellers: "3–4", budget: "₹2,500–₹5,000", travelStyle: "Food-first", interests: ["Food", "Culture"], pace: "Slow & flexible", guideLanguage: "English", notes: "Vegetarian food" },
  ];
  localStorage.setItem("pravasx-trip-requests", JSON.stringify(demo));
}

function AdminLoginGate({ onSuccess }: { onSuccess: () => void }) {
  return <AdminLoginForm onSuccess={onSuccess} />;
}

function Admin() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [requests, setRequests] = useState<StoredTripRequest[]>([]);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<StoredTripRequest | null>(null);
  const navigate = useNavigate();

  const refresh = () => setRequests(getTripRequests());
  const counts = useMemo(() => ({ total: requests.length, new: requests.filter(r => r.status === "New").length, confirmed: requests.filter(r => r.status === "Confirmed").length, completed: requests.filter(r => r.status === "Completed").length }), [requests]);
  const checkSession = async () => {
    try {
      const session = await getAdminSession();
      setAuthenticated(session.authenticated);
      if (session.authenticated) {
        seedDemo();
        refresh();
      }
    } catch (error) {
      console.error(error);
      setAuthenticated(false);
    }
  };
  useEffect(() => { void checkSession(); }, []);

  if (authenticated === null) {
    return (
      <main className="min-h-screen bg-sand px-4 py-16">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="rounded-2xl border bg-card px-6 py-8 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <p className="mt-4 text-sm font-semibold text-muted-foreground">Checking admin session…</p>
          </div>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-sand px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center justify-center">
          <div className="w-full">
            <Link to="/" className="mb-5 inline-block text-sm font-bold text-accent">← Back to PravasX</Link>
            <p className="mb-4 rounded-xl border bg-card px-4 py-3 text-xs font-semibold text-muted-foreground">
              Admin access is protected. Sign in below to continue.
            </p>
            <div>
              {/* Loaded lazily so the dashboard data never initializes before authentication. */}
              <AdminLoginGate onSuccess={() => { void checkSession(); }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  const visible = requests.filter((r) => filter === "All" || r.status === filter);

  function changeStatus(reference: string, status: StoredTripRequest["status"]) {
    updateTripStatus(reference, status);
    refresh();
    if (selected?.reference === reference) setSelected((current) => current ? { ...current, status } : current);
  }

  return (
    <main className="min-h-screen bg-sand pb-16 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><Link to="/" className="text-sm font-bold text-accent">← Back to PravasX</Link><h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Operations dashboard</h1><p className="mt-2 text-sm text-muted-foreground">Trip requests, guide matching and booking status — all in one place.</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={refresh}><RefreshCw className="h-4 w-4" /> Refresh</Button><Button variant="outline" onClick={async () => { await logoutAdmin(); await navigate({ to: "/admin/login" }); }}><ShieldCheck className="h-4 w-4" /> Sign out</Button></div></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{icon:BarChart3,label:"Total requests",value:counts.total},{icon:Clock3,label:"New",value:counts.new},{icon:CheckCircle2,label:"Confirmed",value:counts.confirmed},{icon:Users,label:"Completed",value:counts.completed}].map(({icon:Icon,label,value})=><div key={label} className="rounded-3xl border bg-card p-5"><Icon className="h-5 w-5 text-accent" /><p className="mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl font-extrabold">{value}</p></div>)}</div>
        <div className="mt-8 flex flex-wrap gap-2">{["All", ...statuses].map(s=><button key={s} onClick={()=>setFilter(s)} className={`rounded-full border px-4 py-2 text-xs font-bold ${filter === s ? "bg-navy text-white" : "bg-card"}`}>{s}</button>)}</div>
        <div className="mt-5 overflow-hidden rounded-[2rem] border bg-card shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-4">Request</th><th className="px-5 py-4">Trip</th><th className="px-5 py-4">Match</th><th className="px-5 py-4">Guide</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Action</th></tr></thead><tbody className="divide-y">{visible.map((r)=><tr key={r.reference} className="hover:bg-secondary/50"><td className="px-5 py-5"><p className="font-bold">{r.name}</p><p className="mt-1 text-xs text-muted-foreground">{r.reference} · {r.phone}</p></td><td className="px-5 py-5"><p className="font-semibold">{r.destination}</p><p className="mt-1 text-xs text-muted-foreground">{r.date} · {r.duration}</p></td><td className="px-5 py-5"><span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">{r.matchScore}%</span></td><td className="px-5 py-5 font-semibold">{r.guide}</td><td className="px-5 py-5"><select value={r.status} onChange={(e)=>changeStatus(r.reference, e.target.value as StoredTripRequest["status"])} className="rounded-lg border bg-background px-2 py-2 text-xs font-semibold">{statuses.map(s=><option key={s}>{s}</option>)}</select></td><td className="px-5 py-5"><button onClick={()=>setSelected(r)} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold"><Eye className="h-4 w-4" /> View</button></td></tr>)}{visible.length === 0 && <tr><td colSpan={6} className="px-5 py-14 text-center text-muted-foreground">No requests in this status.</td></tr>}</tbody></table></div></div>
        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-accent" /> Admin access is protected by a server-issued HTTP-only session cookie. Trip demo data remains in browser storage for evaluation.</div>
      </div>
      {selected && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm" onClick={()=>setSelected(null)}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-card p-6 shadow-elevated sm:p-8" onClick={(e)=>e.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-accent">{selected.reference}</p><h2 className="mt-2 font-display text-2xl font-extrabold">{selected.name}</h2></div><button onClick={()=>setSelected(null)} className="rounded-full border px-3 py-1 text-sm">Close</button></div><div className="mt-7 grid gap-3 sm:grid-cols-2">{[["Destination",selected.destination],["Pickup",selected.pickup],["Date / time",`${selected.date} · ${selected.time}`],["Travellers",selected.travellers],["Budget",selected.budget],["Travel style",selected.travelStyle],["Guide language",selected.guideLanguage],["Pace",selected.pace]].map(([a,b])=><div key={a} className="rounded-2xl bg-secondary p-4"><p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{a}</p><p className="mt-1 font-semibold">{b}</p></div>)}</div><div className="mt-4 rounded-2xl border p-4"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Interests</p><p className="mt-2 font-semibold">{selected.interests.join(" · ")}</p><p className="mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Notes</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selected.notes || "No extra notes."}</p></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Button variant="brand" asChild><a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> Contact customer</a></Button><Button variant="outline" onClick={()=>changeStatus(selected.reference,"Confirmed")}>Mark confirmed</Button></div></div></div>}
    </main>
  );
}
