---
type: moc
tags: [moc, index, phase]
date-updated: 2026-04-19
---

# By Phase

Notes grouped by dev lifecycle phase. Use when you know *where you are* in a project.

---

## Phase 0 — Pre-Init (Before Anything)

Run this before the first prompt of any new project.

**Checklist:** [[project-pre-init]] — 7-section day-0 gate

| Question | Check |
|----------|-------|
| Do I understand the problem? | [[specops]] UNDERSTAND phase |
| Do I have a spec? | [[specops-spec]] template |
| Agents briefed? | [[agent-brief]] template |
| Memory architecture chosen? | [[mempalace]] or [[cursor-memory-bank]] |
| Governance rules loaded? | [[ai-principles.rules.mdc]] |
| Anti-patterns reviewed? | [[agent-failure-modes]] |

---

## Phase 1 — UNDERSTAND

Goal: map the problem space before writing a single line of spec.

| Note | What to Use It For |
|------|--------------------|
| [[specops]] | UNDERSTAND phase gates; what counts as "understood" |
| [[oh-my-codex]] | $deep-interview skill — structured problem interview |
| [[three-man-team]] | Architect role begins here |
| [[system-design-primer]] | Identify correct consistency model, scaling tier early |
| [[agent-skills]] | DEFINE skills: $scope, $domain-map |

**Anti-pattern to avoid:** [[rationalization-tables]] — "I understand enough to start coding"

---

## Phase 2 — SPEC

Goal: produce a machine-readable, adversarially-evaluated specification.

| Note | What to Use It For |
|------|--------------------|
| [[specops]] | EARS notation; dependency gate; spec completeness checklist |
| [[specops-spec]] | Spec template with adversarial rubric (0–10 scoring) |
| [[specops-4-phase]] | SPEC phase gate requirements |
| [[rulefy]] | Generate .rules.mdc from finalized spec |
| [[agent-skills]] | PLAN skills: $plan, $ears-spec |
| [[rest-api-patterns]] | API contract definition during spec |

**Hard stop:** No code before spec score ≥ 7/10 on adversarial rubric.

---

## Phase 3 — BUILD / IMPLEMENT

Goal: execute spec with zero undocumented deviation.

| Note | What to Use It For |
|------|--------------------|
| [[three-man-team]] | Builder role execution; token discipline rules |
| [[three-man-team-flow]] | 5-phase build execution |
| [[superpowers]] | worktrees + subagent-TDD skills |
| [[superpowers-full-flow]] | Steps 3–5 (plan→build→test) |
| [[agent-skills]] | BUILD skills: $implement, $tdd, $worktree |
| [[cursor-memory-bank]] | tasks.md as build spine; memory loading during build |
| [[caveman]] | Token compression during verbose build sessions |
| [[dependency-gates.rules.mdc]] | Gate every new dependency before import |

**Anti-patterns:** FM-3 (spec drift), FM-5 (ungated dependency), FM-7 (no TDD) in [[agent-failure-modes]]

---

## Phase 4 — VERIFY

Goal: independent verification before review.

| Note | What to Use It For |
|------|--------------------|
| [[agent-skills]] | VERIFY skills: $test-suite, $coverage-check |
| [[specops-4-phase]] | IMPLEMENT→COMPLETE gate requirements |
| [[superpowers-full-flow]] | Step 5 (test gate) |
| [[three-man-team]] | Reviewer role begins; Builder cannot self-review |

**Hard stop:** FM-2 (self-review) in [[agent-failure-modes]] — separate agent must review.

---

## Phase 5 — REVIEW

Goal: adversarial review by independent agent/human.

| Note | What to Use It For |
|------|--------------------|
| [[three-man-team]] | Reviewer authority; escalation rules |
| [[three-man-team-flow]] | Review phase execution |
| [[superpowers]] | review skill; ship gate |
| [[agent-skills]] | REVIEW skills: $adversarial-review, $security-audit |
| [[specops-governance.rules.mdc]] | COMPLETE phase gate |
| [[rationalization-tables]] | Anti-rationalization during review |

**Key:** Reviewer must have fresh context. Never re-use Builder agent for review.

---

## Phase 6 — SHIP

Goal: deploy with verified rollback and no surprises.

| Note | What to Use It For |
|------|--------------------|
| [[superpowers-full-flow]] | Step 7 (ship gate) |
| [[agent-skills]] | SHIP skills: $deploy-check, $rollback-plan |
| [[specops-4-phase]] | COMPLETE phase handoff |
| [[post-mortem]] | Template for failures post-ship |

---

## Cross-Phase Resources

Always available, phase-independent:

- [[mempalace]] — Memory system (set up in Phase 0, used throughout)
- [[caveman]] — Token compression (apply any time verbosity detected)
- [[ai-principles.rules.mdc]] — Principle lookup table by phase
- [[anti-patterns.rules.mdc]] — Hard stops active all phases
- [[agent-failure-modes]] — FM-1 through FM-10 reference
