import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useAuth } from "../../../lib/auth";
import { TDTSWordmark } from "../TDTSLogo";
import { RoleSelectCards } from "../RoleSelectCards";
import type { Role } from "../AppShell";

export function LoginScreen({ onLogin, onSignUp, onForgot, onSso, onBack }: { onLogin?: (role: Role) => void; onSignUp?: () => void; onForgot?: () => void; onSso?: () => void; onBack?: () => void }) {
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("arif@taskflow.io");
  const [password, setPassword] = useState("demo1234");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const chooseRole = (nextRole: Role) => {
    setRole(nextRole);
    setEmail(nextRole === "super" ? "kamrul@taskflow.io" : nextRole === "employee" ? "sumaiya@taskflow.io" : "arif@taskflow.io");
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const user = await login(email, password, role);
      toast.success("Signed in", { id: "auth-login-success", description: `Welcome back, ${user.name}` });
      onLogin?.(user.role);
    } catch (error) {
      toast.error("Sign in failed", { id: "auth-login-error", description: error instanceof Error ? error.message : "Check your credentials" });
    } finally { setSubmitting(false); }
  };
  return <div className="grid min-h-screen bg-bg-page lg:grid-cols-2"><div className="hidden bg-primary p-10 text-white lg:flex lg:flex-col"><TDTSWordmark /><div className="my-auto max-w-md"><div className="text-4xl font-semibold tracking-[-.04em]">One sign-in. One role. Zero navigation ambiguity.</div><p className="mt-4 text-sm leading-6 text-white/65">Your TDTS role is fixed for the session so every screen stays scoped to the work you are responsible for.</p></div></div><div className="grid place-items-center p-5"><form onSubmit={submit} className="w-full max-w-xl rounded-2xl border border-border-primary bg-surface-bg p-6 shadow-sm"><button type="button" onClick={onBack} className="mb-6 lg:hidden"><TDTSWordmark /></button><h1 className="text-2xl font-semibold tracking-[-.03em]">Welcome back</h1><p className="mt-1 text-sm text-muted-foreground">Use a sample account or your workspace credentials.</p><div className="mt-6"><RoleSelectCards value={role} onChange={chooseRole} /></div><div className="mt-5 grid gap-4"><label className="grid gap-1.5 text-sm font-medium">Email<Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="grid gap-1.5 text-sm font-medium">Password<Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label></div><div className="mt-2 text-right"><button type="button" onClick={onForgot} className="text-xs font-medium text-brand-primary">Forgot password?</button></div><Button type="submit" disabled={submitting} className="mt-5 w-full bg-brand-primary text-white">{submitting ? "Signing in…" : "Log in"}</Button><Button type="button" variant="outline" className="mt-2 w-full" onClick={onSso}>Log in with SSO</Button><p className="mt-5 text-center text-xs text-muted-foreground">New to TDTS? <button type="button" onClick={onSignUp} className="font-semibold text-brand-primary">Create an account</button></p></form></div></div>;
}
