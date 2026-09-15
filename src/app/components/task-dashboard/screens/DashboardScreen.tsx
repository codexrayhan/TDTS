import { useState } from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { MetricsRow } from "../MetricsRow";
import { KanbanBoard } from "../KanbanBoard";
import { GanttWidget } from "../GanttWidget";
import { LeaderboardPanel } from "../LeaderboardPanel";
import { TaskDetailsModal } from "../TaskDetailsModal";
import type { Task } from "../data";
import type { ScreenId } from "../AppShell";
export function DashboardScreen({ onNavigate }: { onNavigate?: (id: ScreenId) => void }) { const [task,setTask]=useState<Task|null>(null); return <div className="grid gap-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="tdts-page-title">Project Alpha</h1><p className="mt-1 text-sm text-muted-foreground">Everything important, without hunting through tabs.</p></div><Button className="bg-brand-primary text-white" onClick={()=>onNavigate?.("create-task")}><Plus/>Create Task</Button></div><MetricsRow/><div className="grid gap-5 xl:grid-cols-[3fr_2fr]"><KanbanBoard onOpenTask={setTask} onCreateTask={()=>onNavigate?.("create-task")}/><GanttWidget/></div><LeaderboardPanel/><TaskDetailsModal task={task} open={Boolean(task)} onOpenChange={(open)=>!open&&setTask(null)} onDelegate={()=>onNavigate?.("delegate-task")}/></div>; }
