
type: principle
source: three-man-team
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/three-man-team
tags: [#methodology, #multi-agent, #workflow]
related: [agent-skills, superpowers, claw-code-parity]
date-extracted: 2026-04-19
---

# Three Man Team

## Core Purpose
> Three agents with distinct roles, clear handoffs, and token-optimized rules — the minimum viable team for meaningful software review without coordination overhead eating the gain.

## Critical Workflow
```
Architect writes brief
    ↓
Builder reads brief → shows plan → builds → hands off
    ↓
Reviewer clears OR sends back (with specific reason)
    ↓
Architect deploys (with Project Owner go-ahead)
```
Nothing skips a step. Every unit of work follows this path.

## Key Principles
- **P1 — 3 is Not Arbitrary**: DeepMind research shows 3-5 agents with structured artifact handoffs outperform both solo agents AND larger groups. 3 = minimum for meaningful review, maximum before coordination overhead exceeds benefit.
- **P2 — Roles Map to How Real Software Ships**: Architect owns system understanding + deploy authority. Builder builds fast and clean. Reviewer catches what Builder missed. These are real-world engineering roles, not invented.
- **P3 — Brief Before Build**: Builder never starts without a written brief from Architect. The brief is the handoff artifact — not a verbal description, a structured document.
- **P4 — Builder Shows Plan First**: Before writing any code, Builder shows Architect a plan. Architect must approve. This catches misunderstandings before code is written.
- **P5 — Reviewer is Structurally Separate**: Builder cannot review own work. Reviewer role exists specifically to provide adversarial perspective. If Reviewer doesn't exist, create one.
- **P6 — Token Discipline is Baked In**: 5 rules in every session's CLAUDE.md — not nice-to-haves, mandatory defaults that prevent the most expensive token waste patterns.
- **P7 — Personas are Customizable, Process is Not**: Rename Arch/Bob/Richard to anything. The names don't matter. The handoff sequence does.
- **P8 — Setup Handles Naming**: Arch agent handles renaming during setup — just tell it new names. Don't manually edit persona files.

## Token Optimization Rules (Mandatory)
```
Is this in a skill or memory?   → Trust it. Skip the file read.
Is this speculative?            → Kill the tool call.
Can calls run in parallel?      → Parallelize them.
Output > 20 lines you won't use → Route to subagent.
About to restate what user said → Delete it.
```

## Team Roles

| Role | Job | Authority |
|------|-----|-----------|
| **Architect** | Plans, writes briefs, deploys | System understanding, deploy gate |
| **Builder** | Reads brief, shows plan, builds | Code execution only |
| **Reviewer** | Clears work or sends back | Quality veto, no deploy authority |

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Builder reviews own work | Separate Reviewer agent | Self-review misses what you can't see |
| Skipping the brief | Always have written brief | Verbal briefs lose fidelity |
| Builder starting without showing plan | Plan approval gate | Misunderstandings caught before code, not after |
| Architect deploying without Reviewer clearance | Full handoff sequence | Rushing deploy skips the only independent check |
| Reading files that are already in skills/memory | Trust skills/memory | Redundant reads burn tokens on known info |
| Speculative tool calls | Kill speculation early | Token cost of exploration compounds |
| Large agent outputs nobody reads | Route to subagent | Context window is finite |

## Integration Points
- Pairs with: [[specops]] (SpecOps provides the spec artifact that Architect gives Builder)
- Pairs with: [[agent-skills]] (Agent-skills activate within each role's context)
- Pairs with: [[caveman]] (Caveman compression reduces token cost of agent communication)
- Precedes: [[02 Workflows/three-man-team-flow]]

## Pre-Init Checklist
- [ ] Clone to `.claude/skills/three-man-team` and run `./setup`
- [ ] Decide persona names before setup (can change after, but cleaner to decide upfront)
- [ ] Use `templates/project-folder/` — not `templates/generic/` — for ready-to-use setup
- [ ] Confirm token-optimizer skill is installed globally
- [ ] Establish who is Project Owner (human) for deploy go-ahead

## Key Quotes
> "The solution isn't a better prompt. It's a process." — README
> "Three is not arbitrary — it is the minimum for meaningful review and the maximum before coordination overhead eats the gain." — README
> "Nothing skips a step." — README
