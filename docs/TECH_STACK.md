# TDTS Tech Stack Reference

This single-page reference lists every package declared in `package.json`, what it does, where TDTS uses it, and why it is part of the stack.

## Runtime dependencies

| Package | Version | What it does | Where used | Why TDTS uses it |
|---|---:|---|---|---|
| `@emotion/react` | 11.14.0 | CSS-in-JS runtime | AstraUI styling dependency | Supports AstraUI/Emotion rendering |
| `@emotion/styled` | 11.14.1 | Styled-component helper | AstraUI styling dependency | Supports AstraUI styled primitives |
| `@figma/astraui` | 1.0.0 | Theme and UI primitives | App theme/provider and Astra controls | Keeps UI aligned with the Figma/Astra design language |
| `@figma/astraui-kit` | 0.1.3 | Design-token package | Design-system token integration | Preserves Astra token compatibility |
| `@radix-ui/react-accordion` | 1.2.11 | Accessible accordion primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-alert-dialog` | 1.1.14 | Accessible alert dialog primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-aspect-ratio` | 1.1.7 | Accessible aspect ratio primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-avatar` | 1.1.10 | Accessible avatar primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-checkbox` | 1.3.2 | Accessible checkbox primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-collapsible` | 1.1.11 | Accessible collapsible primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-context-menu` | 2.2.15 | Accessible context menu primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-dialog` | 1.1.14 | Accessible dialog primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-dropdown-menu` | 2.1.15 | Accessible dropdown menu primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-hover-card` | 1.1.14 | Accessible hover card primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-label` | 2.1.7 | Accessible label primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-menubar` | 1.1.15 | Accessible menubar primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-navigation-menu` | 1.2.13 | Accessible navigation menu primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-popover` | 1.1.14 | Accessible popover primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-progress` | 1.1.7 | Accessible progress primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-radio-group` | 1.3.7 | Accessible radio group primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-scroll-area` | 1.2.9 | Accessible scroll area primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-select` | 2.2.5 | Accessible select primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-separator` | 1.1.7 | Accessible separator primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-slider` | 1.3.5 | Accessible slider primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-slot` | 1.2.3 | Accessible slot primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-switch` | 1.2.5 | Accessible switch primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-tabs` | 1.1.12 | Accessible tabs primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-toggle` | 1.1.9 | Accessible toggle primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-toggle-group` | 1.1.10 | Accessible toggle group primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `@radix-ui/react-tooltip` | 1.2.7 | Accessible tooltip primitive | src/app/components/ui/ | shadcn/ui foundation with keyboard/ARIA behavior |
| `class-variance-authority` | 0.7.1 | Variant class composition | shadcn component variants | Keeps variant APIs predictable |
| `clsx` | 2.1.1 | Conditional class utility | src/app/components/ui/utils.ts | Small ergonomic class combiner |
| `cmdk` | 1.1.1 | Command menu engine | CommandPalette.tsx | Accessible Cmd/Ctrl+K workflow |
| `date-fns` | 3.6.0 | Date utilities | Calendar and due-date formatting | Modular date helpers |
| `embla-carousel-react` | 8.6.0 | Carousel engine | shadcn carousel primitive | Lightweight accessible carousel base |
| `input-otp` | 1.4.2 | OTP input primitive | shadcn input-otp component | Accessible segmented code entry |
| `lucide-react` | 0.487.0 | Icon library | Navigation, cards, actions | Consistent SVG icon system |
| `motion` | 12.23.24 | Animation library | Health ring, match ring, hover/loading motion | Declarative performant React animation |
| `react` | 18.3.1 | UI framework | Entire frontend | Mature ecosystem and component model |
| `react-day-picker` | 8.10.1 | Calendar/date picker | Due-date popovers | Flexible date-selection UI |
| `react-dnd` | 16.0.1 | Drag/drop state engine | Kanban board | Flexible DnD primitives |
| `react-dnd-html5-backend` | 16.0.1 | HTML5 DnD backend | Root DndProvider | Browser drag/drop backend |
| `react-dom` | 18.3.1 | DOM renderer | src/main.tsx | Standard React browser runtime |
| `react-hook-form` | 7.55.0 | Form state management | Task/settings/profile forms | Low-rerender form handling |
| `react-popper` | 2.3.0 | Floating-element positioning | Existing component dependency | Robust anchored positioning |
| `react-resizable-panels` | 2.1.7 | Resizable panel layout | Desktop app shell/sidebar | Supports collapsible/resizable layout |
| `react-responsive-masonry` | 2.7.1 | Responsive masonry layout | Available UI dependency | Supports card/media masonry layouts |
| `react-router` | 7.13.0 | Routing package | Installed but intentionally unused | Compatibility with dependency set; TDTS uses state routing |
| `react-slick` | 0.31.0 | Slider/carousel component | Available UI dependency | Compatibility with imported UI patterns |
| `recharts` | 2.15.2 | Chart library | Gantt and performance charts | Composable React charting |
| `sonner` | 2.0.3 | Toast system | Global feedback | Stable-ID deduplication and concise API |
| `tailwind-merge` | 3.2.0 | Tailwind class conflict resolver | ui/utils.ts | Avoids conflicting utility classes |
| `tw-animate-css` | 1.3.8 | Animation utilities | Tailwind CSS entry | Reusable animation classes |
| `vaul` | 1.1.2 | Drawer primitive | Mobile navigation | Touch-friendly drawer behavior |
| `@prisma/client` | 6.16.2 | Generated ORM client | Server routes and seed | Typed database access |
| `bcryptjs` | 3.0.2 | Password hashing | Authentication and seed | Portable bcrypt implementation |
| `concurrently` | 9.2.1 | Parallel script runner | npm run dev:full | Runs frontend and standalone API together |
| `cors` | 2.8.5 | CORS middleware | server/app.ts | Supports split frontend/backend deployments |
| `express` | 5.1.0 | HTTP server | server/app.ts and server/index.ts | Small conventional API layer |
| `jsonwebtoken` | 9.0.2 | JWT implementation | server/auth.ts | Bearer-token session auth |
| `openai` | 5.20.3 | OpenAI SDK | server/routes/ai.routes.ts | Official GPT-4o-mini integration |
| `prisma` | 6.16.2 | Prisma CLI/tooling | Migrations, generate, Studio | Schema-driven DB workflow |
| `tsx` | 4.20.5 | TypeScript runtime | Server and seed scripts | Runs TS directly without precompile |
| `zod` | 3.25.76 | Runtime schema validation | API inputs and AI JSON | Type-friendly validation |

