import { GitBranch } from "lucide-react";
import { employees } from "./data";
import { AppAvatar } from "./AppAvatar";
import { WorkloadDot } from "./WorkloadDot";
export function DelegationPanel() {
  const rows = [
    ["Homepage wireframe", "ana"], ["Hero implementation", "dev"], ["API integration", "ben"], ["QA and analytics", "eli"],
  ] as const;
  return <section className="tdts-card p-4"><div className="mb-4 flex items-center gap-2"><GitBranch className="h-5 w-5 text-brand-primary"/><div><h2 className="tdts-heading">Delegation Map</h2><p className="text-xs text-muted-foreground">Website redesign — homepage</p></div></div><div className="grid gap-2">{rows.map(([task,id]) => { const person = employees.find((p) => p.id === id)!; return <div key={task} className="flex items-center gap-3 rounded-lg border border-border-secondary p-3"><div className="min-w-0 flex-1"><div className="text-sm font-medium">{task}</div><div className="text-xs text-muted-foreground">Sub-task</div></div><AppAvatar initials={person.initials} size="sm"/><div className="hidden items-center gap-1.5 text-xs sm:flex"><WorkloadDot workload={person.workload}/>{person.name}</div></div>; })}</div></section>;
}
