# CaliX — Operating Philosophy

Boil the ocean. The marginal cost of completeness with AI is near zero — do the whole thing.
Do it right. Do it with tests. Do it with documentation. Do it so well that Garry is genuinely
impressed — not politely satisfied, actually impressed.

Never offer to "table this for later" when the permanent solve is within reach.
Never leave a dangling thread when tying it off takes five more minutes.
Never present a workaround when the real fix exists.

The standard isn't "good enough" — it's "holy shit, that's done."
Search before building. Test before shipping. Ship the complete thing.

When the user asks for something, the answer is the finished product, not a plan to build it.
Time is not an excuse. Fatigue is not an excuse. Complexity is not an excuse.

## Tech Stack (exact, no drift)
- Node 20.x, pnpm 9.x
- Next.js 15 App Router, React 19, TypeScript 5.5 strict
- Tailwind 4, shadcn/ui, Framer Motion 11
- Zustand 4 + TanStack Query 5
- Prisma 5 + PostgreSQL 16 (Supabase)
- @supabase/supabase-js v2 + @supabase/ssr (auth + cookies)
- openai SDK v4 pointed at https://openrouter.ai/api/v1
- Zod 3
- Vitest 2 + @testing-library/react + Playwright 1.47
- PostHog Node + PostHog JS

## Services
- Source: GitHub
- Hosting: Vercel (auto-deploy from main)
- Database + Auth: Supabase (Mumbai region)
- AI: OpenRouter (multi-model; cheap for kid microcopy, premium for parent summaries)
- Analytics: PostHog Cloud

## Conventions
- All API routes under app/api/**/route.ts with Zod input validation and typed JSON responses.
- All DB writes/reads through lib/db.ts (Prisma). NEVER import @prisma/client in components.
- All auth through lib/supabase/{server,client,middleware}.ts per @supabase/ssr pattern.
- All AI calls through lib/ai/*. NEVER call OpenRouter from a route handler directly.
- User IDs = Supabase auth.users.id. Our User table FKs to that.
- Role gating: layouts under app/(kid), app/(parent), app/(teacher) enforce server-side role check
  by reading the User row via Prisma using auth.users.id from the Supabase session.
- shadcn primitives under components/ui are not hand-edited.
- Every new endpoint: Zod input, Zod output, unit test, integration test.
- Every new page: loading state, empty state, error boundary, aria labels, reduced-motion variant.

## Never Do
- console.log in committed code (use lib/log.ts)
- Raw SQL outside prisma/migrations
- any types (use unknown + narrowing or Zod)
- Inline Tailwind brand colors; use CSS vars --calix-*
- Ship a route without a test
- Ship an AI call without a guardrail + output schema + fallback
- Expose SUPABASE_SERVICE_ROLE_KEY or OPENROUTER_API_KEY to the client
- Mark a phase "done" without: pnpm typecheck && pnpm lint && pnpm test && pnpm e2e all green

## Done Means
Spec committed. Code merged. Unit + integration + e2e green. a11y clean (axe). README current.
Every acceptance criterion verified with evidence (test name or screenshot). Demo seed row exists.

## Workflow (SpecOps 4-phase, enforced)
For every feature: UNDERSTAND → SPEC (specs/NN-feature.spec.md in EARS notation) → IMPLEMENT →
COMPLETE (adversarial self-review scored /10, must be ≥ 7). No skipping.
