import { useEffect, useState } from "react";
import { Award, CheckCircle2, Clock3, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getPerformanceTrend } from "../../../lib/api";
import { Skeleton } from "../../ui/skeleton";
import type { ScreenId } from "../AppShell";

type Trend = { week: string; completed: number; points: number };
export function MyPerformanceScreen({ onNavigate: _onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const [trend, setTrend] = useState<Trend[] | null>(null);
  useEffect(() => { getPerformanceTrend().then(setTrend).catch(() => setTrend([])); }, []);
  const cards = [[CheckCircle2, "Tasks completed", "71"], [Clock3, "On-time rate", "94%"], [Award, "Current points", "2,740"], [TrendingUp, "Team percentile", "Top 12%"]] as const;
  return <div><h1 className="tdts-page-title">My Performance</h1><p className="mt-1 text-sm text-muted-foreground">Personal delivery metrics, visible without exposing private teammate detail.</p><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([Icon, label, value]) => <div key={label} className="tdts-card p-4"><Icon className="h-5 w-5 text-brand-primary" /><div className="tdts-tabular mt-4 text-2xl font-semibold">{value}</div><div className="text-xs text-muted-foreground">{label}</div></div>)}</div><section className="tdts-card mt-5 h-[400px] p-5"><div><h2 className="tdts-heading">Six-week trend</h2><p className="text-xs text-muted-foreground">Completed tasks and earned points</p></div><div className="mt-5 h-[305px]">{!trend ? <Skeleton className="h-full w-full" /> : <ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><CartesianGrid stroke="var(--border-secondary)" strokeDasharray="3 3" /><XAxis dataKey="week" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip contentStyle={{ background: "var(--surface-bg)", border: "1px solid var(--border-primary)", borderRadius: 10 }} /><Line dataKey="completed" type="monotone" stroke="var(--brand-primary)" strokeWidth={3} dot={{ r: 3 }} /><Line dataKey="points" type="monotone" stroke="var(--success)" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>}</div></section></div>;
}
