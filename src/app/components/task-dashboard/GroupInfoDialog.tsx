import { useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

// ---- Edit these values to change what the popup shows ----
const PROJECT_NAME = "TDTS";
const GROUP_NAME = "কিংকর্তব্যবিমূঢ়";
const COURSE = "Web Programming Lab";
const YEAR = "2026";
const SEMESTER = ""; // optional, e.g. "Spring 2026" (hidden if empty)
const FACULTY = ""; // optional, e.g. "Course teacher name" (hidden if empty)
const REPO_URL = "https://github.com/codexrayhan/TDTS";

const PURPOSE =
  "TDTS was built as our Web Programming Lab project. It helps teams delegate tasks intelligently, track work in real time, and reward the people who deliver consistently.";

const MEMBERS = ["Md Rayhan Hossain", "Shwagatom Malakar", "Shushmita Paul Mou", "Pavel", "Thuha"];

const FEATURES = [
  "Login and signup with JWT authentication",
  "Role-based access: Admin, Super Admin, Employee",
  "Task management with full CRUD",
  "Live Kanban board with drag and drop",
  "AI smart delegation (fit score per employee)",
  "Leaderboard, rewards and project health score",
];

const TECH = ["React", "TypeScript", "Tailwind CSS", "react-dnd", "Express", "Prisma", "SQLite", "Zod", "JWT", "bcrypt", "OpenAI API"];

function Label({ children }: { children: string }) {
  return <div className="text-[10px] uppercase text-muted-foreground">{children}</div>;
}

export function GroupInfoDialog({ label = `Copyright © ${YEAR} ${PROJECT_NAME}` }: { label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-brand-primary/40 bg-brand-tertiary px-3 py-1 text-xs font-bold text-brand-primary shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-primary hover:text-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        aria-label="About our group and project"
        title="Click to see our group and project details"
      >
        <Info className="h-3.5 w-3.5" />
        {label}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>About {PROJECT_NAME}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 text-sm">
            <div>
              <Label>Group name</Label>
              <div className="mt-1 text-lg font-semibold">{GROUP_NAME}</div>
            </div>

            <div className="grid gap-3 rounded-xl bg-bg-faint p-4 sm:grid-cols-2">
              <div>
                <Label>Course</Label>
                <div className="mt-1 font-medium">{COURSE}</div>
              </div>
              <div>
                <Label>Year</Label>
                <div className="mt-1 font-medium">{SEMESTER ? `${SEMESTER}, ${YEAR}` : YEAR}</div>
              </div>
              {FACULTY && (
                <div className="sm:col-span-2">
                  <Label>Supervised by</Label>
                  <div className="mt-1 font-medium">{FACULTY}</div>
                </div>
              )}
            </div>

            <div>
              <div className="mb-1 text-sm font-semibold">Purpose</div>
              <p className="leading-6 text-muted-foreground">{PURPOSE}</p>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold">Team members</div>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {MEMBERS.map((name) => (
                  <li key={name} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold">Key features</div>
              <ul className="grid gap-1.5 text-muted-foreground">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold">Built with</div>
              <div className="flex flex-wrap gap-1.5">
                {TECH.map((item) => (
                  <span key={item} className="rounded-full bg-brand-tertiary px-2.5 py-0.5 text-xs font-medium text-brand-primary">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" asChild>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
            <Button className="bg-brand-primary text-white" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
