import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "@figma/astraui";
import {
  BarChart3,
  ChevronDown,
  Crown,
  FileText,
  Folder,
  Globe2,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Sun,
  Trophy,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { Drawer, DrawerContent } from "../ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { AppAvatar } from "./AppAvatar";
import { NotificationCenter } from "./NotificationCenter";
import { TDTSWordmark } from "./TDTSLogo";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { roleProfiles } from "./data";

export type Role = "admin" | "super" | "employee";
export type ScreenId =
  | "dashboard" | "tasks" | "create-task" | "delegate-task" | "leaderboard" | "settings"
  | "superadmin" | "sa-projects" | "sa-export" | "sa-admins" | "sa-leaderboard" | "sa-settings"
  | "employee" | "emp-files" | "emp-performance" | "emp-rewards" | "emp-settings"
  | "profile" | "not-found" | "access-denied";

export const ROLE_SCREENS: Record<Role, ScreenId[]> = {
  admin: ["dashboard", "tasks", "create-task", "delegate-task", "leaderboard", "settings"],
  super: ["superadmin", "sa-projects", "sa-export", "sa-admins", "sa-leaderboard", "sa-settings"],
  employee: ["employee", "emp-files", "emp-performance", "emp-rewards", "emp-settings"],
};

const SHARED: ScreenId[] = ["profile", "not-found", "access-denied"];

export const ROLE_HOME: Record<Role, ScreenId> = {
  admin: "dashboard",
  super: "superadmin",
  employee: "employee",
};

export function canRoleAccess(role: Role, screen: ScreenId) {
  return ROLE_SCREENS[role].includes(screen) || SHARED.includes(screen);
}

export function getRoleFromScreen(screen: ScreenId): Role {
  if (ROLE_SCREENS.super.includes(screen)) return "super";
  if (ROLE_SCREENS.employee.includes(screen)) return "employee";
  return "admin";
}

type NavItem = { id: ScreenId; label: string; icon: typeof LayoutDashboard };

const nav: Record<Role, NavItem[]> = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "Task Management", icon: ListChecks },
    { id: "create-task", label: "Create / Delegate", icon: WandSparkles },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "settings", label: "Settings", icon: Settings },
  ],
  super: [
    { id: "superadmin", label: "Company Overview", icon: Globe2 },
    { id: "sa-projects", label: "All Projects", icon: Folder },
    { id: "sa-export", label: "Export CSV", icon: FileText },
    { id: "sa-admins", label: "Manage Admins", icon: ShieldCheck },
    { id: "sa-leaderboard", label: "Global Leaderboard", icon: Trophy },
    { id: "sa-settings", label: "Role Settings", icon: Settings },
  ],
  employee: [
    { id: "employee", label: "My Tasks", icon: ListChecks },
    { id: "emp-files", label: "Files", icon: Folder },
    { id: "emp-performance", label: "My Performance", icon: BarChart3 },
    { id: "emp-rewards", label: "Rewards", icon: Star },
    { id: "emp-settings", label: "Settings", icon: Settings },
  ],
};

const titles: Record<ScreenId, string> = {
  dashboard: "Dashboard",
  tasks: "Task Management",
  "create-task": "Create Task",
  "delegate-task": "Delegate Task",
  leaderboard: "Leaderboard",
  settings: "Workspace Settings",
  superadmin: "Company Overview",
  "sa-projects": "All Projects",
  "sa-export": "Export CSV",
  "sa-admins": "Manage Admins",
  "sa-leaderboard": "Global Leaderboard",
  "sa-settings": "Role Settings",
  employee: "My Tasks",
  "emp-files": "Files",
  "emp-performance": "My Performance",
  "emp-rewards": "Rewards",
  "emp-settings": "Employee Settings",
  profile: "My Profile",
  "not-found": "Page Not Found",
  "access-denied": "Access Denied",
};

function RoleBadge({ role, collapsed }: { role: Role; collapsed: boolean }) {
  const Icon = role === "super" ? Crown : role === "admin" ? ShieldCheck : UserRound;
  return (
    <div className={`flex items-center rounded-lg bg-brand-tertiary px-3 py-2 text-xs font-medium text-brand-primary ${collapsed ? "justify-center" : "gap-2"}`}>
      <Icon className="h-4 w-4 shrink-0" />{!collapsed && roleProfiles[role].badge}
    </div>
  );
}