## Development dependencies

| Package | Version | What it does | Where used | Why TDTS uses it |
|---|---:|---|---|---|
| `@tailwindcss/vite` | 4.1.12 | Tailwind v4 Vite integration | vite.config.ts | Direct Vite integration without PostCSS wiring |
| `@types/react` | 18.3.18 | React type declarations | TypeScript compiler | Typed React APIs |
| `@types/react-dom` | 18.3.5 | React DOM type declarations | TypeScript compiler | Typed DOM renderer APIs |
| `@vitejs/plugin-react` | 4.7.0 | Vite React plugin | vite.config.ts | React transforms and Fast Refresh |
| `tailwindcss` | 4.1.12 | Utility CSS engine | src/styles/tailwind.css | Token-friendly utility styling |
| `typescript` | 5.7.3 | Static type checker | Frontend/server/config | Strict typed development |
| `vite` | 6.3.5 | Dev server and bundler | vite.config.ts | Fast SPA build pipeline |
| `@typescript-eslint/eslint-plugin` | ^8.0.0 | TypeScript ESLint rules | .eslintrc.cjs | TS-specific lint diagnostics |
| `@typescript-eslint/parser` | ^8.0.0 | TypeScript parser for ESLint | .eslintrc.cjs | Lets ESLint parse TS/TSX |
| `eslint` | ^8.57.0 | Lint engine | npm run lint | Static code-quality checks |
| `eslint-config-prettier` | ^9.1.0 | ESLint/Prettier compatibility | .eslintrc.cjs | Disables formatting-conflicting lint rules |
| `eslint-plugin-react-hooks` | ^4.6.2 | React Hooks lint rules | .eslintrc.cjs | Detects invalid hook usage |
| `eslint-plugin-react-refresh` | ^0.4.0 | React Refresh export checks | .eslintrc.cjs | Protects Vite Fast Refresh behavior |
| `prettier` | ^3.3.0 | Formatter | npm run format | Deterministic repo formatting |

## Architectural notes

- TDTS deliberately does **not** use `react-router` for application navigation. `src/app/App.tsx` and `ScreenId` own routing state.
- Vite development mounts the Express app directly through `server/middleware.ts`, so `/api/*` works on the same origin.
- A standalone Express process is available through `npm run server:start`; production static assets should be served by a web server such as nginx or a frontend host.
- SQLite is the current Prisma provider. PostgreSQL requires changing the datasource provider and creating provider-appropriate migrations.
- OpenAI is optional. AI recommendations fall back to deterministic demo profiles when `OPENAI_API_KEY` is absent or a call fails.
- `vite.config.ts` manually splits React, Radix, charts, drag/drop, Motion, and calendar/date packages to keep browser bundles manageable.
- ESLint and Prettier are contributor tooling only; they do not change the runtime dependency graph.
