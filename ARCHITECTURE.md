# 🏗️ TDTS Architecture & Tech Stack Guide

> **Teammates, read this first.** This document explains what TDTS is, what tech we used, where each piece lives, and how everything fits together.

---

## 📋 What is TDTS?

**TDTS (Task Delegation & Tracking System)** is a SaaS web application that helps teams:

- **Delegate tasks intelligently** — AI recommends the best person for each task
- **Track work in real-time** — Kanban board, Gantt timeline, live updates
- **Reward delivery** — points, badges, leaderboards
- **Manage 3 roles** — Admin, Super Admin, Employee — each with their own dashboard

Think of it as a modern alternative to Asana/Trello, with AI-powered delegation built in.

---

## 🧱 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       USER'S BROWSER                         │
│                                                              │
│  React 18 SPA (Single Page Application)                     │
│  ├─ 25 screens (Landing, Dashboard, Create Task, etc.)       │
│  ├─ shadcn/ui components (Button, Dialog, Calendar, ...)    │
│  ├─ Tailwind CSS v4 styling                                  │
│  └─ State-based router (no react-router)                     │
│                                                              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              │ HTTP + JSON (Bearer Token auth)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    VITE DEV SERVER                           │
│                                                              │
│  In dev mode: Vite serves the React app AND mounts the      │
│  Express API at /api/* — so you only need `npm run dev`.    │
│                                                              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS BACKEND                            │
│                                                              │
│  server/app.ts — Express app setup                           │
│  server/routes/ — API endpoints:                            │
│  ├─ auth.routes.ts     (login, signup, logout)              │
│  ├─ tasks.routes.ts    (CRUD on tasks)                       │
│  ├─ employees.routes.ts (list employees)                    │
│  ├─ rewards.routes.ts  (rewards, redemption)               │
│  ├─ leaderboard.routes.ts                                    │
│  └─ ai.routes.ts       (AI recommendations)                 │
│                                                              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
┌───────────────────────────┐  ┌─────────────────────────────┐
│   SQLite Database         │  │   OpenAI API               │
│   (via Prisma ORM)        │  │   (gpt-4o-mini)            │
│                           │  │                             │
│   Tables:                 │  │   Called from:              │
│   - User                  │  │   server/routes/ai.routes.ts│
│   - Employee              │  │                             │
│   - Task                  │  │   Fallback: if no API key, │
│   - Reward                │  │   uses hardcoded scores    │
│                           │  │   from data.ts             │
└───────────────────────────┘  └─────────────────────────────┘
```

---

## 🛠️ Tech Stack — What's Used & Why

### Frontend (what runs in the browser)

| Tech | Version | Used For | Where in the Code |
|------|---------|----------|-------------------|
| **React** | 18.3.1 | UI framework — components, hooks | `src/app/components/` |
| **Vite** | 6.3.5 | Build tool + dev server | `vite.config.ts` |
| **TypeScript** | 5.7.3 | Type safety | `.ts` / `.tsx` files everywhere |
| **Tailwind CSS** | 4.1.12 | Utility-first styling | `src/styles/` + all className="..." |
| **shadcn/ui** | latest | 48 pre-built UI components (Button, Dialog, etc.) | `src/app/components/ui/` |
| **Radix UI** | latest | Accessibility primitives underneath shadcn | (used internally by shadcn) |
| **AstraUI** | 1.0.0 | Theme provider + some primitives | `ThemeProvider` in `App.tsx` |
| **lucide-react** | 0.487.0 | Icons (Sun, Moon, Menu, etc.) | Imported across screens |
| **motion** | 12.23.24 | Animations (ring count-up, card hover) | `AIRecommendationPanel`, `MetricsRow` |
| **recharts** | 2.15.2 | Charts (Gantt timeline, performance trends) | `GanttWidget.tsx`, `MyPerformanceScreen.tsx` |
| **react-dnd** | 16.0.1 | Drag-and-drop for Kanban cards | `KanbanBoard.tsx` |
| **react-hook-form** | 7.55.0 | Form handling (login, create task) | `CreateTaskScreen.tsx` |
| **react-day-picker** | 8.10.1 | Calendar for date pickers | `CreateTaskScreen.tsx` |
| **date-fns** | 3.6.0 | Date formatting | Various |
| **vaul** | 1.1.2 | Mobile drawer (hamburger menu) | `AppShell.tsx` |
| **cmdk** | 1.1.1 | Command palette (Ctrl+K) | `CommandPalette.tsx` |
| **sonner** | 2.0.3 | Toast notifications | Throughout |
| **clsx + tailwind-merge** | latest | className utilities | `cn()` in `utils.ts` |

### Backend (what runs on the server)

| Tech | Version | Used For | Where in the Code |
|------|---------|----------|-------------------|
| **Express** | 5.1.0 | HTTP server + routing | `server/app.ts`, `server/routes/` |
| **TypeScript** | 5.7.3 | Same as frontend — full type safety | `server/**/*.ts` |
| **tsx** | 4.20.5 | Run TS directly in dev (no build step) | `npm run server` |
| **cors** | 2.8.5 | Cross-origin requests | `server/app.ts` |

### Database

| Tech | Version | Used For | Where in the Code |
|------|---------|----------|-------------------|
| **Prisma** | 6.16.2 | ORM — type-safe DB queries | `prisma/schema.prisma`, `server/db.ts` |
| **@prisma/client** | 6.16.2 | The actual DB client | Imported in routes |
| **SQLite** | built-in | Local file-based database (`prisma/dev.db`) | Created on `npm run db:migrate` |

**Schema** (defined in `prisma/schema.prisma`):

```
User        → id, email, passwordHash, name, role (ADMIN/SUPER_ADMIN/EMPLOYEE)
Employee    → id, name, initials, title, workload, completionRate
Task        → id, title, description, priority, status, deadline, project,
              assigneeId → Employee, creatorId → User
