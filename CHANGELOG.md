# Changelog

All notable changes to TDTS are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GitHub Actions CI workflow (`.github/workflows/ci.yml`)
- ESLint + Prettier config
- Issue templates and PR template
- Comprehensive README with screenshots, API reference, and deployment guides
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`, `ROADMAP.md`
- LICENSE (MIT)
- VS Code workspace recommendations
- Tech-stack and deployment reference docs

### Changed

- README rewritten from scratch for GitHub collaboration
- Repository metadata and contributor scripts added to `package.json`

## [0.3.0] — 2026-09-15

### Added

- Express backend with Vite middleware integration
- Prisma + SQLite database with User, Employee, Task, Reward models
- JWT authentication (HS256, 7-day expiry) + bcrypt password hashing (10 rounds)
- OpenAI GPT-4o-mini integration for AI recommendations
- Deterministic fallback when `OPENAI_API_KEY` is absent
- AuthProvider context + `useAuth` hook
- API-backed task CRUD with persistence
- Loading skeletons on async screens
- Mock fallback mode for static builds
- Vite manual chunks for vendor splitting (React, Radix, Recharts, DnD, Motion, calendar)
- React.lazy + Suspense for heavy screens
- `vercel.json`, `netlify.toml`, `.env.example`
- Standalone server entry (`server/index.ts`)

### Changed

- Login/SignUp now hit real `/api/auth/*` endpoints
- Kanban drag-drop persists status changes to DB
- Task Management table reads from DB
- Leaderboard reads from DB

## [0.2.0] — 2026-09-15

### Added

- Command Palette (Cmd/Ctrl+K) with navigation and employee quick actions
- Theme persistence via localStorage
- Session persistence via localStorage
- Mobile responsive sidebar (Vaul Drawer below 1024px)
- Empty states for Files, ManageAdmins, Rewards
- Loading screen animation (pulse + shimmer)
- Toast deduplication via stable IDs

### Fixed

- React.forwardRef wrap on Button, Input, Textarea
- Health Score ring color now matches score (green/amber/red)
- Date input uses shadcn Calendar + Popover instead of three number fields
- Create Task submit now shows toast + navigates to Task Management
- Match Ring initial display is `—` instead of `0%` flash
- Kanban cards have hover lift + cursor-grab
- RewardsScreen typed-array length-narrowing bug

## [0.1.0] — 2026-09-15

### Added

- Initial TDTS prototype
- 25 screens with role-based access (Admin, Super Admin, Employee)
- React 18 + Vite 6 + Tailwind v4 + shadcn/ui + AstraUI
- AI Smart Delegation panel (hardcoded profiles)
- Project Health Score with animated SVG ring
- Kanban drag-drop (react-dnd)
- Gantt timeline (Recharts)
- Leaderboard
- Dark/light mode toggle
- Auth screens (Login, SignUp, Forgot, Reset, SSO)
- Onboarding tour
- Notification center
- Workspace switcher
- 48 shadcn/ui components
