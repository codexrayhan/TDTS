import { useEffect, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, FolderKanban, ListChecks } from "lucide-react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

function Kpi({ icon: Icon, label, value, detail }: { icon: typeof Activity; label: string; value: string; detail: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="tdts-card min-w-0 p-4">
      <div className="flex items-center justify-between">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-bg-faint"><Icon className="h-4 w-4 text-muted-foreground" /></span>
        <span className="text-[10px] text-muted-foreground">Live</span>
      </div>
      <div className="tdts-tabular mt-4 text-2xl font-semibold tracking-[-.02em]">{value}</div>
      <div className="mt-1 text-sm font-medium">{label}</div>
      <div className="mt-1 text-xs text-muted-foreground">{detail}</div>
    </motion.div>
  );
}

function HealthScore({ score = 89 }: { score?: number }) {
  const progress = useMotionValue(0);
  const dash = useTransform(progress, [0, 100], [2 * Math.PI * 28, 0]);
  const [shown, setShown] = useState(0);
  useMotionValueEvent(progress, "change", (value) => setShown(Math.round(value)));

  useEffect(() => {
    const controls = animate(progress, score, { duration: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [progress, score]);

  const ringColor = score >= 90 ? "var(--success)" : score >= 70 ? "var(--warning)" : "var(--danger)";
  const status = score >= 90 ? "Healthy" : score >= 70 ? "Moderate Risk" : "Critical";
  const breakdown = [
    ["Progress Completion", 95],
    ["Deadline Compliance", 90],
    ["Team Performance", 93],
    ["Workload Balance", 88],
    ["Penalty Impact", 82],
  ] as const;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ y: -2, boxShadow: "0 10px 26px rgba(0,0,0,.1)" }}
            className="tdts-card group col-span-1 p-4 ring-1 ring-brand-primary/10 xl:col-span-1"
          >
            <div className="flex gap-4">
              <div className="relative h-[72px] w-[72px] shrink-0">
                <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="36" cy="36" r="28" fill="none" stroke="var(--border-secondary)" strokeWidth="6" />
                  <motion.circle
                    cx="36"
                    cy="36"
                    r="28"
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="6"
                    strokeDasharray={2 * Math.PI * 28}
                    style={{ strokeDashoffset: dash }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-base font-semibold tdts-tabular">{shown}%</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-sm font-semibold"><Activity className="h-4 w-4 text-brand-primary" />Project Health Score</div>
                <div
                  className="mt-2 inline-flex rounded-full px-2 py-1 text-[11px] font-medium"
                  style={{ backgroundColor: `color-mix(in srgb, ${ringColor} 12%, transparent)`, color: ringColor }}
                >
                  <span className="mr-1">●</span>{status}
                </div>
                <p className="mt-2 text-xs leading-4 text-muted-foreground">Overall project condition based on real-time analytics.</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 overflow-hidden transition-all">
              <div className="text-[10px] font-semibold uppercase tracking-[.06em] text-muted-foreground">Health breakdown</div>
              {breakdown.map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-[10px]"><span>{label}</span><span>{value}%</span></div>
                  <div className="h-1.5 rounded-full bg-bg-subtle"><div className="h-1.5 rounded-full bg-brand-primary" style={{ width: `${value}%` }} /></div>
                </div>
              ))}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          Project Health Score represents the overall health of the project based on task completion, deadline compliance, workload balance, team performance, overdue tasks, and penalty history.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function MetricsRow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <Kpi icon={FolderKanban} label="Total Projects" value="12" detail="4 active workspaces" />
      <Kpi icon={ListChecks} label="Active Tasks" value="34" detail="8 due this week" />
      <Kpi icon={CheckCircle2} label="Completed" value="128" detail="+18 this month" />
      <Kpi icon={AlertTriangle} label="Overdue / Penalties" value="3" detail="2 require attention" />
      <HealthScore />
    </div>
  );
}
