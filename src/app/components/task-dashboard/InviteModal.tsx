import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function InviteModal({
  open,
  onOpenChange,
  onInvited,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvited?: (email: string, role: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");

  const sendInvite = () => {
    const normalized = email.trim();
    if (!normalized || !normalized.includes("@")) {
      toast.error("Enter a valid email", { id: "invite-invalid-email" });
      return;
    }
    onInvited?.(normalized, role);
    toast.success(`Invitation sent to ${normalized}`, {
      id: "invite-sent",
      description: `${role} access will activate after the invitation is accepted.`,
    });
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Invite a teammate</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <label className="grid gap-1.5 text-sm font-medium">
            Email
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Role
            <select value={role} onChange={(event) => setRole(event.target.value)} className="h-9 rounded-md border border-border-primary bg-background px-3">
              <option>Admin</option>
              <option>Employee</option>
            </select>
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-brand-primary text-white" onClick={sendInvite}>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
