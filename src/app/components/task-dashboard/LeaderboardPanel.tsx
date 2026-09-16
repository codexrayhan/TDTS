import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { getLeaderboard, type LeaderboardEntry } from "../../lib/api";
import { AppAvatar } from "./AppAvatar";
import { Skeleton } from "../ui/skeleton";

export function LeaderboardPanel({ compact = true }: { compact?: boolean }) {
  const [rows, setRows] = useState<LeaderboardEntry[] | null>(null);
  useEffect(() => { let active = true; getLeaderboard().then((data) => active && setRows(data)).catch(() => active && setRows([])); return () => { active = false; }; }, []);
  return <section className="tdts-card p-4"><div className="mb-3 flex items-center justify-between"><div><h2 className="tdts-heading">Team Leaderboard</h2><p className="text-xs text-muted-foreground">Points from delivery quality and timeliness</p></div><Trophy className="h-5 w-5 text-warning" /></div><div className="grid gap-1">
    {!rows ? Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-12 w-full" />) : rows.length === 0 ? <p className="py-6 text-center text-xs text-muted-foreground">No leaderboard data yet. Employees will show up here once tasks and rewards are logged.</p> : rows.slice(0, compact ? 5 : rows.length).map((entry, index) => <div key={entry.id} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-bg-faint"><div className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${index < 3 ? "bg-brand-tertiary text-brand-primary" : "bg-bg-faint"}`}>{index + 1}</div><AppAvatar initials={entry.employee.initials} size="sm" /><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{entry.employee.name}</div><div className="text-[10px] text-muted-foreground">{entry.completion}% on-time</div></div><div className="tdts-tabular text-sm font-semibold">{entry.points.toLocaleString()} pts</div></div>)}
  </div></section>;
}
