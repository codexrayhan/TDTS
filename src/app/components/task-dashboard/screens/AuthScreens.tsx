import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { CheckCircle2, KeyRound, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { TDTSWordmark } from "../TDTSLogo";
import { RoleSelectCards } from "../RoleSelectCards";
import type { Role } from "../AppShell";
import { useAuth } from "../../../lib/auth";
function AuthFrame({ title, text, children, onBack }: { title:string;text:string;children: ReactNode;onBack?:()=>void }) { return <div className="grid min-h-screen place-items-center bg-bg-page p-5"><div className="w-full max-w-lg"><button onClick={onBack} className="mb-6"><TDTSWordmark/></button><div className="tdts-card p-6"><h1 className="text-2xl font-semibold tracking-[-.03em]">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{text}</p>{children}</div></div></div>; }
export function SignUpScreen({ onComplete, onBack }: { onComplete?: (role: Role) => void; onBack?: () => void }) {
  const [role, setRole] = useState<Role>("admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSubmitting(true);
    try { const user = await signup({ name, email, password, role }); toast.success("Account created", { id: "auth-signup-success", description: `Welcome to TDTS, ${user.name}` }); onComplete?.(user.role); }
    catch (error) { toast.error("Account not created", { id: "auth-signup-error", description: error instanceof Error ? error.message : "Please try again" }); }
    finally { setSubmitting(false); }
  };
  return <AuthFrame title="Create your TDTS account" text="Choose the role you will use for this session. Your role cannot be switched after sign-in." onBack={onBack}><form onSubmit={submit} className="mt-5 grid gap-4"><RoleSelectCards value={role} onChange={setRole}/><Input value={name} onChange={(event)=>setName(event.target.value)} placeholder="Full name" required/><Input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Work email" required/><Input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="Password" minLength={8} required/><Button disabled={submitting} className="bg-brand-primary text-white">{submitting ? "Creating…" : "Create account"}</Button></form></AuthFrame>;
}
export function ForgotPasswordScreen({ onBack, onReset }: { onBack?:()=>void; onReset?:()=>void }) { return <AuthFrame title="Reset your password" text="Enter your work email and we'll prepare a secure reset flow." onBack={onBack}><div className="mt-5 grid gap-4"><div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tertiary text-brand-primary"><Mail/></div><Input type="email" placeholder="you@company.com"/><Button className="bg-brand-primary text-white" onClick={onReset}>Send reset link</Button></div></AuthFrame>; }
export function ResetPasswordScreen({ onDone, onBack }: { onDone?:()=>void; onBack?:()=>void }) { return <AuthFrame title="Choose a new password" text="Use at least eight characters and avoid reusing an old workspace password." onBack={onBack}><div className="mt-5 grid gap-4"><div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-tertiary text-brand-primary"><KeyRound/></div><Input type="password" placeholder="New password"/><Input type="password" placeholder="Confirm password"/><Button className="bg-brand-primary text-white" onClick={onDone}>Update password</Button></div></AuthFrame>; }
export function SsoRedirectScreen({ onComplete, onBack }: { onComplete?:()=>void; onBack?:()=>void }) { const [ready,setReady]=useState(false); useEffect(()=>{const id=setTimeout(()=>setReady(true),900);return()=>clearTimeout(id)},[]); return <AuthFrame title="Connecting to your identity provider" text="TDTS is preparing a secure SSO redirect for your organization." onBack={onBack}><div className="mt-6 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-tertiary text-brand-primary">{ready?<CheckCircle2/>:<span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-primary border-t-transparent"/>}</div><p className="mt-4 text-sm text-muted-foreground">{ready?"Identity provider ready.":"Establishing secure session…"}</p><Button disabled={!ready} className="mt-4 bg-brand-primary text-white" onClick={onComplete}>Continue with SSO</Button></div></AuthFrame>; }
