# CaliX Deployment

## Overview

- **Hosting:** Vercel
- **Database + Auth:** Supabase
- **AI:** OpenRouter
- **Analytics:** PostHog Cloud (optional for demo)

## What is deployed for the demo MVP

This repository deploys as a standard Next.js App Router project on Vercel.

For the 5-minute demo MVP:
- the UI and API routes deploy on Vercel
- AI calls run server-side through OpenRouter
- Supabase remains the source for env compatibility and future auth/database work
- the current demo runtime uses local persisted Zustand state instead of live DB reads for the main kid/parent flows

## Vercel deploy flow

Per Vercel's Next.js docs, if you already have a Next.js project, install the Vercel CLI and run `vercel` from the project root.

Typical flow:

```bash
npx vercel
npx vercel --prod
```

If you prefer dashboard setup:
1. Import the GitHub repo into Vercel.
2. Let Vercel detect Next.js automatically.
3. Set the environment variables below.
4. Deploy Production from `main`.


## Vercel build settings to check

For this repository, Vercel should treat the app as **Next.js** and use the repo root as the project root.

Recommended Project Settings -> Build and Deployment:
- **Framework Preset:** `Next.js`
- **Root Directory:** repo root (`.`)
- **Build Command:** leave default, or `pnpm build`
- **Output Directory:** **leave empty / do not override**

If Vercel reports `No Output Directory named "public" found after the Build completed`, that usually means the project has an Output Directory override intended for a static site. Clear that override and redeploy.

## Required Vercel environment variables

Set these for **Production** at minimum, and also **Preview** if you want branch deploys to work:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `DIRECT_URL`
- `OPENROUTER_API_KEY`
- `OPENROUTER_SITE_URL`
- `OPENROUTER_APP_NAME`
- `NEXT_PUBLIC_APP_URL`
- `DEMO_RESET_SECRET`
- `COMPLETION_TOKEN_SECRET`

Optional:
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `POSTHOG_API_KEY`

Notes:
- Vercel environment variable changes apply to the next deployment, not previous ones.
- For local development, Vercel documents `vercel env pull` for downloading Development variables into a local env file.

## Supabase values to copy

From **Supabase Dashboard → Project Settings / Connect** copy:

### API values
- Project URL -> `NEXT_PUBLIC_SUPABASE_URL`
- Legacy `anon` key (or equivalent client-safe key matching this repo contract) -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Legacy `service_role` key (server only) -> `SUPABASE_SERVICE_ROLE_KEY`

Important:
- Supabase explicitly warns never to expose `service_role` publicly.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only and only in Vercel/server envs.

### Database values
Supabase documents three common connection styles:
- **Direct connection** on port `5432`: best for persistent servers, IPv6 by default
- **Session pooler** on port `5432`: fallback when you need IPv4 for persistent connections
- **Transaction pooler** on port `6543`: best for serverless or transient connections

For this repo use:
- `DATABASE_URL` -> Supabase **transaction pooler** connection string for app/serverless runtime
- `DIRECT_URL` -> Supabase **direct** connection string for Prisma migrations when available

If your environment cannot use direct IPv6 connections, use Supabase's **session pooler** as the practical `DIRECT_URL` fallback.

## Recommended values for this repo

### `DATABASE_URL`
Use the transaction/pooler string and keep PgBouncer-safe settings:

```env
DATABASE_URL=postgresql://...:6543/postgres?pgbouncer=true&connection_limit=1
```

### `DIRECT_URL`
Prefer the direct connection string from Supabase Connect:

```env
DIRECT_URL=postgresql://...:5432/postgres
```

## Local development

1. Copy `.env.example` to `.env.local`
2. Fill values from Supabase and OpenRouter
3. Run:

```bash
pnpm install
pnpm typecheck
pnpm lint
pnpm build
pnpm dev
```

If you are using Vercel-managed envs locally, you can also use:

```bash
vercel env pull
```

## Deployment verification checklist

Before marking deployment ready:
- `pnpm typecheck` passes
- `pnpm lint` passes
- `pnpm build` passes
- deployed site loads `/`, `/role-select`, `/hub`, `/skills`, and `/parent/hub`
- AI routes fall back cleanly when OpenRouter is unavailable
- no secret keys are exposed client-side

## Current demo-specific behavior

- The middleware now safely no-ops when Supabase public env vars are absent, so the demo does not hard-fail during local or preview bring-up.
- The product demo does not require a seeded database to click through the main flow.
- Supabase is still required for full future auth/database rollout and for clean production env setup.
