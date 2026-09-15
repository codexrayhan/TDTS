import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BellRing, Gift } from "lucide-react";
import { Button } from "../../ui/button";
import type { ScreenId } from "../AppShell";

type SettingsForm = {
  operational: boolean;
  rewardMaster: boolean;
  taskCompleted: boolean;
  topThree: boolean;
  badgeEarned: boolean;
  monthlyWinner: boolean;
  milestoneStreaks: boolean;
};

const rewardOptions: { key: keyof SettingsForm; label: string }[] = [
  { key: "taskCompleted", label: "Task completed" },
  { key: "topThree", label: "Top-three leaderboard changes" },
  { key: "badgeEarned", label: "New badge earned" },
  { key: "monthlyWinner", label: "Monthly winner" },
  { key: "milestoneStreaks", label: "Milestone streaks" },
];

export function SettingsScreen({ onNavigate: _onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const { register, handleSubmit, watch, setValue } = useForm<SettingsForm>({ defaultValues: { operational: true, rewardMaster: true, taskCompleted: true, topThree: true, badgeEarned: true, monthlyWinner: true, milestoneStreaks: true } });
  const master = watch("rewardMaster");
  useEffect(() => { if (!master) rewardOptions.forEach(({ key }) => setValue(key, false)); }, [master, setValue]);
  const save = handleSubmit(() => toast.success("Settings saved", { id: "save-settings" }));
  return <form onSubmit={save} className="max-w-4xl"><h1 className="tdts-page-title">Workspace Settings</h1><p className="mt-1 text-sm text-muted-foreground">Control operational notifications and team reward announcements.</p><div className="mt-5 grid gap-4"><section className="tdts-card p-5"><div className="flex items-start gap-3"><BellRing className="mt-1 h-5 w-5 text-brand-primary"/><div className="flex-1"><div className="font-semibold">Operational notifications</div><p className="mt-1 text-sm text-muted-foreground">Deadline, assignment and completion alerts remain active for workspace owners.</p></div><input type="checkbox" {...register("operational")} className="h-5 w-5 accent-[var(--brand-primary)]"/></div></section><section className="tdts-card p-5"><div className="flex items-center gap-3 border-b border-border-secondary pb-4"><Gift className="h-5 w-5 text-brand-primary"/><div className="flex-1"><div className="font-semibold">Reward announcements</div><p className="text-xs text-muted-foreground">Master control for public recognition notifications.</p></div><input type="checkbox" {...register("rewardMaster")} className="h-5 w-5 accent-[var(--brand-primary)]"/></div><div className="mt-4 grid gap-3">{rewardOptions.map((item) => <label key={item.key} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${!master ? "opacity-40" : ""}`}><input type="checkbox" disabled={!master} {...register(item.key)} className="h-4 w-4 accent-[var(--brand-primary)]"/><span className="text-sm">{item.label}</span></label>)}</div></section><div className="flex justify-end"><Button type="submit" className="bg-brand-primary text-white">Save Changes</Button></div></div></form>;
}
