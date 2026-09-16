import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Textarea } from "../../ui/textarea";
import { AIRecommendationPanel } from "../AIRecommendationPanel";
import { createTask, getEmployees } from "../../../lib/api";
import { employees as fallbackEmployees, type Employee, type EmployeeId, type Priority } from "../data";
import type { ScreenId } from "../AppShell";

type FormValues = { title: string; description: string; project: string; priority: Priority; deadline: string; assignee: EmployeeId };
const defaultDueDate = new Date(2026, 8, 24);

export function CreateTaskScreen({ onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({ defaultValues: { title: "", description: "", project: "Project Alpha", priority: "medium", deadline: "2026-09-24", assignee: "ben" } });
  const [assigned, setAssigned] = useState<EmployeeId>("ben");
  const [dueDate, setDueDate] = useState<Date | undefined>(defaultDueDate);
  const [employees, setEmployees] = useState<Employee[]>(fallbackEmployees);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { getEmployees().then(setEmployees).catch(() => setEmployees(fallbackEmployees)); }, []);
  const select = (id: EmployeeId) => { setAssigned(id); setValue("assignee", id, { shouldDirty: true }); };
  const setDeadline = (date: Date | undefined) => { setDueDate(date); setValue("deadline", date ? format(date, "yyyy-MM-dd") : "", { shouldDirty: true, shouldValidate: true }); };
  const submit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await createTask({ title: values.title, description: values.description, project: values.project, priority: values.priority, deadline: values.deadline, assigneeId: values.assignee, status: "To-Do" });
      toast.success("Task created", { id: "create-task", description: `Task "${values.title}" added to ${values.project}` });
      onNavigate?.("tasks");
    } catch (error) { toast.error("Task not created", { id: "create-task-error", description: error instanceof Error ? error.message : "Please try again" }); }
    finally { setSubmitting(false); }
  }, () => {
    // Required fields are empty (e.g. title or due date) — react-hook-form
    // blocks the actual submit, so without this the button looked like it
    // did nothing. Surface it instead of failing silently.
    toast.error("Missing required fields", { id: "create-task-validation", description: "Add a task title and due date before creating the task." });
  });
  return <div className="mx-auto max-w-6xl"><button onClick={() => onNavigate?.("tasks")} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />Task Management</button><div className="mb-5"><h1 className="tdts-page-title">Create Task</h1><p className="mt-1 text-sm text-muted-foreground">Define the work, then review TDTS&apos;s recommendation before assigning.</p></div><form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1fr_390px]"><section className="tdts-card grid content-start gap-4 p-5"><label className="grid gap-1.5 text-sm font-medium">Task title<Input {...register("title", { required: true })} placeholder="e.g. Build billing settings page" className={errors.title ? "border-danger" : undefined} />{errors.title && <span className="text-xs font-normal text-danger">Task title is required.</span>}</label><label className="grid gap-1.5 text-sm font-medium">Description<Textarea {...register("description")} rows={5} placeholder="Scope, acceptance criteria and context" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-medium">Project<select {...register("project")} className="h-9 rounded-md border border-border-primary bg-background px-3"><option>Project Alpha</option><option>Growth Workspace</option><option>Checkout Team</option></select></label><label className="grid gap-1.5 text-sm font-medium">Priority<select {...register("priority")} className="h-9 rounded-md border border-border-primary bg-background px-3"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label></div><div className="grid gap-1.5 text-sm font-medium"><span>Due date</span><Popover><PopoverTrigger asChild><Button type="button" variant="outline" className="justify-start font-normal"><CalendarDays className="h-4 w-4" />{dueDate ? format(dueDate, "MMM d, yyyy") : "Choose a due date"}</Button></PopoverTrigger><PopoverContent align="start" className="w-auto p-0"><Calendar mode="single" selected={dueDate} onSelect={setDeadline} initialFocus /></PopoverContent></Popover><input type="hidden" {...register("deadline", { required: true })} />{errors.deadline && <span className="text-xs font-normal text-danger">Due date is required.</span>}</div><div className="flex justify-end gap-2 border-t border-border-secondary pt-4"><Button type="button" variant="outline" onClick={() => onNavigate?.("tasks")}>Cancel</Button><Button type="submit" disabled={submitting} className="bg-brand-primary text-white">{submitting ? "Creating…" : "Create Task"}</Button></div></section><aside className="grid content-start gap-4"><AIRecommendationPanel taskId="t6" onAssign={select} /><section className="tdts-card p-4"><label className="grid gap-1.5 text-sm font-medium">Assignee<select {...register("assignee")} value={assigned} onChange={(event) => select(event.target.value as EmployeeId)} className="h-10 rounded-md border border-border-primary bg-background px-3">{employees.map((person) => <option key={person.id} value={person.id}>{person.name} — {person.workload}</option>)}</select></label><p className="mt-2 text-xs text-muted-foreground">Manual override remains available after the AI recommendation.</p></section></aside></form></div>;
}
