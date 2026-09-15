# Contributing to TDTS

Thanks for your interest in contributing! This guide will get you set up.

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9 (or pnpm ≥ 8)
- Git
- An OpenAI API key (optional, for AI features)

## First-time setup

1. Fork and clone the repo:

   ```bash
   git clone https://github.com/smalakar-is-here/TDTS.git
   cd tdts
   git remote add upstream https://github.com/smalakar-is-here/TDTS.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   If your package manager requires explicit build-script approval, approve the Tailwind/esbuild/Prisma packages it identifies. With pnpm, use `pnpm approve-builds`.

3. Set up env:

   ```bash
   cp .env.example .env
   # Edit .env if needed — defaults work for local dev
   ```

4. Initialize database:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Start dev:

   ```bash
   npm run dev
   ```

## Development workflow

### Branch naming

- `feature/<short-kebab-name>` — new feature (for example, `feature/task-comments`)
- `fix/<issue-number>-<short-name>` — bug fix (for example, `fix/123-kanban-drag-bug`)
- `docs/<short-name>` — documentation only
- `chore/<short-name>` — build, deps, config
- `refactor/<short-name>` — code restructuring, no behavior change

### Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation
- `style` — formatting, no code change
- `refactor` — code change that neither fixes a bug nor adds a feature
- `perf` — performance improvement
- `test` — adding tests
- `chore` — build, deps, tooling
- `ci` — CI/CD changes
- `revert` — revert a previous commit

**Examples:**

```text
feat(ai): add streaming response for recommendations
fix(auth): handle expired JWT gracefully
docs(readme): add deployment section
chore(deps): bump recharts to 2.15.3
```

### Before opening a PR

1. **Lint and typecheck pass locally:**

   ```bash
   npm run lint
   npm run typecheck
   ```

2. **Build succeeds:**

   ```bash
   npm run build
   ```

3. **Test the affected flows manually** — see the Manual QA Checklist in README.

4. **Update docs** if your change affects:
   - Public API
   - Setup steps
   - Environment variables
   - Database schema (run `npm run db:migrate` and commit the migration)

5. **Keep PR focused** — one feature/fix per PR. Split larger changes.

### PR template

A PR template is auto-applied from `.github/pull_request_template.md`.

### Code style

- TypeScript strict mode (already configured)
- Double quotes for strings
- Named exports for all modules except `App.tsx` (default export)
- 2-space indentation
- No trailing whitespace
- Files end with a newline
- Run `npm run format` to auto-format

### Adding a new screen

1. Create `src/app/components/task-dashboard/screens/<Name>Screen.tsx`.
2. Add the screen ID to `ScreenId` union in `AppShell.tsx`.
3. Add the screen to `ROLE_SCREENS` for the appropriate role.
4. Add a breadcrumb entry if applicable.
5. Wire it in the `renderScreen()` switch in `App.tsx`.
6. If lazy-loaded, add it to the `React.lazy` map.

### Modifying the database schema

1. Edit `prisma/schema.prisma`.
2. Run `npm run db:migrate -- --name <descriptive-name>`.
3. Commit the migration files in `prisma/migrations/`.
4. Update `server/seed.ts` if seed data is affected.
5. Update API routes if models changed.
6. Update `src/app/lib/api.ts` types.

### Adding a new API route

1. Create `server/routes/<name>.routes.ts`.
2. Export a `Router` instance.
3. Mount it in `server/app.ts`: `app.use("/api/<name>", <name>Routes)`.
4. Add Zod validation for request bodies where appropriate.
5. Add the endpoint to the README API Reference table.
6. Add the corresponding client wrapper in `src/app/lib/api.ts`.

## Reporting bugs

Use the bug report issue template. Include:

- Steps to reproduce
- Expected vs actual behavior
- Browser/OS/Node version
- Screenshots if applicable
- Console output (errors/warnings)

## Suggesting features

Use the feature request issue template. Explain:

- The problem you're trying to solve
- The proposed solution
- Alternatives considered

## Code of Conduct

Be respectful, inclusive, and constructive. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## License

By contributing, you agree your contributions will be licensed under the MIT License.
