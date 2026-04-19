---
type: moc
tags: [moc, index, anti-patterns, pitfalls]
date-updated: 2026-04-19
---

# Anti-Pitfalls Index

Consolidated pitfall reference. Every entry here was documented from a real failure pattern. Use this when something feels off, when you're about to skip a step, or when an agent starts rationalizing.

---

## Hard Stops (Abort Immediately)

These are non-negotiable. Any of these = stop, do not proceed.

| Stop | Signal | Source |
|------|--------|--------|
| Code without spec | Agent writes code before spec approved | [[anti-patterns.rules.mdc]] |
| Self-review | Builder reviews own work | [[anti-patterns.rules.mdc]], [[three-man-team]] |
| Skipped verification | "Tests probably pass" without running | [[anti-patterns.rules.mdc]] |
| Ungated dependency | `import newLib` without 5-criteria gate | [[dependency-gates.rules.mdc]] |
| Phase skip | "We can skip UNDERSTAND, I get it" | [[specops-governance.rules.mdc]] |

---

## Agent Failure Modes (FM-1 through FM-10)

Full detail in [[agent-failure-modes]]. Quick reference:

| ID | Name | Key Signal |
|----|------|------------|
| FM-1 | Context Amnesia | Agent repeats completed work |
| FM-2 | Self-Review | Builder == Reviewer |
| FM-3 | Spec Drift | Code diverges from spec silently |
| FM-4 | Token Bloat | Session cost spikes without output gain |
| FM-5 | Ungated Dependency | New lib imported without review |
| FM-6 | Premature Completion | "Done" declared before verification |
| FM-7 | Test Evasion | TDD skipped "for speed" |
| FM-8 | Rationalization Loop | Agent justifies skipping a gate |
| FM-9 | Authority Collapse | Roles blur; Architect starts building |
| FM-10 | Memory Decay | Long session loses earlier decisions |

---

## Rationalization Patterns

The meta-pattern: `"I [will skip] X because [this situation is special]"`

Full tables in [[rationalization-tables]]. High-frequency ones:

| Rationalization | Truth | System |
|----------------|-------|--------|
| "I understand enough to start" | No. Run $deep-interview. | SpecOps |
| "Tests slow us down" | No. Tests catch regressions. | Superpowers |
| "I'll review my own work" | No. Conflict of interest. | Three-Man-Team |
| "This library is well-known, no gate needed" | No. Gate anyway. | SpecOps |
| "The spec is in my head" | No. Write it down. | SpecOps |
| "Skip UNDERSTAND, it's obvious" | No. UNDERSTAND is mandatory. | SpecOps |

---

## System Design Traps (T-1 through T-10)

Full detail in [[system-design-traps]]. Quick reference:

| ID | Trap | Prevention |
|----|------|-----------|
| T-1 | Premature optimization | Profile first, scale when needed |
| T-2 | Distributed monolith | Conway's Law check before splitting |
| T-3 | Sync everything | Identify which ops can be async |
| T-4 | Ignore CAP theorem | State consistency model explicitly |
| T-5 | Single point of failure | Every component: what fails if this goes down? |
| T-6 | No backpressure | Rate limit + queue depth before scaling |
| T-7 | Cache invalidation ignored | Define TTL + invalidation strategy in spec |
| T-8 | No idempotency | All mutating ops must be idempotent |
| T-9 | Schema without migration plan | Migration strategy = part of schema design |
| T-10 | Observability afterthought | Logging + metrics defined in spec, not post-ship |

---

## Pre-Architecture Checklist (from [[system-design-traps]])

Run before designing any system:

- [ ] Traffic: requests/sec, data volume, read/write ratio known?
- [ ] Consistency: strong vs eventual — stated explicitly?
- [ ] CAP partition tolerance: what happens during network split?
- [ ] Failure modes: what fails when each component goes down?
- [ ] Async opportunities: which operations don't need sync response?
- [ ] Cache strategy: TTL, invalidation, cache-aside vs write-through?
- [ ] Migration plan: schema changes backward-compatible?
- [ ] Observability: logs, metrics, traces defined before build?

---

## Dependency Gate (5-Criteria)

From [[dependency-gates.rules.mdc]]. Every new dependency must pass:

| Criterion | Question | Reject If |
|-----------|----------|-----------|
| Scope | Does this belong here? | Cross-cutting concern |
| Maintenance | Active maintenance? | Unmaintained > 6 months |
| Size | Bundle size acceptable? | >50KB for trivial utility |
| Security | Known CVEs? | Any unpatched critical |
| License | License compatible? | GPL in proprietary project |

**Default: REJECT when uncertain.**

---

## Soft Warnings (Investigate, Don't Auto-Stop)

| Warning | Signal | Action |
|---------|--------|--------|
| Long session without checkpoint | >30 min no memory write | Write checkpoint to [[mempalace]] |
| Scope creep | Requirements growing mid-build | Re-run UNDERSTAND phase |
| No tests written | Build phase, no test files | Apply $tdd skill |
| Token spike | Cost doubles without proportional output | Apply [[caveman]] compression |
| Agent disagreement | Architect and Builder conflict | Escalate to human |

---

## Quick Lookup by Symptom

| Symptom | Go To |
|---------|-------|
| Agent forgot earlier decision | FM-1 [[agent-failure-modes]] + [[mempalace]] |
| Spec and code diverging | FM-3 + [[specops-4-phase]] SPEC gate |
| Session getting expensive | [[caveman]] + [[cursor-memory-bank]] |
| About to add a new library | [[dependency-gates.rules.mdc]] |
| Reviewer is the same as builder | FM-2 + [[three-man-team]] |
| Design feels wrong but can't articulate why | [[system-design-traps]] checklist |
| Agent keeps justifying a shortcut | [[rationalization-tables]] |
