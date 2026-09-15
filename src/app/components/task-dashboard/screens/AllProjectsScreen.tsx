import { Download, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";
import { getTasks } from "../../../lib/api";
import type { Task } from "../data";
import type { ScreenId } from "../AppShell";

type ProjectRow = [string, string, string, string, string, string];
const workspaceForProject: Record<string, string> = { "Project Alpha": "Product Workspace", Growth: "Growth Workspace", "Growth Workspace": "Growth Workspace", Checkout: "Checkout Team", "Checkout Team": "Checkout Team", Platform: "Platform" };
export function AllProjectsScreen({ onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const [q, setQ] = useState("");
  const [tasks, setTasks] = useState<Task[] | null>(null);
  useEffect(() => { getTasks().then(setTasks).catch(() => setTasks([])); }, []);
  const projects = useMemo<ProjectRow[]>(() => {
    if (!tasks) return [];
    const groups = new Map<string, Task[]>();
    tasks.forEach((task) => groups.set(task.project, [...(groups.get(task.project) || []), task]));
    return [...groups.entries()].map(([project, projectTasks], index) => {
      const done = projectTasks.filter((task) => task.status === "Done").length;
      const health = Math.max(70, Math.min(98, 82 + done * 4 - projectTasks.filter((task) => task.status === "Backlog").length * 2));
      const latest = projectTasks.map((task) => task.deadline).sort().at(-1) || "—";
      return [project, workspaceForProject[project] || "Product Workspace", index % 2 ? "Sadia Karim" : "Arif Hossain", `${done} / ${projectTasks.length}`, `${health}%`, latest];
    });
  }, [tasks]);
  const rows = projects.filter((project) => project.join(" ").toLowerCase().includes(q.toLowerCase()));
  return <div><div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="tdts-page-title">All Projects</h1><p className="mt-1 text-sm text-muted-foreground">Every active project across every company workspace.</p></div><Button className="bg-brand-primary text-white" onClick={() => onNavigate?.("sa-export")}><Download />Export CSV</Button></div><div className="tdts-card mt-5 overflow-hidden"><div className="border-b border-border-primary p-4"><label className="relative block max-w-sm"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search projects or admins" className="pl-9" /></label></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-bg-faint text-xs text-muted-foreground"><tr>{["Project", "Workspace", "Admin", "Tasks", "Health", "Deadline"].map((heading) => <th key={heading} className="px-4 py-3">{heading}</th>)}</tr></thead><tbody>{tasks === null ? Array.from({ length: 5 }, (_, index) => <tr key={index}><td colSpan={6} className="px-4 py-2"><Skeleton className="h-9 w-full" /></td></tr>) : rows.map((row) => <tr key={row[0]} className="border-t border-border-secondary hover:bg-bg-faint">{row.map((cell, index) => <td key={index} className={`px-4 py-3 ${index === 0 ? "font-medium" : ""}`}>{cell}</td>)}</tr>)}</tbody></table></div></div></div>;
}
