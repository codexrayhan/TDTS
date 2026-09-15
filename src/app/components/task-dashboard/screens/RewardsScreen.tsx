import { useEffect, useState } from "react";
import { Award, Gift, Medal, Star, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { EmptyState } from "../EmptyState";
import { getRewards, redeemReward, type RewardRecord } from "../../../lib/api";
import type { ScreenId } from "../AppShell";

const earnedBadges: ReadonlyArray<readonly [typeof Zap, string, string]> = [[Zap, "Fast Finisher", "Complete 5 tasks before deadline"], [Medal, "Quality Streak", "Four accepted deliveries in a row"], [Star, "Reliable Owner", "Maintain 90%+ on-time rate"], [Award, "Team Contributor", "Help close 20 delegated sub-tasks"]];
export function RewardsScreen({ onNavigate: _onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const [rewards, setRewards] = useState<RewardRecord[] | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  useEffect(() => { getRewards().then(setRewards).catch(() => setRewards([])); }, []);
  const badges = rewards === null ? null : earnedBadges.filter(([, name]) => rewards.some((reward) => reward.badgeName === name) || name === "Team Contributor");
  const totalPoints = rewards?.reduce((sum, reward) => sum + reward.points, 0) ?? 2740;
  const redeem = async () => { setRedeeming(true); try { await redeemReward(); toast.success("Reward redeemed", { id: "reward-redeemed" }); } catch (error) { toast.error("Reward not redeemed", { id: "reward-redeem-error", description: error instanceof Error ? error.message : "Please try again" }); } finally { setRedeeming(false); } };
  return <div><div><h1 className="tdts-page-title">Rewards</h1><p className="mt-1 text-sm text-muted-foreground">{totalPoints.toLocaleString()} points available · rewards recognize delivery, not screen time.</p></div><h2 className="mt-6 text-sm font-semibold">Earned badges</h2>{badges === null ? <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-36 w-full" />)}</div> : badges.length === 0 ? <div className="mt-3"><EmptyState icon={Award} title="No badges earned yet" description="Complete your first task to unlock the Starter badge." actionLabel="View my tasks" /></div> : <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{badges.map(([Icon, name, text]) => <div key={name} className="tdts-card p-4"><span className="grid h-11 w-11 place-items-center rounded-full bg-amber-500/10 text-amber-600"><Icon /></span><div className="mt-4 font-semibold">{name}</div><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></div>)}</div>}<div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]"><section className="tdts-card overflow-hidden"><div className="border-b border-border-primary p-4 font-semibold">Points history</div>{!rewards ? <div className="p-4"><Skeleton className="h-24 w-full" /></div> : rewards.map((reward) => <div key={reward.id} className="grid grid-cols-[1fr_70px_80px] border-b border-border-secondary px-4 py-3 text-sm last:border-0"><span>{reward.badgeName}</span><span className="font-semibold text-success">+{reward.points}</span><span className="text-xs text-muted-foreground">{new Date(reward.earnedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}</span></div>)}</section><aside className="tdts-card p-5"><Gift className="h-7 w-7 text-brand-primary" /><h2 className="mt-4 font-semibold">Available reward</h2><p className="mt-1 text-sm text-muted-foreground">Team Learning Credit · 2,500 points</p><Button disabled={redeeming} className="mt-5 w-full bg-brand-primary text-white" onClick={redeem}>{redeeming ? "Redeeming…" : "Redeem reward"}</Button></aside></div></div>;
}
