

# Agent Skills

## Core Purpose
> 20 production-grade engineering skills that encode senior-engineer workflows so AI coding agents follow them consistently across every phase of development.

## Critical Workflow
```
DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP
/spec   /plan  /build  /test   /review  /ship
```
Each command activates the relevant skills automatically. Skills also auto-trigger based on context (building UI → `frontend-ui-engineering`, designing API → `api-and-interface-design`).

## Key Principles
- **P1 — Spec Before Code**: `/spec` must precede `/build`. A PRD covering objectives, commands, structure, style, testing, and boundaries before any implementation.
- **P2 — Small Atomic Tasks**: `/plan` decomposes specs into units with acceptance criteria and dependency ordering. Not "implement auth" but "add JWT validation middleware with test".
- **P3 — Thin Vertical Slices**: `incremental-implementation` — implement one slice, test, verify, commit. Never a big-bang. Feature flags, safe defaults, rollback-friendly from the start.
- **P4 — RED-GREEN-REFACTOR**: `test-driven-development` — write failing test → watch fail → write minimal code → watch pass → commit. Test pyramid: 80% unit / 15% integration / 5% e2e. DAMP > DRY in tests.
- **P5 — Source-Driven, Not Memory-Driven**: `source-driven-development` — every framework decision grounded in official docs. Verify, cite sources, flag what's unverified. No hallucinated APIs.
- **P6 — Hyrum's Law on Interfaces**: `api-and-interface-design` — everything observable becomes a dependency. Design contract-first. One-Version Rule: don't maintain multiple API versions; migrate.
- **P7 — Chesterton's Fence on Deletion**: `code-simplification` — before removing anything, understand WHY it exists. Rule of 500: any file over 500 lines is a complexity smell.
- **P8 — Measure First, Optimize Second**: `performance-optimization` — Core Web Vitals targets, profiling before any optimization. Anti-pattern: optimizing without a measured baseline.
- **P9 — Code-as-Liability**: `deprecation-and-migration` — every line of code is future maintenance cost. Zombie code removal is a feature, not cleanup.
- **P10 — Faster is Safer for Deploy**: `shipping-and-launch` — small, frequent deploys are lower-risk than large infrequent ones. Pre-launch checklists, staged rollouts, instant rollback path.

## Skills Reference

| Phase | Skill | Key Pattern |
|-------|-------|-------------|
| DEFINE | `idea-refine` | Divergent → Convergent thinking |
| DEFINE | `spec-driven-development` | PRD before code |
| PLAN | `planning-and-task-breakdown` | Atomic tasks with acceptance criteria |
| BUILD | `incremental-implementation` | Thin vertical slices |
| BUILD | `test-driven-development` | RED-GREEN-REFACTOR |
| BUILD | `context-engineering` | Right info at right time |
| BUILD | `source-driven-development` | Cite docs, flag unknowns |
| BUILD | `frontend-ui-engineering` | WCAG 2.1 AA, component arch |
| BUILD | `api-and-interface-design` | Contract-first, Hyrum's Law |
| VERIFY | `browser-testing-with-devtools` | Chrome DevTools MCP |
| VERIFY | `debugging-and-error-recovery` | 5-step triage: reproduce→localize→reduce→fix→guard |
| REVIEW | `code-review-and-quality` | 5-axis review, ~100 line PRs, severity labels |
| REVIEW | `code-simplification` | Chesterton's Fence, Rule of 500 |
| REVIEW | `security-and-hardening` | OWASP Top 10, three-tier boundary |
| REVIEW | `performance-optimization` | Measure-first, Core Web Vitals |
| SHIP | `git-workflow-and-versioning` | Trunk-based, atomic commits |
| SHIP | `ci-cd-and-automation` | Shift Left, quality gates |
| SHIP | `deprecation-and-migration` | Code-as-liability |
| SHIP | `documentation-and-adrs` | Docs the WHY, not the WHAT |
| SHIP | `shipping-and-launch` | Pre-launch checklist, staged rollout |

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Jump to code before spec | `/spec` first | Corrections cost 10× more than upfront thinking |
| Large PRs (500+ lines) | ~100 line slices | Reviewers can't hold 500 lines in working memory |
| Test after implementation | RED-GREEN-REFACTOR | Tests written after always pass |
| "It looks right" | Run the tests | Proof, not opinion |
| Optimize early | Measure first | 90% of optimizations target the wrong bottleneck |
| Keep dead code "just in case" | Delete with git history | Dead code grows faster than live code |
| Multiple API versions forever | One-Version Rule + migration | Version proliferation kills velocity |

## Agent Personas
- `code-reviewer` — Staff Engineer lens: "would a staff engineer approve this?"
- `test-engineer` — QA Specialist: Prove-It pattern
- `security-auditor` — OWASP assessment, threat modeling

## Integration Points
- Pairs with: [[specops]] (SpecOps formalizes the DEFINE/SPEC phases)
- Pairs with: [[superpowers]] (Superpowers wraps a similar lifecycle with TDD discipline)
- Pairs with: [[three-man-team]] (three-man-team operationalizes the REVIEW phase with a separate Reviewer agent)
- Precedes: [[02 Workflows/specops-4-phase]] when starting any project

## Pre-Init Checklist
- [ ] Install via `/plugin marketplace add addyosmani/agent-skills`
- [ ] Confirm `/spec` command works before writing any code
- [ ] Know which skill auto-triggers for your domain (frontend? backend?)
- [ ] Have reference checklists bookmarked: security, performance, accessibility

## Key Quotes
> "Skills encode the workflows, quality gates, and best practices that senior engineers use when building software." — README
> "Skills also activate automatically based on what you're doing." — README


---
type: principle
source: agent-skills
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/agent-skills
tags: [#methodology, #workflow, #skills]
related: [superpowers, specops, three-man-team]
date-extracted: 2026-04-19
---