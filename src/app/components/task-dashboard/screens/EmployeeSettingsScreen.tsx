import { useState } from "react";
import { useTheme } from "@figma/astraui";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import type { ScreenId } from "../AppShell";

export function EmployeeSettingsScreen({ onNavigate: _onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState(true);
  const [deadline, setDeadline] = useState(true);
  return <div className="max-w-3xl"><h1 className="tdts-page-title">Employee Settings</h1><p className="mt-1 text-sm text-muted-foreground">Personal profile, notification preferences and appearance.</p><div className="mt-5 grid gap-4"><section className="tdts-card p-5"><h2 className="font-semibold">Profile</h2><div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="grid gap-1 text-xs font-medium">Name<Input defaultValue="Sumaiya Akter"/></label><label className="grid gap-1 text-xs font-medium">Email<Input defaultValue="sumaiya@taskflow.io"/></label></div></section><section className="tdts-card p-5"><h2 className="font-semibold">Notifications</h2><div className="mt-4 grid gap-3"><label className="flex items-center justify-between text-sm"><span>Email task updates</span><input type="checkbox" checked={email} onChange={(event) => setEmail(event.target.checked)} className="h-4 w-4 accent-[var(--brand-primary)]"/></label><label className="flex items-center justify-between text-sm"><span>Deadline reminders</span><input type="checkbox" checked={deadline} onChange={(event) => setDeadline(event.target.checked)} className="h-4 w-4 accent-[var(--brand-primary)]"/></label></div></section><section className="tdts-card flex items-center gap-4 p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-bg-faint">{theme === "dark" ? <Moon/> : <Sun/>}</span><div className="flex-1"><div className="font-semibold">Appearance</div><div className="text-xs text-muted-foreground">Current theme: {theme}</div></div><Button variant="outline" onClick={toggleTheme}>Toggle theme</Button></section><div className="flex justify-end"><Button className="bg-brand-primary text-white" onClick={() => toast.success("Employee settings saved", { id: "employee-settings-saved" })}>Save Changes</Button></div></div></div>;
}
