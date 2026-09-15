import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { AppAvatar } from "../AppAvatar";
import { ROLE_HOME, type Role, type ScreenId } from "../AppShell";
import { roleProfiles } from "../data";

export function ProfileScreen({ role = "admin", onNavigate }: { role?: Role; onNavigate?: (id: ScreenId) => void }) {
  const profile = roleProfiles[role];
  const { register, handleSubmit } = useForm({
    defaultValues: { name: profile.name, email: profile.email, current: "", next: "" },
  });

  const submit = handleSubmit(() => {
    toast.success("Profile updated", { id: "profile-updated" });
    onNavigate?.(ROLE_HOME[role]);
  });

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="tdts-page-title">My Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">Account identity and password settings.</p>
      <form onSubmit={submit} className="mt-5 grid gap-4">
        <section className="tdts-card p-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <AppAvatar initials={profile.initials} size="lg" />
              <button type="button" className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-brand-primary text-white"><Camera className="h-3 w-3" /></button>
            </div>
            <div><div className="font-semibold">{profile.name}</div><div className="text-xs text-muted-foreground">{profile.badge}</div></div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-xs font-medium">Name<Input {...register("name")} /></label>
            <label className="grid gap-1 text-xs font-medium">Email<Input type="email" {...register("email")} /></label>
          </div>
        </section>
        <section className="tdts-card p-5">
          <h2 className="font-semibold">Change password</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-xs font-medium">Current password<Input type="password" {...register("current")} /></label>
            <label className="grid gap-1 text-xs font-medium">New password<Input type="password" {...register("next")} /></label>
          </div>
        </section>
        <div className="flex justify-end"><Button type="submit" className="bg-brand-primary text-white">Save Profile</Button></div>
      </form>
    </div>
  );
}
