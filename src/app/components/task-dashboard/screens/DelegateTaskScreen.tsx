import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { ArrowLeft, CalendarDays, Plus, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { AIRecommendationPanel } from "../AIRecommendationPanel";
import { createTask, getEmployees } from "../../../lib/api";
import { employees as fallbackEmployees, type Employee, type EmployeeId } from "../data";
import type { ScreenId } from "../AppShell";

type Row = { id: number; taskId: string; title: string; assignee: EmployeeId; recommended: EmployeeId; dueDate: Date | undefined };
function DueDatePicker({ value, onChange }: { value: Date | undefined; onChange: (date: Date | undefined) => void }) { return <Popover><PopoverTrigger asChild><Button type="button" variant="outline" size="sm" className="justify-start font-normal"><CalendarDays className="h-3.5 w-3.5" />{value ? format(value, "MMM d, yyyy") : "Due date"}</Button></PopoverTrigger><PopoverContent align="start" className="w-auto p-0"><Calendar mode="single" selected={value} onSelect={onChange} initialFocus /></PopoverContent></Popover>; }

export function DelegateTaskScreen({ onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, taskId: "t5", title: "Create responsive hero layout", assignee: "ben", recommended: "ben", dueDate: new Date(2026, 8, 20) },
    { id: 2, taskId: "t4", title: "Wire analytics events", assignee: "eli", recommended: "eli", dueDate: new Date(2026, 8, 21) },
    { id: 3, taskId: "t3", title: "Prepare visual QA pass", assignee: "ana", recommended: "ana", dueDate: new Date(2026, 8, 22) },
  ]);
  const [employees, setEmployees] = useState<Employee[]>(fallbackEmployees);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { getEmployees().then(setEmployees).catch(() => setEmployees(fallbackEmployees)); }, []);
  const update = (id: number, patch: Partial<Row>) => setRows((current) => current.map((row) => row.id === id ? { ...row, ...patch } : row));
  const submit = async () => {
    setSubmitting(true);
    try {
      const validRows = rows.filter((row) => row.title.trim() && row.dueDate);
      await Promise.all(validRows.map((row) => createTask({ title: row.title.trim(), description: "Delegated sub-task of Website redesign — homepage", priority: "medium", status: "To-Do", deadline: format(row.dueDate!, "yyyy-MM-dd"), project: "Project Alpha", assigneeId: row.assignee })));
      toast.success("Sub-tasks delegated", { id: "delegate-subtasks", description: `${validRows.length} sub-task${validRows.length === 1 ? "" : "s"} assigned successfully` });
      onNavigate?.("tasks");
    } catch (error) { toast.error("Sub-tasks not delegated", { id: "delegate-subtasks-error", description: error instanceof Error ? error.message : "Please try again" }); }
    finally { setSubmitting(false); }
  };
  return <div className="mx-auto max-w-6xl"><button onClick={() => onNavigate?.("tasks")} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" />Task Management</button><div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="tdts-page-title">Delegate Sub-tasks</h1><p className="mt-1 text-sm text-muted-foreground">Parent task: Website redesign — homepage</p></div><Button variant="outline" onClick={() => setRows((current) => [...current, { id: Date.now(), taskId: "t5", title: "", assignee: "ben", recommended: "ben", dueDate: undefined }])}><Plus />Add row</Button></div><div className="mt-5 grid gap-3">{rows.map((row, index) => <section key={row.id} className="tdts-card grid gap-4 p-4 lg:grid-cols-[1fr_430px]"><div className="grid content-start gap-3"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-muted-foreground">SUB-TASK {index + 1}</span><button onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))} className="text-muted-foreground hover:text-danger"><Trash2 className="h-4 w-4" /></button></div><Input value={row.title} onChange={(event) => update(row.id, { title: event.target.value })} placeholder="Sub-task title" /><DueDatePicker value={row.dueDate} onChange={(dueDate) => update(row.id, { dueDate })} /></div><div className="grid content-start gap-3"><AIRecommendationPanel condensed taskId={row.taskId} recommended={row.recommended} onAssign={(assignee) => update(row.id, { assignee })} /><label className="grid gap-1.5 text-xs font-medium">Manual assignee<select value={row.assignee} onChange={(event) => update(row.id, { assignee: event.target.value as EmployeeId })} className="h-9 rounded-md border border-border-primary bg-background px-3 text-sm">{employees.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}</select></label></div></section>)}</div><div className="mt-5 flex justify-end gap-2"><Button variant="outline" onClick={() => onNavigate?.("tasks")}>Cancel</Button><Button disabled={submitting} className="bg-brand-primary text-white" onClick={submit}>{submitting ? "Saving…" : "Save Delegation"}</Button></div></div>;
}
