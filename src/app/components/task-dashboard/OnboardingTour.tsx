import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
const steps = [
  ["Bird's-eye dashboard", "See project health, work-in-progress and deadlines from one screen."],
  ["Create and delegate", "Turn work into clear tasks and let AI recommend the best assignee."],
  ["Kanban flow", "Move tasks through Backlog, To-Do, In Progress and Done."],
  ["Performance rewards", "Recognize on-time delivery with points, badges and leaderboards."],
  ["You're ready", "Use the sidebar to explore every part of your workspace."],
] as const;
export function OnboardingTour({ open, onFinish }: { open: boolean; onFinish: () => void }) {
  const [step, setStep] = useState(0); if (!open) return null; const current = steps[step];
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-black/45 p-4 backdrop-blur-[2px]"><div className="w-full max-w-md rounded-2xl border border-white/10 bg-surface-bg p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tertiary text-brand-primary"><Sparkles /></span><span className="text-xs text-muted-foreground">{step + 1} / {steps.length}</span></div><h2 className="tdts-heading">{current[0]}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{current[1]}</p><div className="mt-5 flex gap-1.5">{steps.map((_, i) => <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand-primary" : "bg-bg-subtle"}`} />)}</div><div className="mt-6 flex justify-between"><Button variant="ghost" onClick={onFinish}>Skip</Button><Button className="bg-brand-primary text-white" onClick={() => step === steps.length - 1 ? onFinish() : setStep((v) => v + 1)}>{step === steps.length - 1 ? <><Check />Finish</> : <>Next<ArrowRight /></>}</Button></div></div></div>;
}
