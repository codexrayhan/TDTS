import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";
import { getEmployees, getTasks } from "../../../lib/api";
import { WorkloadDot } from "../WorkloadDot";
import { TaskDetailsModal } from "../TaskDetailsModal";
import { employees as fallbackEmployees, type Employee, type Task } from "../data";
import type { ScreenId } from "../AppShell";

export function TaskManagementScreen({ onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("deadline");
  const [selected, setSelected] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [people, setPeople] = useState<Employee[]>(fallbackEmployees);
  useEffect(() => { let active = true; Promise.all([getTasks(), getEmployees()]).then(([nextTasks, nextPeople]) => { if (!active) return; setTasks(nextTasks); setPeople(nextPeople); }).catch((error) => { toast.error("Could not load tasks", { id: "tasks-load-error", description: error.message }); setTasks([]); }); return () => { active = false; }; }, []);
  const rows = useMemo(() => (tasks ?? []).filter((task) => task.title.toLowerCase().includes(query.toLowerCase())).slice().sort((a, b) => sort === "priority" ? (["low", "medium", "high"].indexOf(b.priority) - ["low", "medium", "high"].indexOf(a.priority)) : sort === "assignee" ? a.assignee.localeCompare(b.assignee) : a.deadline.localeCompare(b.deadline)), [tasks, query, sort]);
  return <div><div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="tdts-page-title">Task Management</h1><p className="mt-1 text-sm text-muted-foreground">Filter, sort and open every task in the workspace.</p></div><Button className="bg-brand-primary text-white" onClick={() => onNavigate?.("create-task")}><Plus />Create Task</Button></div><div className="tdts-card mt-5 overflow-hidden"><div className="flex flex-wrap gap-3 border-b border-border-primary p-4"><label className="relative min-w-60 flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks" className="pl-9" /></label><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-9 rounded-md border border-border-primary bg-background px-3 text-sm"><option value="deadline">Sort: Deadline</option><option value="priority">Sort: Priority</option><option value="assignee">Sort: Assignee</option></select></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-bg-faint text-xs text-muted-foreground"><tr><th className="px-4 py-3">Task</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Priority</th><th className="px-4 py-3">Assignee</th><th className="px-4 py-3">Deadline</th></tr></thead><tbody>{tasks === null ? Array.from({ length: 6 }, (_, index) => <tr key={index}><td colSpan={5} className="px-4 py-2"><Skeleton className="h-9 w-full" /></td></tr>) : rows.map((task) => { const person = task.assigneeData ?? people.find((employee) => employee.id === task.assignee) ?? fallbackEmployees[0]; return <tr key={task.id} onClick={() => setSelected(task)} className="cursor-pointer border-t border-border-secondary hover:bg-bg-faint"><td className="px-4 py-3 font-medium">{task.title}<div className="text-[10px] text-muted-foreground">{task.project}</div></td><td className="px-4 py-3">{task.status}</td><td className="px-4 py-3 capitalize">{task.priority}</td><td className="px-4 py-3"><span className="flex items-center gap-2"><WorkloadDot workload={person.workload} />{person.name}</span></td><td className="px-4 py-3">{task.deadline}</td></tr>; })}</tbody></table></div></div><TaskDetailsModal task={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} onDelegate={() => onNavigate?.("delegate-task")} /></div>;
}
