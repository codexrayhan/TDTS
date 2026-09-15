# TDTS — Task Delegation & Tracking System

> A zero-clutter SaaS for delegating tasks intelligently, tracking them in real-time, and rewarding delivery. Built with React 18, Express, Prisma, and OpenAI.

![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![React](https://img.shields.io/badge/react-18.3-61dafb)
![Vite](https://img.shields.io/badge/vite-6.3-646cff)
![Prisma](https://img.shields.io/badge/prisma-6.16-2d3748)
![Status](https://img.shields.io/badge/status-active-success)

---

## 🚀 Quick Start for Teammates (5 minutes)

**You just cloned this repo? Run these 5 commands and you're in.**

```bash
# 1. Install dependencies
npm install

# 2. Approve required install scripts (one-time, prompted)
npm approve-scripts @tailwindcss/oxide esbuild @prisma/client prisma @prisma/engines
npm install

# 3. Set up environment file
cp .env.example .env          # On Windows: copy .env.example .env

# 4. Initialize database with seed data
npm run db:migrate && npm run db:seed

# 5. Start dev server
npm run dev
```

🌐 Open **http://localhost:5173** in your browser.

### 🔑 Demo Login Credentials

All three seeded accounts use the same password: **`demo1234`**

| Role | Email | What you can do |
|------|-------|-----------------|
| 👤 Admin | `arif@taskflow.io` | Full dashboard, create/delegate tasks, AI recommendations, leaderboards, settings |
| 👑 Super Admin | `kamrul@taskflow.io` | Company overview, all projects, manage admins, global leaderboard, role settings |
| 💼 Employee | `sumaiya@taskflow.io` | My tasks, files, performance charts, rewards, employee settings |

> 💡 You can also **sign up** with a new email — your account will be created in the database with a bcrypt-hashed password.

### ⚠️ First-time Setup Gotchas

**Windows users** — use `copy` instead of `cp`:
```powershell
copy .env.example .env
```

**If `npm install` shows warnings about install scripts** — that's expected. Just run the approve-scripts command above and reinstall.

**If `npm run db:migrate` fails** — make sure you're in the project root folder, and that `.env` file exists with `DATABASE_URL="file:./dev.db"`.

**If `npm run dev` shows "port 5173 in use"** — kill the process or use `npm run dev -- --port 5174`.

---

## 📸 Screenshots

> Replace these with actual screenshots after first deploy.

| Landing | Dashboard (Light) | Dashboard (Dark) | AI Delegation |
|---------|-------------------|------------------|---------------|
| ![](docs/screenshots/landing.png) | ![](docs/screenshots/dashboard-light.png) | ![](docs/screenshots/dashboard-dark.png) | ![](docs/screenshots/ai-recommendation.png) |
| Command Palette | Mobile (768px) | Kanban Board | Project Health |
|------------------|----------------|--------------|----------------|
| ![](docs/screenshots/command-palette.png) | ![](docs/screenshots/mobile.png) | ![](docs/screenshots/kanban.png) | ![](docs/screenshots/health-score.png) |

## 📋 Table of Contents

- [🚀 Quick Start for Teammates](#-quick-start-for-teammates-5-minutes)
- [🔑 Demo Login Credentials](#-demo-login-credentials)
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Project Structure](#-project-structure)
- [🔧 Detailed Setup](#-detailed-setup-reference)
- [📜 Available Scripts](#-available-scripts)
- [🗄 Database](#-database)
- [🔌 API Reference](#-api-reference)
- [🤖 AI Smart Delegation](#-ai-smart-delegation)
- [🎨 Design System](#-design-system)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📋 Roadmap](#-roadmap)
- [📝 Changelog](#-changelog)
- [📄 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)
- [📬 Support](#-support)

## ✨ Features

### Core

- **3 Role-based dashboards** — Admin, Super Admin, Employee — each with strict navigation scope
- **AI Smart Delegation** — OpenAI GPT-4o-mini recommends the best assignee with match score, reasons, and alternatives
- **Project Health Score** — animated SVG ring (green/amber/red) with 5-factor breakdown
- **Live Kanban** — drag-and-drop, persisted to SQLite via PATCH endpoint
- **Gantt timeline** — Recharts vertical bar chart with priority colors
- **Leaderboard** — points, completion rate, weekly trends
- **Command Palette** — Cmd/Ctrl+K to navigate, assign, toggle theme, sign out
- **Rewards & badges** — gamified delivery with points history
- **Dark/light mode** — persisted across reloads
- **Session persistence** — JWT-based, survives refresh
- **Mobile responsive** — sidebar collapses to Vaul drawer below 1024px
- **Toast notifications** — Sonner with deduplication via stable IDs

### Architecture

- **Frontend**: React 18 SPA, state-based router (no react-router)
- **Backend**: Express 5 with Vite dev middleware, standalone in prod
- **Database**: Prisma ORM + SQLite (dev), PostgreSQL-ready with a datasource switch for production
- **Auth**: JWT HS256 (7-day expiry) + bcrypt (10 rounds)
- **AI**: OpenAI GPT-4o-mini with deterministic fallback when key is absent
- **Build**: Vite 6 with manual chunks for vendor splitting

## 🛠 Tech Stack

### Frontend

| Purpose | Package | Version |
|---------|---------|---------|
| UI framework | `react` | 18.3.1 |
| Build tool | `vite` | 6.3.5 |
| Styling | `tailwindcss` | 4.1.12 |
| UI primitives | `@figma/astraui` + shadcn/ui (Radix) | 1.0.0 / pinned Radix packages |
| Icons | `lucide-react` | 0.487.0 |
| Animations | `motion` | 12.23.24 |
| Charts | `recharts` | 2.15.2 |
| Drag-drop | `react-dnd` + `react-dnd-html5-backend` | 16.0.1 |
| Forms | `react-hook-form` | 7.55.0 |
| Resizable panels | `react-resizable-panels` | 2.1.7 |
| Mobile drawer | `vaul` | 1.1.2 |
| Command palette | `cmdk` | 1.1.1 |
| Calendar | `react-day-picker` + `date-fns` | 8.10.1 / 3.6.0 |
| Toasts | `sonner` | 2.0.3 |
| Class utilities | `clsx` + `tailwind-merge` + `class-variance-authority` | 2.1.1 / 3.2.0 / 0.7.1 |

### Backend

| Purpose | Package | Version |
|---------|---------|---------|
| Server | `express` | 5.1.0 |
| ORM | `prisma` + `@prisma/client` | 6.16.2 |
| Database | SQLite (dev) / PostgreSQL (production option) | — |
| Auth | `jsonwebtoken` + `bcryptjs` | 9.0.2 / 3.0.2 |
| Validation | `zod` | 3.25.76 |
| AI | `openai` | 5.20.3 |
| CORS | `cors` | 2.8.5 |
| Dev runner | `tsx` + `concurrently` | 4.20.5 / 9.2.1 |

### Dev tooling

- TypeScript 5.7.3 (strict mode)
- ESLint 8 + TypeScript ESLint
- Prettier 3
- GitHub Actions CI

See [docs/TECH_STACK.md](docs/TECH_STACK.md) for a dependency-by-dependency reference.

## 📦 Project Structure

```text
tdts/
├── prisma/
│   ├── schema.prisma               # User, Employee, Task, Reward models
│   ├── migrations/                 # Auto-generated SQL
│   └── .env                        # DATABASE_URL (gitignored)
├── server/                         # Express backend
│   ├── app.ts                      # Express app (mounted via Vite middleware)
│   ├── index.ts                    # Standalone server entry (prod)
│   ├── middleware.ts               # Vite plugin for /api routing in dev
│   ├── db.ts                       # Prisma client singleton
│   ├── auth.ts                     # JWT sign/verify, bcrypt, requireAuth middleware
│   ├── env.ts                      # Typed env loader + SQLite URL resolver
│   ├── seed.ts                     # Seed script (3 users, 6 employees, 9 tasks)
│   └── routes/
│       ├── auth.routes.ts          # /api/auth/login, signup, logout
│       ├── tasks.routes.ts         # /api/tasks CRUD
│       ├── employees.routes.ts     # /api/employees
│       ├── rewards.routes.ts       # /api/rewards, /api/rewards/redeem
│       ├── leaderboard.routes.ts   # /api/leaderboard
│       └── ai.routes.ts            # /api/ai/recommend (OpenAI)
├── src/
│   ├── main.tsx                    # React entry
│   ├── imports.d.ts                # PNG/SVG type declarations
│   ├── app/
│   │   ├── App.tsx                 # Router + providers (Theme, DnD, Auth)
│   │   ├── components/
│   │   │   ├── ui/                 # 48 shadcn/ui components
│   │   │   ├── figma/              # ImageWithFallback
│   │   │   └── task-dashboard/
│   │   │       ├── AppShell.tsx    # Sidebar + topbar layout
│   │   │       ├── CommandPalette.tsx
│   │   │       ├── AIRecommendationPanel.tsx
│   │   │       ├── KanbanBoard.tsx
│   │   │       ├── GanttWidget.tsx
│   │   │       ├── MetricsRow.tsx  # Includes Project Health Score
│   │   │       ├── data.ts         # Mock fallback data + types
│   │   │       └── screens/        # 25 screen components
│   │   └── lib/
│   │       ├── api.ts              # fetch wrappers with Bearer token
│   │       └── auth.tsx            # AuthProvider + useAuth()
│   ├── styles/                     # Tailwind + theme tokens
│   └── imports/                    # Static assets (images, specs)
├── docs/                           # Screenshots, deployment, stack docs
├── .github/                        # Issue templates, PR template, CI
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── CHANGELOG.md
├── ROADMAP.md
├── vercel.json
├── netlify.toml
└── README.md
```

## 🔧 Detailed Setup (Reference)

> The Quick Start at the top of this README is enough for most teammates. This section goes deeper for first-time setup, troubleshooting, and production deployment.

### Prerequisites

- **Node.js** ≥ 18.0.0 (recommended: 20 LTS or 22 LTS)
- **npm** ≥ 9 (or `pnpm` ≥ 8, or `yarn` ≥ 4)
- **Git** ≥ 2.30
- **OpenAI API key** (optional — fallback mode works without it)

### 1. Clone & install

```bash
git clone https://github.com/smalakar-is-here/TDTS.git
cd tdts
npm install
```

If your package manager prompts to approve dependency build scripts, approve the Tailwind/esbuild/Prisma packages it lists:

```bash
npm approve-scripts @tailwindcss/oxide esbuild @prisma/client prisma @prisma/engines
npm install
```

Or with `pnpm`:

```bash
pnpm install
pnpm approve-builds
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```bash
# Frontend API URL (empty = demo/mock mode, "/api" = use backend)
VITE_API_URL=/api

# SQLite database
DATABASE_URL="file:./dev.db"

# JWT secret — CHANGE THIS IN PRODUCTION
JWT_SECRET="tdts-development-secret-change-me"

# OpenAI (optional — empty = deterministic fallback)
OPENAI_API_KEY=""

# Standalone server port
PORT=8787
```

### 3. Initialize the database

```bash
# Run the initial migration (creates prisma/dev.db)
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

Expected output:

```text
Seed complete: users=3, employees=6, tasks=9, rewards=8
```

### 4. Start the dev server

```bash
npm run dev
```

Open <http://localhost:5173> — the Vite dev server automatically mounts the Express API at `/api/*`.

### 5. Log in

Use any seeded account (password: `demo1234`):

| Role | Email |
|------|-------|
| Admin | `arif@taskflow.io` |
| Super Admin | `kamrul@taskflow.io` |
| Employee | `sumaiya@taskflow.io` |

Or sign up with a new email — your account will be created in the database with a bcrypt-hashed password.

## 📜 Available Scripts

```bash
npm run dev          # Start Vite dev server (frontend + API middleware)
npm run server       # Start standalone Express server in watch mode
npm run dev:full     # Run Vite + Express concurrently (alternative to dev)
npm run build        # TypeScript check + Vite production build → dist/
npm run preview      # Preview the production frontend build locally
npm run typecheck    # tsc -b only
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format supported files
npm run format:check # Prettier verification without writing
npm run db:migrate   # prisma migrate dev
npm run db:reset     # prisma migrate reset (wipes DB)
npm run db:seed      # Seed from server/seed.ts
npm run db:studio    # Open Prisma Studio GUI at http://localhost:5555
npm run server:start # Start standalone Express server once
```

## 🗄 Database

### Schema overview

```text
User        id, email (unique), passwordHash, name, role (ADMIN/SUPER_ADMIN/EMPLOYEE)
Employee    id, name, initials, title, workload (AVAILABLE/MODERATE/OVERLOADED), completionRate
Task        id, title, description, priority (LOW/MEDIUM/HIGH), status (BACKLOG/TODO/IN_PROGRESS/DONE),
            deadline, project, assigneeId, creatorId
Reward      id, userId, badgeName, points, earnedAt
```

### Switch to PostgreSQL (production)

1. Update `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Set `DATABASE_URL` in `.env`:

   ```bash
   DATABASE_URL="postgresql://user:password@host:5432/tdts?schema=public"
   ```

3. Create a fresh PostgreSQL migration history before production rollout. SQLite-generated SQL is not portable to PostgreSQL, so do not reuse the existing SQLite migration blindly. Follow your team's migration procedure, then run the seed script if appropriate.

### Prisma Studio

Browse and edit records in a GUI:

```bash
npm run db:studio
```

Opens at <http://localhost:5555>.

## 🔌 API Reference

Base URL: `http://localhost:5173/api` (dev) or `http://localhost:8787/api` (standalone server)

### Auth

| Method | Path | Body | Returns |
|--------|------|------|---------|
| POST | `/api/auth/login` | `{ email, password }` | `{ token, user: { id, name, email, role } }` |
| POST | `/api/auth/signup` | `{ name, email, password, role }` | `{ token, user }` |
| POST | `/api/auth/logout` | — | 204 |

### Tasks (auth required)

| Method | Path | Body | Returns |
|--------|------|------|---------|
| GET | `/api/tasks` | — | `Task[]` |
| POST | `/api/tasks` | `CreateTaskInput` | `Task` |
| PATCH | `/api/tasks/:id` | `Partial<CreateTaskInput>` | `Task` |
| DELETE | `/api/tasks/:id` | — | 204 |

### Other

| Method | Path | Body | Returns |
|--------|------|------|---------|
| GET | `/api/employees` | — | `Employee[]` |
| GET | `/api/leaderboard` | — | `LeaderboardEntry[]` |
| GET | `/api/rewards?userId=...` | — | `RewardRecord[]` |
| POST | `/api/rewards/redeem` | `{ rewardName, points }` | `{ ok, rewardName, points }` |
| POST | `/api/ai/recommend` | `{ taskId }` | `{ recommendations, source }` |
| GET | `/api/health` | — | `{ ok: true, service: "tdts-api" }` |

Protected routes require an `Authorization: Bearer <token>` header. See the route source for the exact authorization scope of each endpoint.

## 🤖 AI Smart Delegation

### How it works

1. Admin opens Create Task or Delegate Task screen.
2. Client calls `POST /api/ai/recommend` with the task ID.
3. Server loads task + employee context from the database.
4. If `OPENAI_API_KEY` is set:
   - Sends a structured prompt to GPT-4o-mini.
   - Receives JSON with score (0-100), reasons, and alternatives.
   - Validates the response with Zod.
   - Returns `{ recommendations, source: "openai" }`.
5. If the key is absent or the OpenAI call fails:
   - Falls back to deterministic TDTS recommendation profiles.
   - Returns `{ recommendations, source: "fallback" }`.

### Match Ring colors

| Score | Color | Status |
|-------|-------|--------|
| 90-100 | Green (`--success`) | Excellent match |
| 70-89 | Amber (`--warning`) | Good match |
| <70 | Red (`--danger`) | Not recommended |

### Configuring OpenAI

```bash
# In .env
OPENAI_API_KEY="sk-proj-..."

# Restart dev server
npm run dev
```

Use server logs and the `source` field in the API response to confirm whether a request used OpenAI or deterministic fallback mode.

## 🎨 Design System

### Color tokens (defined in `src/styles/theme.css`)

```css
/* Light */
--bg-page: #F8F9FA;
--bg-faint: #F3F3F5;
--surface-bg: #FFFFFF;
--brand-primary: #2563EB;
--success: #10B981;
--warning: #F59E0B;
--danger: #EF4444;

/* Dark */
--bg-page: oklch(0.18 0 0);
--bg-faint: oklch(0.22 0 0);
--surface-bg: oklch(0.205 0 0);
```

### Typography

- Primary font: **Inter** (loaded through `src/styles/fonts.css`)
- Numeric: tabular figures for KPI values

### Spacing scale

`xs` 4 / `sm` 8 / `md` 12 / `lg` 16 / `xl` 24 / `2xl` 32 / `3xl` 48 (px)

### Border radius

- Buttons: 6px
- Inputs: 6px
- Cards: 12px
- Badges/Avatars: 9999px

## 🧪 Testing

> Automated testing infrastructure is planned for the next quality-focused release. For now, use the manual checklist below, Prisma Studio, type checking, linting, and production builds.

### Manual QA Checklist (post-setup)

- [ ] `npm run dev` starts without errors
- [ ] `curl http://localhost:5173/api/health` returns a healthy JSON response
- [ ] Login as `arif@taskflow.io / demo1234` succeeds
- [ ] Dashboard shows the seeded Kanban state (BACKLOG: 2, TODO: 2, IN PROGRESS: 2, DONE: 3)
- [ ] Project Health Score shows 89% with amber status styling
- [ ] Create Task → AI panel returns OpenAI or deterministic fallback recommendations
- [ ] Submit task → toast appears → redirects to Task Management
- [ ] New task appears in Task Management
- [ ] Reload page → session restored (no re-login)
- [ ] Toggle dark mode → persists across reload
- [ ] Mobile (768px) → hamburger menu opens drawer
- [ ] Cmd/Ctrl+K → Command Palette opens with all options
- [ ] Sign out → protected API calls require authentication again

## 🚢 Deployment

### Vercel (recommended for the frontend)

1. Push to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add environment variables as needed:
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (optional)
   - `VITE_API_URL` pointing at the deployed API, or leave it empty for static demo mode
5. Deploy.

`vercel.json` handles SPA fallback for the frontend. The Express server in `server/` is not automatically converted into Vercel functions.

For the backend API on Vercel, you have two options:

**Option A — Serverless Functions**

- Adapt the Express route handlers into Vercel Functions under `api/`.
- See [docs/vercel-serverless.md](docs/vercel-serverless.md) for the recommended migration shape.

**Option B — Separate backend**

- Deploy the frontend to Vercel.
- Deploy the Express backend to Railway, Render, Fly.io, or another Node host.
- Set `VITE_API_URL` to that backend's `/api` URL.

### Netlify

```bash
npm run build
```

Connect the repository and Netlify will read `netlify.toml`. As with Vercel, deploy the Express API separately unless you adapt it to Netlify Functions. Static/demo mode works when the production `VITE_API_URL` is empty.

### Self-hosted (VPS)

The current standalone Express server serves the API only. Build and serve `dist/` with nginx (or another static server), and reverse-proxy `/api/` to the Node API:

```bash
git clone https://github.com/smalakar-is-here/TDTS.git
cd tdts
npm ci
npm run build
npm run server:start
```

Use a process manager such as PM2 if desired:

```bash
npm install -g pm2
pm2 start "npm run server:start" --name tdts-api
pm2 save
pm2 startup
```

See [docs/nginx.conf](docs/nginx.conf) for an example reverse-proxy/static-hosting configuration.

## 🤝 Contributing

Please read **[CONTRIBUTING.md](./CONTRIBUTING.md)** before opening a PR.

Quick rules:

1. Branch from `main`; use `feature/<short-name>` or `fix/<issue-number>-<short-name>`.
2. Run `npm run lint` and `npm run typecheck` before committing.
3. Use **conventional commits**: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
4. Keep PRs under 500 lines if practical; split larger changes.
5. Don't commit `.env`, `prisma/dev.db`, or `node_modules/` — they're gitignored.
6. If you add a screen, update the `ScreenId` union in `AppShell.tsx` and the router in `App.tsx`.
7. If you change Prisma schema, run `npm run db:migrate` and commit the migration files.

See **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** for community standards.

## 📋 Roadmap

See **[ROADMAP.md](./ROADMAP.md)** for planned features. Highlights:

- [ ] Vitest unit tests for API routes
- [ ] Playwright E2E tests for critical flows
- [ ] PostgreSQL migration guide
- [ ] Real-time presence (online indicators)
- [ ] Task comments thread
- [ ] CSV import for bulk task creation
- [ ] Slack/email notification integration

## 📝 Changelog

See **[CHANGELOG.md](./CHANGELOG.md)** for version history.

## 📄 License

MIT — see **[LICENSE](./LICENSE)**.

## 🙏 Acknowledgments

- **shadcn/ui** for the component primitives
- **Radix UI** for accessibility primitives
- **AstraUI** for the design kit
- **Recharts** for charting
- **Motion** for animations
- **Prisma** team for the database tooling
- **OpenAI** for GPT-4o-mini

## 📬 Support

- **Bug reports**: [Open an issue](../../issues/new?template=bug_report.md)
- **Feature requests**: [Open an issue](../../issues/new?template=feature_request.md)
- **Questions**: [Start a discussion](../../discussions)
- **Security**: email `noreply@tdts.dev` (do **not** open a public issue)

---

Made with ❤️ by the TDTS team.
