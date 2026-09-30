import { useState } from "react";
import { BookOpen, Columns3, Crown, ListChecks, ShieldCheck, Trophy, UserPlus, UserRound, Users, WandSparkles } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "1. Sign up and choose a role", text: "Enter your full name, work email and a password of at least 8 characters, then pick your role: Admin, Super Admin or Employee. The role is fixed for the session and cannot be switched after sign-in. Passwords are hashed with bcrypt, and logging in starts a 7-day secure session (JWT)." },
  { icon: ListChecks, title: "2. Create a task", text: "An Admin opens Create / Delegate and fills in the task title and due date (both required), plus a description, the project (Project Alpha, Growth Workspace or Checkout Team) and the priority (Low, Medium or High). If a required field is empty, a message tells you what is missing." },
  { icon: WandSparkles, title: "3. Pick the assignee with AI", text: "The panel beside the form recommends the best person, scoring employees from 0 to 100 with reasons based on skills, workload, availability and delivery history. You can accept the recommendation or choose anyone from the Assignee list, which shows each person's workload. Click Create Task and the task is saved as To-Do." },
  { icon: Users, title: "4. Delegate sub-tasks", text: "Click a card on the board, then Delegate Sub-task, to split a bigger task into smaller ones. Each row has a title, a due date, its own AI recommendation and a manual assignee list. Add or remove rows as needed, then Save Delegation to create them all as To-Do tasks. Rows without a title or due date are skipped." },
  { icon: Columns3, title: "5. Work the board", text: "Employees see only their own work in My Tasks. Drag a card across Backlog, To-Do, In Progress and Done. The screen updates instantly, the new status is saved in the background, and the card jumps back with an error message if saving fails. Click a card to read its details." },
  { icon: Trophy, title: "6. Track, reward, improve", text: "The dashboard health score shows project status: Healthy (90+), Moderate Risk (70+) or Critical (below 70). Finished work earns reward points and badges, and leaderboards rank employees. Super Admins watch every workspace from the Company Overview." },
] as const;

const roleGuides = {
  admin: {
    label: "Admin",
    icon: ShieldCheck,
    intro: "Admins run a project: they create, delegate and monitor work.",
    items: [
      "Open Dashboard to see project health and the live task board.",
      "Go to Create / Delegate and describe the task: title, description, project, priority and due date.",
      "Check the AI recommendation beside the form, or pick an assignee manually. Manual choice always stays available.",
      "Click Create Task. It is saved as To-Do and you return to Task Management.",
      "Click any card on the board, then Delegate Sub-task, to split work into smaller tasks with their own assignees and due dates.",
      "Open the Leaderboard to see who is delivering consistently.",
    ],
  },
  super: {
    label: "Super Admin",
    icon: Crown,
    intro: "Super Admins oversee the whole company without entering individual workspaces.",
    items: [
      "Company Overview shows four summary cards: Workspaces, Projects, Employees and Admins.",
      "The Active Workspaces table lists each workspace with its admin, number of projects, health percentage and status (Active or Attention).",
      "Use View all projects, or All Projects in the menu, to see every project.",
      "Export CSV downloads data for reports.",
      "Manage Admins controls who administers each workspace.",
      "Global Leaderboard ranks employees company-wide, and Role Settings controls what each role can access.",
    ],
  },
  employee: {
    label: "Employee",
    icon: UserRound,
    intro: "Employees focus on their own work and progress.",
    items: [
      "My Tasks shows only the work assigned to you, on a personal task board.",
      "Drag a card to the next column as you make progress. The change is saved automatically.",
      "Click a card to read the description, priority, deadline and assignee.",
      "My Performance shows how you are doing.",
      "Rewards shows your points, badges and points history.",
      "Files keeps your task-related files in one place.",
    ],
  },
} as const;

type RoleKey = keyof typeof roleGuides;

const comparison = [
  ["Main goal", "Give the right task to the right person and track it to done.", "Broad issue and project tracking, flexible for many kinds of teams."],
  ["Getting started", "Sign up, pick a role and use ready-made views for it.", "Projects, issue types and workflows usually need to be configured first."],
  ["Choosing an assignee", "AI fit score (0-100) with reasons, right beside the task form.", "Usually chosen by the reporter or by automation rules you set up."],
  ["Splitting work", "Delegate several sub-tasks on one screen, each with its own AI recommendation.", "Sub-tasks are created one by one inside each issue."],
  ["Team motivation", "Points, badges and leaderboards are built in.", "Not a core feature; usually added with extra apps."],
  ["Project health", "One health score: Healthy, Moderate Risk or Critical.", "Dashboards and reports are available, built by configuring them."],
  ["Learning curve", "Small: a 4-column board and role-based menus.", "Larger: very powerful, but with many concepts to learn."],
  ["Maturity and integrations", "A student lab project with a focused feature set.", "Very mature with a large integration ecosystem."],
] as const;

export function DocumentationSection() {
  const [role, setRole] = useState<RoleKey>("admin");
  const guide = roleGuides[role];

  return (
    <section id="docs" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-tertiary px-3 py-1 text-xs font-semibold text-brand-primary">
          <BookOpen className="h-3.5 w-3.5" />Documentation
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-.03em]">How TDTS works, start to finish.</h2>
        <p className="mt-3 text-muted-foreground">
          TDTS (Task Delegation and Tracking System) helps a team decide who should do a task, follow it through four stages, and recognise the people who deliver. Here is the whole flow in six steps.
        </p>
      </div>

      <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }) => (
          <li key={title} className="tdts-card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tertiary text-brand-primary"><Icon className="h-5 w-5" /></span>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <h3 className="text-2xl font-semibold tracking-[-.02em]">How to use it by role</h3>
        <p className="mt-2 text-sm text-muted-foreground">Each role has its own home screen and menu, so nobody sees screens they do not need.</p>

        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Choose a role">
          {(Object.keys(roleGuides) as RoleKey[]).map((key) => {
            const Icon = roleGuides[key].icon;
            const selected = key === role;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={selected}
                onClick={() => setRole(key)}
                className={`flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition ${selected ? "bg-brand-primary text-white" : "border border-border-primary hover:bg-bg-faint"}`}
              >
                <Icon className="h-4 w-4" />{roleGuides[key].label}
              </button>
            );
          })}
        </div>

        <div className="tdts-card mt-4 p-5" role="tabpanel">
          <p className="text-sm font-medium">{guide.intro}</p>
          <ol className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
            {guide.items.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-tertiary text-[11px] font-semibold text-brand-primary">{index + 1}</span>
                <span className="leading-5">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="text-2xl font-semibold tracking-[-.02em]">TDTS compared with Jira</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Jira is a powerful, widely used tool. TDTS takes a different approach: less setup and a sharper focus on delegation and motivation.
        </p>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-border-primary">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-bg-faint text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Area</th>
                <th className="px-4 py-3 font-semibold text-brand-primary">TDTS</th>
                <th className="px-4 py-3 font-semibold">Jira</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([area, tdts, jira]) => (
                <tr key={area} className="border-t border-border-secondary align-top">
                  <td className="px-4 py-3 font-medium">{area}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tdts}</td>
                  <td className="px-4 py-3 text-muted-foreground">{jira}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-3xl rounded-xl bg-bg-faint p-4 text-sm leading-6 text-muted-foreground">
          <span className="font-semibold text-foreground">Honest note: </span>
          Jira is far more mature and connects with many other tools, so large organisations may still prefer it. TDTS is best for small teams that want simple, guided delegation with almost no setup.
        </p>
      </div>
    </section>
  );
}
