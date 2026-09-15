import { Bell } from "lucide-react";
import { notifications } from "./data";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
export function NotificationCenter() {
  return <Popover><PopoverTrigger asChild><button className="relative grid h-9 w-9 place-items-center rounded-md border border-border-primary bg-surface-bg hover:bg-bg-faint" aria-label="Notifications"><Bell className="h-4 w-4"/><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-[var(--surface-bg)]"/></button></PopoverTrigger><PopoverContent align="end" className="w-[360px] p-0"><div className="border-b border-border-primary px-4 py-3"><div className="font-semibold">Notifications</div><div className="text-xs text-muted-foreground">5 recent updates</div></div><div className="max-h-[360px] overflow-auto">{notifications.map((item) => <div key={item.id} className="border-b border-border-secondary px-4 py-3 last:border-0"><div className="text-sm leading-5">{item.title}</div><div className="mt-1 text-xs text-muted-foreground">{item.time}</div></div>)}</div></PopoverContent></Popover>;
}
