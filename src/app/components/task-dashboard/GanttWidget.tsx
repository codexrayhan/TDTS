import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getTasks } from "../../lib/api";
import type { Priority } from "./data";
import { Skeleton } from "../ui/skeleton";

type GanttDatum = { name: string; start: number; duration: number; completion: number; priority: Priority; spacer: number; timeline: number };
type TooltipPayloadItem = { payload: GanttDatum };
const priorityColor = { high: "var(--danger)", medium: "var(--warning)", low: "var(--muted-foreground)" } as const;

function GanttTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  const task = payload?.[0]?.payload;
  if (!active || !task) return null;
  return <div className="rounded-lg border border-border-primary bg-surface-bg px-3 py-2 shadow-lg"><div className="text-xs font-semibold">{task.name}</div><div className="mt-1 text-[11px] text-muted-foreground">Duration: {task.duration} days</div><div className="text-[11px] text-muted-foreground">Completion: {task.completion}%</div></div>;
}

export function GanttWidget() {
  const [data, setData] = useState<GanttDatum[] | null>(null);
  useEffect(() => {
    let active = true;
    getTasks().then((tasks) => {
      if (!active) return;
      const next = tasks.filter((task) => task.status !== "Done").slice(0, 4).map((task, index) => {
        const duration = task.priority === "high" ? 8 : task.priority === "medium" ? 6 : 4;
        const completion = task.status === "In Progress" ? 58 + index * 4 : task.status === "To-Do" ? 20 + index * 5 : 10;
        const start = Math.min(index * 2, 6);
        return { name: task.title.length > 22 ? `${task.title.slice(0, 21)}…` : task.title, start, duration, completion, priority: task.priority, spacer: start, timeline: duration };
      });
      setData(next);
    }).catch(() => setData([]));
    return () => { active = false; };
  }, []);

  return <section className="tdts-card h-[380px] p-4"><div className="mb-4"><h2 className="tdts-heading">Active Timeline</h2><p className="text-xs text-muted-foreground">Gantt view · next 14 days</p></div><div className="h-[300px]">
    {!data ? <div className="grid gap-4 pt-8"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-5/6" /><Skeleton className="h-8 w-4/5" /></div> : <ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ left: 16, right: 12 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-secondary)" /><XAxis type="number" domain={[0, 14]} ticks={[0, 2, 4, 6, 8, 10, 12, 14]} tick={{ fontSize: 11 }} /><YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 10 }} /><Tooltip cursor={{ fill: "var(--bg-faint)" }} content={<GanttTooltip />} /><Bar dataKey="spacer" stackId="timeline" fill="transparent" isAnimationActive={false} /><Bar dataKey="timeline" stackId="timeline" radius={[4, 4, 4, 4]}>{data.map((task) => <Cell key={task.name} fill={priorityColor[task.priority as Priority]} />)}</Bar></BarChart></ResponsiveContainer>}
  </div></section>;
}
