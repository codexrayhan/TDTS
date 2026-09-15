# Adapting the TDTS API to Vercel Functions

The current TDTS backend is an Express application mounted into Vite during development and started as a standalone Node server in production. Vercel's static Vite deployment does not automatically turn that Express process into serverless functions.

## Recommended approach

1. Keep the frontend build unchanged.
2. Create a root `api/` directory.
3. Export Vercel-compatible handlers that reuse shared validation, auth, database, and service logic from `server/`.
4. Do not instantiate a new Prisma client on every request; reuse the existing singleton strategy where the serverless runtime permits it.
5. Set production environment variables in the Vercel project:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (optional)
6. Set `VITE_API_URL=/api` for the frontend build.
7. Use a production PostgreSQL database rather than SQLite because ephemeral/serverless filesystems are not appropriate for durable application data.

## Route mapping

A straightforward first pass maps the current endpoints one-to-one:

```text
/api/auth/login
/api/auth/signup
/api/auth/logout
/api/tasks
/api/tasks/[id]
/api/employees
/api/rewards
/api/rewards/redeem
/api/leaderboard
/api/ai/recommend
/api/health
```

## Before production

- Add rate limiting to auth endpoints.
- Validate CORS/origin policy for your deployed domains.
- Store a strong `JWT_SECRET` in Vercel project secrets.
- Confirm Prisma connection strategy for your PostgreSQL provider.
- Run integration tests against the deployed functions before switching the frontend away from demo mode.
