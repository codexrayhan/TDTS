import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { workspaces } from "./data";
export function WorkspaceSwitcher() {
  const [workspace, setWorkspace] = useState(workspaces[0]);
  return <label className="relative block"><span className="sr-only">Workspace</span><select value={workspace} onChange={(e) => setWorkspace(e.target.value)} className="h-9 appearance-none rounded-md border border-border-primary bg-surface-bg pl-3 pr-8 text-sm outline-none focus:border-brand-primary">{workspaces.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" /></label>;
}
