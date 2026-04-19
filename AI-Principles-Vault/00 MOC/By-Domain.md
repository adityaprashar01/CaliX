---
type: moc
tags: [moc, index, domain]
date-updated: 2026-04-19
---

# By Domain

All vault notes grouped by knowledge domain. Use when you know *what kind* of problem you have.

---

## Workflow & Methodology

Core process systems. Pick one and commit — mixing creates gaps.

| Note | Core Idea | When to Use |
|------|-----------|-------------|
| [[specops]] | 4-phase UNDERSTAND→SPEC→IMPLEMENT→COMPLETE | Any project with requirements |
| [[superpowers]] | 7-step agent workflow with 14-skill library | Complex multi-agent builds |
| [[three-man-team]] | Architect→Builder→Reviewer separation | Any task with >1 agent |
| [[oh-my-codex]] | $deep-interview→$ralplan→$ralph/$team | Codex/CLI-based projects |
| [[specops-4-phase]] | Full gate-by-gate SpecOps execution | When running SpecOps |
| [[superpowers-full-flow]] | Superpowers step-by-step with gates | When running Superpowers |
| [[three-man-team-flow]] | 5-phase Architect→Builder→Reviewer | Multi-agent orchestration |
| [[omx-canonical-flow]] | oh-my-codex execution guide | Using OmX skills |

**Governing rule:** [[specops-governance.rules.mdc]]

---

## Memory & Context Management

How agents maintain state across long sessions and context windows.

| Note | Core Idea | Token Impact |
|------|-----------|-------------|
| [[mempalace]] | Wings/rooms/closets/drawers Zettelkasten | $1.13/session → $0 |
| [[cursor-memory-bank]] | 4-tier hierarchical lazy-loading | ~70% reduction |
| [[agent-skills]] | 20 skills; skill = persistent capability | Varies per skill |
| [[claw-code-parity]] | OmX/clawhip/OmO architecture | Baseline architecture |

**Key insight:** Memory architecture is chosen at project start, not mid-session. Retro-fitting is costly.

---

## Token Optimization

Reduce cost without losing substance.

| Note | Technique | Savings |
|------|-----------|---------|
| [[caveman]] | Natural language compression | 22%–87% |
| [[cursor-memory-bank]] | Lazy context loading | ~70% |
| [[mempalace]] | AAAK compression in storage | Session → near-zero |

**Rule:** Never compress security warnings, irreversible action confirmations, or multi-step sequences where order risks misread.

---

## System Design

Architecture decisions with long-lived consequences.

| Note | Domain | Key Concepts |
|------|--------|--------------|
| [[system-design-primer]] | Distributed systems | CAP, ACID, consistency, scaling |
| [[rest-api-patterns]] | API design | HTTP codes, versioning, REST constraints |

**Anti-patterns:** [[system-design-traps]] — 10 traps with pre-architecture checklist

---

## Agent Tooling & Platforms

Tools that agents use or are configured through.

| Note | Tool | Purpose |
|------|------|---------|
| [[rulefy]] | Rulefy | Generate .rules.mdc governance files |
| [[servers-mcp]] | MCP Servers | 7 reference servers; Desktop config |
| [[awesome-claude-code]] | CLAUDE.md | Minimal vs full patterns; forbidden list |
| [[openclaw]] | OpenClaw | Plugin ecosystem; architecture |
| [[claude-task-master]] | Task Master | PRD→tasks; dependency graph |

---

## Governance & Safety

Rules that prevent agent failure, bad dependencies, rationalization.

| File | Enforces | Hard Stops |
|------|----------|------------|
| [[ai-principles.rules.mdc]] | Principle lookup by phase | 5 anti-rationalization blocks |
| [[specops-governance.rules.mdc]] | 4-phase contract | Skip phase = hard stop |
| [[anti-patterns.rules.mdc]] | Failure mode prevention | 5 hard stops + 4 soft warnings |
| [[dependency-gates.rules.mdc]] | Dependency quality | Default REJECT when uncertain |

---

## Anti-Patterns (Cross-Domain)

- [[rationalization-tables]] — "I will skip X because…" from all 5 systems
- [[agent-failure-modes]] — FM-1 through FM-10
- [[system-design-traps]] — Architecture traps T-1 through T-10
