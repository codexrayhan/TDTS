# Roadmap

This document outlines planned features and improvements.

## v0.4 — Testing & Quality (next)

- [ ] **Vitest** unit tests for API routes (auth, tasks, AI)
- [ ] **React Testing Library** tests for key components (AIRecommendationPanel, KanbanBoard, MetricsRow)
- [ ] **Playwright** E2E tests for critical flows (login → create task → sign out)
- [ ] **MSW** for mocking API in component tests
- [ ] Investigate and fix any reproducible Radix Tooltip warning before upgrading packages
- [ ] Bundle analysis with `vite-bundle-visualizer`

## v0.5 — Real-time & Collaboration

- [ ] WebSocket integration (Socket.io) for live task updates
- [ ] Online presence indicators (green dot on avatars)
- [ ] Task comments thread
- [ ] @mention notifications in comments
- [ ] Real-time Kanban updates when teammate moves a card

## v0.6 — Productivity

- [ ] **Bulk task CSV import** with column mapping
- [ ] **Task templates** — save and reuse common task structures
- [ ] **Recurring tasks** — daily/weekly/monthly auto-creation
- [ ] **Time tracking** — start/stop timer per task
- [ ] **Subtask dependencies** — block until prerequisite done
- [ ] **Calendar view** — month/week grid with deadlines

## v0.7 — Integrations

- [ ] **Slack notifications** — task assigned, deadline approaching, completed
- [ ] **Email notifications** — via Resend / SendGrid
- [ ] **GitHub integration** — link tasks to PRs/issues
- [ ] **Google Calendar sync** — push deadlines
- [ ] **Microsoft Teams** bot

## v0.8 — Advanced AI

- [ ] **Streaming responses** — progressively reveal recommendations
- [ ] **Multi-model routing** — GPT-4o-mini for economical scoring, larger models for complex cases
- [ ] **AI task breakdown** — auto-generate subtasks from a parent task
- [ ] **AI workload prediction** — forecast when current tasks will complete
- [ ] **AI deadline negotiation** — suggest realistic deadlines based on history
- [ ] **Custom model strategy** — evaluate fine-tuning or retrieval using workspace history

## v0.9 — Enterprise

- [ ] **Multi-tenant architecture** — proper workspace isolation
- [ ] **SSO** — SAML 2.0, OIDC, Google Workspace, Microsoft Entra
- [ ] **Audit log** — track who did what, when
- [ ] **Role-based permissions matrix** (currently hardcoded)
- [ ] **Custom roles** — admin can create roles with specific permissions
- [ ] **SCIM provisioning** — auto-sync users from IdP
- [ ] **Data export** — GDPR-supporting user data export tooling

## v1.0 — Production Hardening

- [ ] **PostgreSQL migration** guide + tested production migration path
- [ ] **Redis** for session/rate-limit infrastructure where needed
- [ ] **Rate limiting** on auth endpoints
- [ ] **CSRF review/protection** appropriate to the chosen auth transport
- [ ] **Helmet** for security headers
- [ ] **Sentry** for error tracking
- [ ] **PostHog** for product analytics
- [ ] **Status page** with uptime monitoring
- [ ] **Backup strategy** — automated DB backups
- [ ] **Load testing** with k6

## Long-term

- [ ] **Mobile app** — React Native
- [ ] **Desktop app** — Tauri
- [ ] **Browser extension** — create task from any page
- [ ] **Public API** with OAuth for third-party integrations
- [ ] **Webhooks** — outgoing events for custom integrations
- [ ] **Marketplace** — community-built plugins

## Contributing to the roadmap

Have an idea? [Open a discussion](../../discussions) or [submit a feature request](../../issues/new?template=feature_request.md).
