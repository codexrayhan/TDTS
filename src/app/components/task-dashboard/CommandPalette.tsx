import { useEffect, useState } from "react";
import { BarChart3, CheckSquare, LayoutDashboard, LogOut, MoonStar, Plus, UserRound } from "lucide-react";
import { toast } from "sonner";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "../ui/command";
import type { ScreenId } from "./AppShell";
import { employees as fallbackEmployees, type Employee } from "./data";
import { getEmployees } from "../../lib/api";

export function CommandPalette({ authenticated, onNavigate, onToggleTheme, onSignOut }: { authenticated: boolean; onNavigate: (id: ScreenId) => void; onToggleTheme: () => void; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(fallbackEmployees);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((current) => !current); } }; const onOpen = () => setOpen(true); window.addEventListener("keydown", onKeyDown); window.addEventListener("tdts:command", onOpen); return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("tdts:command", onOpen); }; }, []);
  useEffect(() => { if (!authenticated) return; getEmployees().then(setEmployees).catch(() => setEmployees(fallbackEmployees)); }, [authenticated]);
  const run = (action: () => void) => { setOpen(false); action(); };
  const go = (id: ScreenId) => { if (!authenticated) { toast.info("Sign in to open workspace screens", { id: "command-sign-in-required" }); return; } onNavigate(id); };
  return <CommandDialog open={open} onOpenChange={setOpen} title="TDTS Command Palette" description="Jump to a screen or run a quick action."><CommandInput placeholder="Search commands or teammates…" /><CommandList><CommandEmpty>No matching command.</CommandEmpty><CommandGroup heading="Navigation"><CommandItem onSelect={() => run(() => go("dashboard"))}><LayoutDashboard />Go to Dashboard</CommandItem><CommandItem onSelect={() => run(() => go("tasks"))}><CheckSquare />Go to Task Management</CommandItem><CommandItem onSelect={() => run(() => go("create-task"))}><Plus />Create new task</CommandItem></CommandGroup><CommandSeparator /><CommandGroup heading="Quick actions"><CommandItem onSelect={() => run(onToggleTheme)}><MoonStar />Toggle theme<CommandShortcut>Theme</CommandShortcut></CommandItem>{authenticated && <CommandItem onSelect={() => run(onSignOut)}><LogOut />Sign out</CommandItem>}</CommandGroup><CommandSeparator /><CommandGroup heading="Assign to teammate">{employees.map((employee) => <CommandItem key={employee.id} value={`Assign to ${employee.name}`} onSelect={() => run(() => toast.info(`Assign to ${employee.name}`, { id: `command-assign-${employee.id}`, description: "Quick assignment is a demo action; no task was changed." }))}><UserRound />Assign to {employee.name}<CommandShortcut>{employee.initials}</CommandShortcut></CommandItem>)}</CommandGroup><CommandGroup heading="Shortcut"><CommandItem disabled><BarChart3 />Open command palette anytime<CommandShortcut>⌘/Ctrl K</CommandShortcut></CommandItem></CommandGroup></CommandList></CommandDialog>;
}