Reward      → id, userId, badgeName, points, earnedAt
```

### Authentication & Security

| Tech | Version | Used For | Where in the Code |
|------|---------|----------|-------------------|
| **jsonwebtoken (JWT)** | 9.0.2 | Stateless auth tokens (7-day expiry) | `server/auth.ts` |
| **bcryptjs** | 3.0.2 | Password hashing (10 rounds) | `server/auth.ts` |
| **zod** | 3.25.76 | Request body validation | `server/routes/*.ts` |

### AI Integration

| Tech | Version | Used For | Where in the Code |
|------|---------|----------|-------------------|
| **openai** (Node SDK) | 5.20.3 | Calls GPT-4o-mini for task recommendations | `server/routes/ai.routes.ts` |

**How it works:**
1. Admin opens Create Task screen → AI panel loads
2. Client calls `POST /api/ai/recommend` with the task ID
3. Server loads the task + all employees from DB
4. If `OPENAI_API_KEY` is set → calls GPT-4o-mini
5. If no key → falls back to hardcoded scores in `data.ts` (`aiProfiles`)
6. Returns ranked list of employees with scores + reasons

### Dev Tooling

| Tech | Version | Used For |
|------|---------|----------|
| **ESLint** | 8.x | Code linting |
| **Prettier** | 3.3.x | Code formatting |
| **concurrently** | 9.2.1 | Run Vite + Express together (alt to dev middleware) |
| **GitHub Actions** | — | CI (lint + typecheck + build on every PR) |

---

## 📁 Folder Structure — What Lives Where

```
tdts/
│
├── prisma/                     # 📊 DATABASE
│   ├── schema.prisma           #   ← Database models (User, Employee, Task, Reward)
│   ├── migrations/             #   ← Auto-generated SQL (don't edit by hand)
│   ├── .env                    #   ← DATABASE_URL (gitignored)
│   └── dev.db                  #   ← SQLite file (gitignored, created on migrate)
│
├── server/                     # 🖥️ BACKEND (Express + TypeScript)
│   ├── app.ts                  #   ← Express app setup (cors, json parser, routes)
│   ├── index.ts                #   ← Standalone server entry (for prod)
│   ├── middleware.ts           #   ← Vite plugin that mounts API in dev
│   ├── db.ts                   #   ← Prisma client singleton
│   ├── env.ts                  #   ← Env vars + DB URL resolver
│   ├── auth.ts                 #   ← JWT + bcrypt + requireAuth middleware
│   ├── seed.ts                 #   ← Seeds DB with sample data (3 users, 6 employees, 9 tasks)
│   ├── shims.d.ts              #   ← Type declarations for server-side
│   └── routes/                 #   ← API endpoints
│       ├── auth.routes.ts      #       POST /api/auth/login, /signup, /logout
│       ├── tasks.routes.ts     #       GET/POST/PATCH/DELETE /api/tasks
│       ├── employees.routes.ts #       GET /api/employees
│       ├── rewards.routes.ts   #       GET /api/rewards, POST /api/rewards/redeem
│       ├── leaderboard.routes.ts #     GET /api/leaderboard
│       └── ai.routes.ts        #       POST /api/ai/recommend
│
├── src/                        # 🎨 FRONTEND (React + TypeScript)
│   ├── main.tsx                #   ← React entry point
│   ├── imports.d.ts            #   ← Type declarations for PNG/SVG imports
│   │
│   ├── app/
│   │   ├── App.tsx             #   ← Main router + providers
│   │   ├── components/
│   │   │   ├── ui/             #   ← 48 shadcn/ui components (don't edit)
│   │   │   ├── figma/          #   ← ImageWithFallback helper
│   │   │   └── task-dashboard/ #   ← Our custom components
│   │   │       ├── AppShell.tsx        ← Sidebar + topbar layout
│   │   │       ├── CommandPalette.tsx   ← Ctrl+K palette
│   │   │       ├── AIRecommendationPanel.tsx ← AI panel
│   │   │       ├── KanbanBoard.tsx     ← Drag-drop board
│   │   │       ├── GanttWidget.tsx     ← Timeline chart
│   │   │       ├── MetricsRow.tsx     ← KPI cards + Health Score
│   │   │       ├── data.ts            ← Mock fallback data + types
│   │   │       └── screens/           ← 25 screen components
│   │   │           ├── LandingScreen.tsx
│   │   │           ├── LoginScreen.tsx
│   │   │           ├── DashboardScreen.tsx
│   │   │           ├── CreateTaskScreen.tsx
│   │   │           └── ... (21 more)
│   │   └── lib/
│   │       ├── api.ts          #   ← fetch() wrappers for all API endpoints
│   │       └── auth.tsx         #   ← AuthProvider + useAuth() hook
│   │
│   ├── imports/                # 📦 STATIC ASSETS
│   │   ├── image.png            #   ← Landing page hero image
│   │   └── pasted_text/         #   ← Original design specs (read-only reference)
│   │
│   └── styles/                  # 🎨 STYLING
│       ├── index.css            #   ← Imports all other CSS files
│       ├── tailwind.css         #   ← Tailwind setup
│       ├── theme.css            #   ← Color tokens (light + dark mode)
│       ├── globals.css          #   ← Reset + base styles
│       └── fonts.css            #   ← Inter font
│
├── docs/                       # 📚 DOCUMENTATION
│   ├── TECH_STACK.md           #   ← Detailed tech list
│   ├── nginx.conf              #   ← Nginx reverse proxy config (for self-hosting)
│   ├── vercel-serverless.md    #   ← How to deploy backend as serverless functions
│   └── screenshots/            #   ← README images (add your screenshots here)
│
├── .github/                    # 🐙 GITHUB AUTOMATION
│   ├── ISSUE_TEMPLATE/         #   ← Bug report + feature request templates
│   ├── workflows/
│   │   ├── ci.yml              #   ← Lint + Typecheck + Build on every PR
│   │   └── stale.yml           #   ← Auto-close stale issues/PRs after 30 days
│   ├── pull_request_template.md
│   └── FUNDING.yml             #   ← Sponsorship (commented out)
│
├── .vscode/                    # 💻 VS CODE WORKSPACE
│   ├── extensions.json         #   ← Recommended extensions
│   └── settings.json           #   ← Format on save, ESLint auto-fix
│
├── .env.example                # 🔑 ENV TEMPLATE (commit this)
├── .env                        # 🔑 ACTUAL ENV (gitignored, you create from example)
├── .gitignore                  #   ← What Git should ignore
├── .eslintrc.cjs               #   ← ESLint config
├── .prettierrc                 #   ← Prettier config
│
├── package.json                # 📦 DEPENDENCIES + SCRIPTS
├── package-lock.json           # 📦 Lockfile (commit this after first install)
├── vite.config.ts              # ⚙️ Vite config (chunks, aliases, dev middleware)
├── tsconfig.json               # ⚙️ TypeScript config
├── vercel.json                 # ⚙️ Vercel deploy config
├── netlify.toml                # ⚙️ Netlify deploy config
│
├── README.md                   # 📖 Main docs (start here!)
├── CONTRIBUTING.md             # 📖 How to contribute
├── CHANGELOG.md                # 📖 Version history
├── ROADMAP.md                  # 📖 Future plans
├── CODE_OF_CONDUCT.md          # 📖 Community rules
├── LICENSE                     # 📖 MIT License
└── ARCHITECTURE.md             # 📖 THIS FILE
```

---

## 🔄 How Data Flows (Example: Creating a Task)

Let's trace what happens when an admin creates a new task:

```
1. USER ACTION
   Admin clicks "Create Task" button
   Fills form: title="Fix login bug", assignee=Rafiq
   Clicks "Create Task" submit button

        ↓

2. FRONTEND (src/app/components/task-dashboard/screens/CreateTaskScreen.tsx)
   • Validates form fields
   • Calls createTask() from src/app/lib/api.ts
   • Shows toast: "Creating..."

        ↓

3. API CLIENT (src/app/lib/api.ts → createTask function)
   • Sends POST /api/tasks
   • Includes Authorization: Bearer <token> header
   • Body: { title, assigneeId, deadline, ... }

        ↓

4. EXPRESS ROUTE (server/routes/tasks.routes.ts)
   • requireAuth middleware verifies JWT
   • zod validates request body
   • Calls db.task.create() via Prisma

        ↓

5. DATABASE (prisma/dev.db via Prisma)
   • INSERT INTO Task (...)
   • Returns the new task row

        ↓

6. RESPONSE
   • Server returns 201 Created + task object
   • Frontend shows success toast
   • Navigates to Task Management screen
   • Task appears in the table

   ✅ Done!
```

---

## 🎨 Design System (Quick Reference)

### Colors (defined in `src/styles/theme.css`)

```
Light mode:
  --bg-page: #F8F9FA       (page background)
  --surface-bg: #FFFFFF    (card background)
  --brand-primary: #2563EB (royal blue — buttons, links)
  --success: #10B981       (green — verified, completed)
  --warning: #F59E0B       (amber — moderate risk)
  --danger: #EF4444        (red — errors, overdue)

Dark mode:
  --bg-page: oklch(0.18 0 0)  (dark gray)
  --surface-bg: oklch(0.205 0 0)
  --brand-primary: #2563EB    (same blue)
```

### Typography
- **Font**: Inter (loaded from Google Fonts CDN, see `src/styles/fonts.css`)
- **Numeric tabular figures** for KPI values

### Spacing Scale
`xs` 4px / `sm` 8px / `md` 12px / `lg` 16px / `xl` 24px / `2xl` 32px / `3xl` 48px

### Border Radius
- Buttons: 6px
- Inputs: 6px
- Cards: 12px
- Badges/Avatars: 9999px (pill)

---

## 🔑 Authentication Flow

```
1. User submits login form (email + password)
        ↓
2. Frontend calls POST /api/auth/login
        ↓
3. Server (auth.routes.ts):
   • Looks up user by email in DB
   • Verifies password with bcrypt.compare()
   • If valid → creates JWT with { id, name, email, role }, 7-day expiry
   • Returns { token, user }
        ↓
4. Frontend (auth.tsx → AuthProvider):
   • Saves token to localStorage as "tdts-token"
   • Saves user object to localStorage as "tdts-user"
   • Updates context state
        ↓
5. All future API calls:
   • api.ts automatically adds "Authorization: Bearer <token>" header
   • requireAuth middleware on server verifies JWT
   • If expired → 401 response → frontend logs out user
        ↓

Logout:
   • Frontend removes token + user from localStorage
   • Calls POST /api/auth/logout (server-side cleanup if needed)
   • Redirects to landing page
```

---

## 🤖 AI Recommendation Flow

```
1. Admin opens Create Task screen
        ↓
2. AIRecommendationPanel mounts
   • Calls getAIRecommendations(taskId) from api.ts
   • Shows "AI is analyzing..." loading state for ~800ms
        ↓
3. Server (ai.routes.ts):
   • Loads task from DB
   • Loads all 6 employees from DB (with workload, completion rate)
   • Checks OPENAI_API_KEY env var:
     ├── If set → calls OpenAI GPT-4o-mini
     │   • Sends structured prompt
     │   • Gets back JSON with scores + reasons per employee
     │   • Validates with zod
     │   • Returns { source: "openai", recommendations: [...] }
     │
     └── If not set → uses hardcoded aiProfiles from data.ts
         • Returns { source: "fallback", recommendations: [...] }
        ↓
4. Frontend renders:
   • Match ring (animated count-up from 0 → score)
   • Top recommendation (name, score, reasons)
   • Alternatives (3 other employees with scores)
   • "Assign Recommended" button
```

---

## 🚦 Common Tasks for Teammates

### "I want to add a new screen"

1. Create `src/app/components/task-dashboard/screens/<Name>Screen.tsx`
2. Add the screen ID to `ScreenId` union in `AppShell.tsx`
3. Add it to `ROLE_SCREENS` for the appropriate role
4. Wire it in `renderScreen()` switch in `App.tsx`
5. If lazy-loaded, add to the `React.lazy` map

### "I want to add a new API endpoint"

1. Create `server/routes/<name>.routes.ts`
2. Export a `Router` instance
3. Use `zod` for request body validation
4. Apply `requireAuth` middleware if it needs auth
5. Mount in `server/app.ts`: `app.use("/api/<name>", <name>Routes)`
6. Add a client wrapper in `src/app/lib/api.ts`
7. Document it in README's API Reference table

### "I want to modify the database schema"

1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate -- --name <descriptive-name>`
3. **Commit the new migration files in `prisma/migrations/`** — they're tracked in git
4. Update `server/seed.ts` if seed data is affected
5. Update API routes if models changed

### "I want to add a new shadcn/ui component"

1. Run `npx shadcn@latest add <component-name>` (e.g. `npx shadcn@latest add toast`)
2. It'll create a new file in `src/app/components/ui/`
3. Import and use it in your screens

### "I want to change colors"

1. Edit `src/styles/theme.css`
2. Update the CSS variables in `:root` (light mode) and `.dark` (dark mode)
3. Don't hardcode colors in components — always use `var(--brand-primary)` etc.

### "I want to debug a database issue"

1. Run `npm run db:studio` — opens Prisma Studio at http://localhost:5555
2. Browse and edit records in a GUI
3. Or directly inspect the SQLite file: `prisma/dev.db`

---

## 🧪 Testing (Currently Manual)

We don't have automated tests yet — it's on the roadmap. For now:

1. Follow the **Manual QA Checklist** in README
2. Use Prisma Studio to verify DB state changes
3. Check the browser console for warnings/errors

**Known issue**: Radix Tooltip shows an infinite-loop warning in React 18 — it's cosmetic and doesn't break functionality.

---

## 🚢 Deployment Options

### Vercel (recommended for frontend)
- Frontend: auto-detected (Vite build → `dist/`)
- Backend: either serverless functions or separate backend (see `docs/vercel-serverless.md`)

### Self-hosted (VPS)
- Run `npm run build` → produces `dist/`
- Run `node server/index.js` (or `npm run server:start`) — serves both API + static files
- Use nginx as reverse proxy (see `docs/nginx.conf`)
- Use pm2 to keep the process alive

### Netlify (frontend only)
- Auto-detected via `netlify.toml`
- Backend needs separate hosting

---

## 📊 Bundle Size

- **Total gzipped**: 437 KB
- **Largest chunks**: `charts` (recharts, 108 KB) and `radix-vendor` (74 KB)
- **Lazy-loaded** (only when needed): `CreateTaskScreen`, `DelegateTaskScreen`, `AllProjectsScreen`, `ExportCsvScreen`, `MyPerformanceScreen`

---

## 🆘 Need Help?

- **Code questions** → ask in team chat
- **Bugs** → open an issue with the Bug Report template
- **Feature ideas** → open an issue with the Feature Request template
- **Setup problems** → check "First-time Setup Gotchas" in README
- **Database weirdness** → run `npm run db:reset` then `npm run db:seed`

---

**Still confused?** Ping me directly. Happy to walk through anything. 🚀
