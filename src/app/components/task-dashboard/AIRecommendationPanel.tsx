import { useEffect, useMemo, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { Check, LoaderCircle, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { AppAvatar } from "./AppAvatar";
import { aiProfiles, employees as fallbackEmployees, type Employee, type EmployeeId } from "./data";
import { getAIRecommendations, getEmployees, isMockMode, type Recommendation } from "../../lib/api";

function MatchRing({ score }: { score: number }) {
  const value = useMotionValue(0);
  const [display, setDisplay] = useState<number | null>(null);

  useMotionValueEvent(value, "change", (latest) => setDisplay(Math.round(latest)));

  useEffect(() => {
    setDisplay(null);
    value.set(0);
    const controls = animate(value, score, { duration: 0.8, ease: "easeOut" });
    return controls.stop;
  }, [score, value]);

  const ring = score >= 90 ? "var(--success)" : score >= 70 ? "var(--warning)" : "var(--danger)";
  const R = 14, C = 2 * Math.PI * R;
  const shown = display ?? 0;
  const offset = C * (1 - shown / 100);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative h-9 w-9 shrink-0">
            <svg width={36} height={36} viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
              <circle cx={18} cy={18} r={R} fill="none" stroke="var(--border-secondary)" strokeWidth={3} />
              <circle cx={18} cy={18} r={R} fill="none" stroke={ring} strokeWidth={3} strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[9px] font-semibold tdts-tabular">
              {display === null ? "—" : `${display}%`}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          This recommendation is calculated using employee skills, workload, availability, previous performance, and experience with similar tasks.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function mockRecommendations(): Recommendation[] {
  return Object.entries(aiProfiles)
    .map(([employeeId, profile]) => ({ employeeId, score: profile.score, reasons: [...profile.reasons], alternatives: [] }))
    .sort((a, b) => b.score - a.score);
}

export function AIRecommendationPanel({
  taskId = "t6",
  recommended,
  onAssign,
  condensed = false,
}: {
  taskId?: string;
  recommended?: EmployeeId;
  onAssign: (id: EmployeeId) => void;
  condensed?: boolean;
}) {
  const mock = isMockMode();
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(() => mock ? mockRecommendations() : null);
  const [source, setSource] = useState<"openai" | "fallback" | "mock">(() => mock ? "mock" : "fallback");
  const [people, setPeople] = useState<Employee[]>(() => mock ? fallbackEmployees : []);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (mock) return;
    let active = true;
    setRecommendations(null);
    setFailed(false);
    const minimumDelay = new Promise((resolve) => setTimeout(resolve, 800));
    Promise.all([getAIRecommendations(taskId), getEmployees(), minimumDelay])
      .then(([response, employees]) => {
        if (!active) return;
        setRecommendations(response.recommendations);
        setSource(response.source);
        setPeople(employees);
      })
      .catch(() => {
        if (!active) return;
        setFailed(true);
        setSource("fallback");
        setRecommendations(mockRecommendations());
        setPeople(fallbackEmployees);
      });
    return () => { active = false; };
  }, [mock, taskId]);

  const ordered = useMemo(() => {
    if (!recommendations) return null;
    if (!recommended || source === "openai") return recommendations;
    const selected = recommendations.find((item) => item.employeeId === recommended);
    return selected ? [selected, ...recommendations.filter((item) => item.employeeId !== recommended)] : recommendations;
  }, [recommendations, recommended, source]);

  if (!ordered) {
    return (
      <div className={`flex items-center gap-3 rounded-xl border border-brand-primary/20 bg-brand-tertiary/55 ${condensed ? "min-h-12 px-3 py-2" : "p-4"}`}>
        <LoaderCircle className="h-4 w-4 animate-spin text-brand-primary" />
        <div><div className="text-sm font-semibold text-brand-primary">AI is analyzing…</div>{!condensed && <div className="text-xs text-muted-foreground">Comparing workload, delivery history and task fit.</div>}</div>
      </div>
    );
  }

  const profile = ordered[0];
  const person = people.find((item) => item.id === profile.employeeId) ?? fallbackEmployees.find((item) => item.id === profile.employeeId) ?? fallbackEmployees[0];
  const alternatives = ordered.slice(1, 4);

  if (condensed) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }} className="flex min-h-12 items-center gap-2 rounded-xl border border-brand-primary/20 bg-brand-tertiary/60 px-3 py-2 shadow-sm">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-primary" aria-label="AI Recommended" />
        <AppAvatar initials={person.initials} size="sm" />
        <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{person.name}</div><div className="truncate text-[10px] text-muted-foreground">AI recommended · {profile.reasons[0]}</div></div>
        <MatchRing score={profile.score} />
        <Button type="button" size="sm" className="bg-brand-primary text-white active:scale-[.98]" onClick={() => onAssign(profile.employeeId as EmployeeId)}>Assign</Button>
      </motion.div>
    );
  }

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(0,0,0,.08)" }} className="rounded-xl border border-brand-primary/20 bg-brand-tertiary/55 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-primary"><Sparkles className="h-4 w-4" />AI Recommended{failed ? " · fallback" : ""}</div>
      <div className="flex items-center gap-3"><AppAvatar initials={person.initials} /><div className="min-w-0 flex-1"><div className="text-sm font-semibold">{person.name}</div><div className="text-xs text-muted-foreground">{person.title}</div></div><MatchRing score={profile.score} /></div>
      <div className="mt-4 text-xs font-semibold">Reasons:</div>
      <div className="mt-2 grid gap-1.5">{profile.reasons.map((reason) => <div key={reason} className="flex items-center gap-2 text-xs"><Check className="h-3.5 w-3.5 text-success" />{reason}</div>)}</div>
      <Button type="button" className="mt-4 bg-brand-primary text-white active:scale-[.98]" onClick={() => onAssign(profile.employeeId as EmployeeId)}>Assign Recommended</Button>
      <div className="mt-4 border-t border-brand-primary/10 pt-3"><div className="mb-2 text-xs font-semibold">Other Suitable Employees</div><div className="flex flex-wrap gap-2">
        {alternatives.map((item) => { const alt = people.find((employee) => employee.id === item.employeeId) ?? fallbackEmployees.find((employee) => employee.id === item.employeeId); if (!alt) return null; return <button type="button" key={item.employeeId} onClick={() => onAssign(item.employeeId as EmployeeId)} className="rounded-full border border-border-primary bg-surface-bg px-2.5 py-1.5 text-[11px] transition hover:border-brand-primary hover:text-brand-primary">{alt.name.split(" ")[0]} {item.score}%</button>; })}
      </div></div>
    </motion.section>
  );
}
