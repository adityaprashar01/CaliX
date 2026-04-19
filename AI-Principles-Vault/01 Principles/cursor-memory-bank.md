
type: principle
source: cursor-memory-bank
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/cursor-memory-bank
tags: [#token, #memory, #workflow, #cursor, #hierarchical-loading]
related: [caveman, mempalace]
date-extracted: 2026-04-19
---

# Cursor Memory Bank

## Core Purpose
> Phase-based development workflow for Cursor using 6 sequential commands and hierarchical lazy-loading of rules — ~70% context window reduction vs loading all rules upfront, with persistent state in `memory-bank/` across the entire development cycle.

## Key Principles
- **P1 — 6 Commands Form a Closed Loop**: `/van` (init) → `/plan` (plan) → `/creative` (design) → `/build` (implement) → `/reflect` (review) → `/archive` (document). Each reads/writes to `memory-bank/`. Re-enterable: `/archive` completes → next task starts with `/van`.
- **P2 — Hierarchical Lazy-Loading = ~70% Token Reduction**: 4 tiers: (1) Core always-loaded (`main.mdc`, `memory-bank-paths.mdc`), (2) command-specific rules, (3) complexity-level rules, (4) specialized rules loaded only when needed. Original V0.6 loaded all rules upfront — V0.7+ lazy-loads.
- **P3 — Complexity Level Determines Required Commands**: Level 1 (bug fix, single file) — skip `/plan` and `/creative`. Level 2 (simple enhancement) — add `/plan`. Levels 3–4 (feature/system) — add `/creative`. Skipping phases for simple tasks is correct, not a shortcut.
- **P4 — tasks.md Is the Spine**: All commands read/write `memory-bank/tasks.md`. Tracks task status, implementation plan, creative phase flags, completion state. If `tasks.md` is corrupted or missing, the pipeline breaks. Treat it like a database.
- **P5 — /creative Uses Anthropic's "Think" Tool Methodology**: Structured multi-option exploration with tabular comparison, detail-on-demand (concise by default, expand when asked), complexity-scaled templates. Exists to prevent premature convergence on one solution.
- **P6 — Progressive Documentation Scales With Complexity**: Level 1 = ultra-compact templates. Level 4 = phased implementation plans with architectural diagrams. Over-documenting a Level 1 bug fix wastes tokens — documentation effort must match task complexity.
- **P7 — Standardized Context Transfer Between Commands**: Mode transitions use handoff documents with selective context preservation. Not all context passes to the next command — only what the next command actually needs. This prevents context window bloat across a long workflow.
- **P8 — activeContext.md Resets at Archive**: After `/archive`, `activeContext.md` explicitly resets for the next task. No clean-slate mechanism = stale context from previous tasks pollutes next initialization.
- **P9 — System Is Designed to Be AI-Modified**: Cursor AI can be asked to modify the rules and commands directly. First-class workflow for customization — not an anti-pattern.

## Critical Workflow
```
Level 1 (Bug Fix):         /van → /build → /reflect → /archive
Level 2 (Enhancement):     /van → /plan → /build → /reflect → /archive
Level 3-4 (Feature/System):/van → /plan → /creative → /build → /reflect → /archive

RULE LOADING ORDER per command:
1. Core: main.mdc + memory-bank-paths.mdc (always)
2. Command-specific rule file
3. Complexity-level workflow file
4. Specialized (lazy): architecture / UI-UX / etc.

FILE STATE:
/van      → tasks.md created + complexity level set
/plan     → tasks.md + full implementation plan
/creative → tasks.md updated + creative/creative-[feature].md
/build    → tasks.md + progress.md updated
/reflect  → reflection/reflection-[task_id].md
/archive  → archive/archive-[task_id].md + activeContext.md reset
```

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| /creative for every task | Only when /plan flags design decisions | /creative = genuine design forks only, not boilerplate |
| Editing tasks.md manually mid-workflow | Let commands manage tasks.md | Manual edits corrupt the state machine |
| Loading all rules upfront (V0.6) | Hierarchical lazy-loading (V0.7+) | V0.6 is the original anti-pattern — ~70% more tokens |
| /build without /van first | Always start with /van | /van detects platform, creates structure, routes complexity correctly |
| Using custom modes (deprecated) | Cursor 2.0 commands | Custom modes are V0.6 legacy |

## Integration Points
- Pairs with: [[caveman]] (caveman reduces output tokens; memory-bank reduces loaded rule tokens — orthogonal token costs, stack both)
- Pairs with: [[mempalace]] (memory-bank = local markdown for current session; mempalace = semantic search across historical sessions)

## Pre-Init Checklist
- [ ] Cursor 2.0+ (commands feature required — not available in older versions)
- [ ] Claude Sonnet 4+ recommended for /creative "Think" tool methodology
- [ ] Clone repo to project root — `.cursor/` must be in project root for commands to appear
- [ ] Verify `.cursor/commands/` and `.cursor/rules/isolation_rules/` directories exist
- [ ] Initialize memory-bank with `/van` before any other command — always

## Key Quotes
> "Hierarchical Rule Loading: Only loads essential rules initially with specialized lazy-loading (~70% token reduction)" — README
> "Memory Bank transforms development from ad-hoc coding into a coordinated system with specialized phases working together." — README
> "The /creative command is conceptually based on Anthropic's Claude 'Think' tool methodology" — README
