# CaliX Runbook

## Local Setup

### Prerequisites
- Node.js >= 20
- pnpm >= 9
- PostgreSQL 16 (via Supabase cloud)

### First-time setup

```bash
git clone git@github.com:<you>/CaliX.git
cd CaliX
cp .env.example .env.local
# Fill in all values from Supabase, OpenRouter, PostHog dashboards
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm db:seed:demo    # optional: creates demo users Priya + Aarav
pnpm dev
```

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API | Anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API | Service role key (SERVER ONLY) |
| `DATABASE_URL` | Supabase → Database → Connection string | Transaction pooler (port 6543) |
| `DIRECT_URL` | Supabase → Database → Connection string | Session pooler (port 5432) |
| `OPENROUTER_API_KEY` | openrouter.ai → Settings → Keys | API key (SERVER ONLY) |
| `COMPLETION_TOKEN_SECRET` | Generate: `openssl rand -hex 32` | JWT signing for quest completions |
| `DEMO_RESET_SECRET` | Generate: `openssl rand -hex 32` | Demo reset endpoint auth |

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server at localhost:3000 |
| `pnpm build` | Production build (generates Prisma client first) |
| `pnpm typecheck` | Run TypeScript compiler check |
| `pnpm lint` | ESLint with zero-warning policy |
| `pnpm test` | Run Vitest unit + integration tests |
| `pnpm e2e` | Run Playwright end-to-end tests |
| `pnpm db:migrate` | Apply Prisma migrations to dev database |
| `pnpm db:push` | Push schema changes without migration |
| `pnpm db:studio` | Open Prisma Studio (database GUI) |
| `pnpm db:seed` | Seed quests, badges, skill paths |
| `pnpm db:seed:demo` | Seed demo users with history |

## Troubleshooting

### "PrismaClient not generated"
Run `pnpm prisma generate` then retry.

### "Cannot connect to database"
Check `DATABASE_URL` and `DIRECT_URL` in `.env.local`. Ensure Supabase project is running.

### "Auth cookies not working"
Ensure middleware.ts is at project root. Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set.

### "ESLint errors on CI"
Run `pnpm lint` locally first. Zero warnings policy is enforced.
