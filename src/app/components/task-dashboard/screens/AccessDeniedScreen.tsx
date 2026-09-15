import { ShieldX } from "lucide-react";
import { Button } from "../../ui/button";
import type { Role, ScreenId } from "../AppShell";
import { ROLE_HOME } from "../AppShell";
export function AccessDeniedScreen({ role = "admin", requiredRole, onNavigate }: { role?: Role; requiredRole?: Role; onNavigate?: (id: ScreenId) => void }) {
  const roleName = role === "super" ? "Super Admin" : role === "admin" ? "Admin" : "Employee";
  const requiredName = requiredRole === "super" ? "Super Admin" : requiredRole === "admin" ? "Admin" : requiredRole === "employee" ? "Employee" : "another role";
  return <div className="grid min-h-[65vh] place-items-center text-center"><div className="max-w-md"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-500/10 text-danger"><ShieldX/></span><h1 className="mt-5 text-2xl font-semibold">Access denied</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">This screen requires the {requiredName} role. You are signed in as {roleName}; roles are fixed at sign-in and cannot be switched mid-session.</p><Button className="mt-5 bg-brand-primary text-white" onClick={()=>onNavigate?.(ROLE_HOME[role])}>Return to my home</Button></div></div>;
}
