import { useState } from "react";
import { Clock3, Flame, Star } from "lucide-react";
import { KanbanBoard } from "../KanbanBoard";
import { TaskDetailsModal } from "../TaskDetailsModal";
import type { Task } from "../data";
import type { ScreenId } from "../AppShell";
export function EmployeeScreen({ onNavigate }: { onNavigate?: (id: ScreenId) => void }) { const [task,setTask]=useState<Task|null>(null); const cards=[[Clock3,"Due this week","4"],[Flame,"Current streak","8 days"],[Star,"Reward points","2,740"]] as const; return <div><div><h1 className="tdts-page-title">My Tasks</h1><p className="mt-1 text-sm text-muted-foreground">Only work assigned to Sumaiya Akter appears here.</p></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{cards.map(([Icon,label,value])=><div key={label} className="tdts-card flex items-center gap-4 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tertiary text-brand-primary"><Icon className="h-5 w-5"/></span><div><div className="tdts-tabular text-xl font-semibold">{value}</div><div className="text-xs text-muted-foreground">{label}</div></div></div>)}</div><div className="mt-5"><KanbanBoard ownOnly onOpenTask={setTask}/></div><TaskDetailsModal task={task} open={Boolean(task)} onOpenChange={(open)=>!open&&setTask(null)} onDelegate={()=>onNavigate?.("delegate-task")}/></div>; }
