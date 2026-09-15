import { FileQuestion } from "lucide-react";
import { Button } from "../../ui/button";
import type { ScreenId } from "../AppShell";
export function NotFoundScreen({ onNavigate }: { onNavigate?: (id: ScreenId) => void }) { return <div className="grid min-h-[65vh] place-items-center text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-bg-faint text-muted-foreground"><FileQuestion/></span><div className="tdts-tabular mt-5 text-5xl font-semibold">404</div><h1 className="mt-2 text-xl font-semibold">Page not found</h1><p className="mt-2 text-sm text-muted-foreground">The requested TDTS screen does not exist in this workspace.</p><Button className="mt-5 bg-brand-primary text-white" onClick={()=>onNavigate?.("dashboard")}>Go home</Button></div></div>; }
