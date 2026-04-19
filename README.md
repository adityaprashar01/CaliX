# CaliX

**India's first digital calisthenics platform for children.** Build strength, balance, and flexibility through guided quests, skill trees, and AI-powered encouragement.

## Quickstart

```bash
git clone git@github.com:<you>/CaliX.git && cd CaliX
cp .env.example .env.local   # fill in values from Supabase/OpenRouter/PostHog
pnpm install
pnpm db:migrate
pnpm dev                     # http://localhost:3000
```

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind 4 · shadcn/ui · Framer Motion · Prisma · Supabase (Auth + Postgres) · OpenRouter AI · PostHog · Vercel

## Docs

- [Architecture](docs/ARCHITECTURE.md) — data model, folder structure, service map, auth flow
- [Runbook](docs/RUNBOOK.md) — local setup, env vars, common commands, troubleshooting
- [Deployment](docs/DEPLOYMENT.md) — Vercel + Supabase production setup
- [Specs](specs/README.md) — EARS notation primer and 4-phase workflow

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm typecheck` | TypeScript check |
| `pnpm lint` | ESLint (zero warnings) |
| `pnpm test` | Vitest unit + integration |
| `pnpm e2e` | Playwright end-to-end |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:seed` | Seed dev data |
| `pnpm db:seed:demo` | Seed demo users (Priya + Aarav) |

## License

Private — all rights reserved.
