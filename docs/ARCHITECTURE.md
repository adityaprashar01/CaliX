# CaliX Architecture

## Data Model

```
User            (id=auth.users.id, role, display_name, age_bucket, avatar_id, goal_type, timezone, total_xp, created_at)
ParentLink      (id, parent_user_id, child_user_id, permission_status, created_at)
InviteCode      (code, parent_user_id, child_user_id?, expires_at, used_at?)
SchoolClass     (id, teacher_user_id, name)
ClassMember     (class_id, child_user_id)
Quest           (id, slug, title, category, duration_seconds, difficulty, skill_path_id, xp_reward, safety_score)
Exercise        (id, quest_id, order, name, instruction, duration_seconds, reps, safety_cue, image_url)
SkillPath       (id, slug, name, description, color)
SkillNode       (id, skill_path_id, order, title, unlock_xp, unlock_badge_id)
Completion      (id, user_id, quest_id, completion_token, completed_at, duration_seconds, xp_awarded, badge_id_awarded?, skip_reason?)
Badge           (id, slug, title, description, icon, rarity)
UserBadge       (user_id, badge_id, earned_at)
Streak          (user_id, current_days, longest_days, last_activity_date)
AISummary       (id, user_id, audience, input_context_json, output_text, model, created_at)
Event           (id, user_id, name, props_json, occurred_at)
```

**Critical invariant:** `User.id` = Supabase `auth.users.id`. Every FK to users points at this.

## Folder Structure

```
app/
  (marketing)/    Landing, role-select, sign-in
  (kid)/          Role-gated kid pages
  (parent)/       Role-gated parent pages
  (teacher)/      Role-gated teacher pages (stub)
  api/            Route handlers
components/
  ui/             shadcn primitives (not hand-edited)
  kid/            Kid-specific components
  parent/         Parent-specific components
lib/
  db.ts           Prisma client singleton (server-only)
  env.ts          Zod-validated environment variables
  log.ts          Pino structured logger
  supabase/       server.ts, client.ts, middleware.ts, admin.ts
  ai/             OpenRouter wrapper + prompts + guardrails
  quests/         Quest engine logic
  progression/    XP, streak, skill tree calculations
  telemetry.ts    PostHog integration
prisma/           Schema, migrations, seeds
specs/            EARS notation specs
tests/            unit/, integration/, e2e/
docs/             Architecture, runbook, deployment
```

## Service Map

```
Browser → Next.js (Vercel) → Supabase Auth (cookies via @supabase/ssr)
                            → Prisma → Supabase Postgres
                            → OpenRouter API (AI microcopy + summaries)
                            → PostHog Cloud (telemetry)
```

## Auth Flow

1. **Parent:** Email OTP via Supabase Auth → magic link → session cookie → role set to 'parent'
2. **Kid:** Parent generates 6-char invite code → kid enters code → server creates anonymous Supabase user → session returned → role set to 'kid'
3. **Middleware:** Every request runs `updateSession` to refresh auth tokens. Protected routes (`/kid/*`, `/parent/*`, `/teacher/*`) redirect unauthenticated users to `/sign-in`.
