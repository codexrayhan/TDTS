import { Crown, ShieldCheck, UserRound } from "lucide-react";
import type { Role } from "./AppShell";
const options = [
  { role: "admin" as Role, title: "Admin", text: "Run a workspace, delegate work and track delivery.", icon: ShieldCheck },
  { role: "super" as Role, title: "Super Admin", text: "Oversee company-wide projects, admins and permissions.", icon: Crown },
  { role: "employee" as Role, title: "Employee", text: "Focus on assigned tasks, performance and rewards.", icon: UserRound },
];
export function RoleSelectCards({ value, onChange }: { value: Role; onChange: (role: Role) => void }) {
  return <div className="grid gap-3 md:grid-cols-3">{options.map(({ role, title, text, icon: Icon }) => <button type="button" key={role} onClick={() => onChange(role)} className={`rounded-xl border p-4 text-left transition ${value === role ? "border-brand-primary bg-brand-tertiary" : "border-border-primary bg-surface-bg hover:-translate-y-0.5 hover:shadow-sm"}`}><Icon className="mb-3 h-5 w-5 text-brand-primary"/><div className="font-semibold">{title}</div><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></button>)}</div>;
}
