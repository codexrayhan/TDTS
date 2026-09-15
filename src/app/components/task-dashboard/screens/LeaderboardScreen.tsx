import { useEffect, useState } from "react";
import { Medal } from "lucide-react";
import { getLeaderboard, type LeaderboardEntry } from "../../../lib/api";
import { AppAvatar } from "../AppAvatar";
import { Skeleton } from "../../ui/skeleton";
import type { ScreenId } from "../AppShell";

export function LeaderboardScreen({ onNavigate: _onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const [range, setRange] = useState("month");
  const [rows, setRows] = useState<LeaderboardEntry[] | null>(null);
  useEffect(() => { getLeaderboard().then(setRows).catch(() => setRows([])); }, []);
  return <div><div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="tdts-page-title">Leaderboard</h1><p className="mt-1 text-sm text-muted-foreground">Recognize reliable delivery without turning the workspace into a game board.</p></div><div className="flex rounded-lg border border-border-primary bg-surface-bg p-1">{["week", "month", "all-time"].map((item) => <button key={item} onClick={() => setRange(item)} className={`rounded-md px-3 py-1.5 text-xs capitalize ${range === item ? "bg-brand-primary text-white" : ""}`}>{item}</button>)}</div></div><div className="mt-5 grid gap-4 lg:grid-cols-[1fr_320px]"><section className="tdts-card overflow-hidden"><div className="border-b border-border-primary p-4 text-sm font-semibold">Top performers · {range}</div>{!rows ? Array.from({ length: 5 }, (_, index) => <div key={index} className="p-4"><Skeleton className="h-12 w-full" /></div>) : rows.map((entry, index) => <div key={entry.id} className="flex items-center gap-4 border-b border-border-secondary px-4 py-4 last:border-0"><span className={`grid h-9 w-9 place-items-center rounded-full font-semibold ${index < 3 ? "bg-brand-tertiary text-brand-primary" : "bg-bg-faint"}`}>{index + 1}</span><AppAvatar initials={entry.employee.initials} /><div className="min-w-0 flex-1"><div className="font-medium">{entry.employee.name}</div><div className="text-xs text-muted-foreground">{entry.employee.title} · {entry.completion}% on-time</div></div><div className="tdts-tabular font-semibold">{entry.points.toLocaleString()} pts</div></div>)}</section><aside className="tdts-card p-5"><Medal className="h-8 w-8 text-warning" /><h2 className="mt-4 font-semibold">How points work</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Points combine on-time completion, quality, task complexity and penalty history. Scores never change permissions or role access.</p></aside></div></div>;
}