function SideNav({
  role,
  active,
  collapsed,
  onNavigate,
}: {
  role: Role;
  active: ScreenId;
  collapsed: boolean;
  onNavigate: (id: ScreenId) => void;
}) {
  return (
    <div className="flex h-full flex-col p-3">
      <div className="mb-5 px-1"><TDTSWordmark compact={collapsed} /></div>
      <RoleBadge role={role} collapsed={collapsed} />
      <nav className="mt-4 grid gap-1">
        {nav[role].map((item) => {
          const Icon = item.icon;
          const activeItem = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`flex h-10 items-center rounded-lg px-3 text-sm font-medium transition ${collapsed ? "justify-center" : "gap-3"} ${activeItem ? "bg-brand-primary text-white" : "text-foreground hover:bg-bg-faint"}`}
            >
              <Icon className="h-4 w-4 shrink-0" />{!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-border-secondary pt-3 text-xs text-muted-foreground">
        {!collapsed && <>Zero-Clutter<br />Bird&apos;s Eye View</>}
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button onClick={toggleTheme} className="grid h-9 w-9 place-items-center rounded-md border border-border-primary bg-surface-bg hover:bg-bg-faint" aria-label="Toggle theme">
      {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

function Header({
  active,
  role,
  onProfile,
  onSignOut,
  onMenu,
}: {
  active: ScreenId;
  role: Role;
  onProfile: () => void;
  onSignOut: () => void;
  onMenu?: () => void;
}) {
  const profile = roleProfiles[role];
  const openCommands = () => window.dispatchEvent(new Event("tdts:command"));

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border-primary bg-background/90 px-4 backdrop-blur md:px-6">
      {onMenu && (
        <button onClick={onMenu} className="grid h-9 w-9 place-items-center rounded-md hover:bg-bg-faint" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
      )}
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{role === "super" ? "Company" : role === "employee" ? "Personal" : "Project Alpha"}</div>
        <div className="truncate text-sm font-semibold">{titles[active]}</div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {role === "admin" && <div className="hidden md:block"><WorkspaceSwitcher /></div>}
        <button
          onClick={openCommands}
          className="hidden h-9 items-center gap-2 rounded-md border border-border-primary bg-surface-bg px-2.5 text-xs text-muted-foreground hover:bg-bg-faint sm:flex"
          aria-label="Open command palette"
          title="Command palette (Cmd/Ctrl+K)"
        >
          <Search className="h-4 w-4" /><span>Commands</span><kbd className="rounded bg-bg-faint px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>
        <ThemeToggle />
        <NotificationCenter />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-bg-faint">
              <AppAvatar initials={profile.initials} />
              <span className="hidden text-left md:block">
                <span className="block text-xs font-semibold">{profile.name}</span>
                <span className="block text-[10px] text-muted-foreground">{profile.badge}</span>
              </span>
              <ChevronDown className="hidden h-3 w-3 text-muted-foreground md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem onClick={onProfile}><UserRound />Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}><LogOut />Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function AppShell({
  active,
  role,
  onNavigate,
  onSignOut,
  children,
}: {
  active: ScreenId;
  role: Role;
  onNavigate: (id: ScreenId) => void;
  onSignOut: () => void;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const sync = () => {
      setMobile(media.matches);
      if (!media.matches) setMobileOpen(false);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const go = (id: ScreenId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  if (mobile) {
    return (
      <div className="min-h-screen bg-bg-page">
        <Drawer open={mobileOpen} onOpenChange={setMobileOpen} direction="left">
          <DrawerContent className="h-full w-[280px] rounded-none bg-surface-bg">
            <SideNav role={role} active={active} collapsed={false} onNavigate={go} />
          </DrawerContent>
        </Drawer>
        <Header active={active} role={role} onProfile={() => go("profile")} onSignOut={onSignOut} onMenu={() => setMobileOpen(true)} />
        <main className="mx-auto w-full max-w-[1600px] p-4 md:p-6">{children}</main>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen bg-bg-page">
      <ResizablePanel
        defaultSize={18}
        minSize={12}
        maxSize={22}
        collapsible
        collapsedSize={6}
        onCollapse={() => setCollapsed(true)}
        onExpand={() => setCollapsed(false)}
      >
        <aside className="sticky top-0 h-screen border-r border-border-primary bg-surface-bg">
          <SideNav role={role} active={active} collapsed={collapsed} onNavigate={go} />
        </aside>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={82}>
        <div className="min-h-screen">
          <Header active={active} role={role} onProfile={() => go("profile")} onSignOut={onSignOut} />
          <main className="mx-auto w-full max-w-[1600px] p-4 md:p-6">{children}</main>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
