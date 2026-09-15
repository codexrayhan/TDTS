import { useState } from "react";
import { Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { InviteModal } from "../InviteModal";
import { ConfirmModal } from "../ConfirmModal";
import { AppAvatar } from "../AppAvatar";
import { EmptyState } from "../EmptyState";
import type { ScreenId } from "../AppShell";

const seed = [
  { name: "Arif Hossain", email: "arif@taskflow.io", initials: "AH", workspace: "Product Workspace", last: "8 min ago" },
  { name: "Sadia Karim", email: "sadia@taskflow.io", initials: "SK", workspace: "Checkout Team", last: "1 hr ago" },
  { name: "Mahin Rahman", email: "mahin@taskflow.io", initials: "MR", workspace: "Growth Workspace", last: "Yesterday" },
];

function initialsFromEmail(email: string) {
  return email.split("@")[0].split(/[._-]/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "NA";
}

export function ManageAdminsScreen({ onNavigate: _onNavigate }: { onNavigate?: (id: ScreenId) => void }) {
  const [admins, setAdmins] = useState(seed);
  const [invite, setInvite] = useState(false);
  const [remove, setRemove] = useState<number | null>(null);

  const addAdmin = (email: string, role: string) => {
    if (role !== "Admin") return;
    const local = email.split("@")[0].replace(/[._-]+/g, " ");
    const name = local.replace(/\b\w/g, (letter) => letter.toUpperCase());
    setAdmins((current) => [{ name, email, initials: initialsFromEmail(email), workspace: "Product Workspace", last: "Invited now" }, ...current]);
  };

  const confirmRemove = () => {
    if (remove === null) return;
    const removed = admins[remove];
    setAdmins((current) => current.filter((_, index) => index !== remove));
    setRemove(null);
    toast.success("Admin removed", { id: "admin-removed", description: `${removed.name} no longer has admin access.` });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="tdts-page-title">Manage Admins</h1>
          <p className="mt-1 text-sm text-muted-foreground">Invite workspace owners and revoke company-level administration access.</p>
        </div>
        <Button className="bg-brand-primary text-white" onClick={() => setInvite(true)}><Plus />Invite Admin</Button>
      </div>
      {admins.length === 0 ? (
        <div className="mt-5">
          <EmptyState icon={ShieldCheck} title="No admins invited" description="Invite a workspace owner to manage projects and teams." actionLabel="Invite admin" onAction={() => setInvite(true)} />
        </div>
      ) : (
        <section className="tdts-card mt-5 overflow-hidden">
          {admins.map((admin, index) => (
            <div key={admin.email} className="flex flex-wrap items-center gap-3 border-b border-border-secondary p-4 last:border-0">
              <AppAvatar initials={admin.initials} />
              <div className="min-w-48 flex-1"><div className="text-sm font-medium">{admin.name}</div><div className="text-xs text-muted-foreground">{admin.email}</div></div>
              <div className="min-w-40 text-xs"><div>{admin.workspace}</div><div className="text-muted-foreground">Last active {admin.last}</div></div>
              <Button variant="ghost" size="icon" onClick={() => setRemove(index)} aria-label={`Remove ${admin.name}`}><Trash2 className="text-danger" /></Button>
            </div>
          ))}
        </section>
      )}
      <InviteModal open={invite} onOpenChange={setInvite} onInvited={addAdmin} />
      <ConfirmModal
        open={remove !== null}
        onOpenChange={(open) => !open && setRemove(null)}
        title="Remove admin?"
        description="This removes admin access from the selected workspace owner. Existing task data is retained."
        confirmLabel="Remove"
        onConfirm={confirmRemove}
      />
    </div>
  );
}
