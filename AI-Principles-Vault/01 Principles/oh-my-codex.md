
type: principle
source: oh-my-codex
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/oh-my-codex
tags: [#workflow, #multi-agent, #codex, #orchestration]
related: [three-man-team, specops, claw-code-parity]
date-extracted: 2026-04-19
---

# oh-my-codex (OMX)

## Core Purpose
> A workflow layer for Codex CLI — not a replacement — adding better task routing ($deep-interview → $ralplan → $team/$ralph), reusable roles, persistent project state in `.omx/`, and a standard clarify-approve-execute sequence.

## Critical Workflow
```
omx --madmax --high        # start interactive leader session

$deep-interview "clarify X"   # Socratic clarification: ambiguity scoring, non-goal identification
$ralplan "approve safest path" # Architecture + tradeoff review; must pass/fail signal
$ralph "complete to done"      # Persistent completion loop with mandatory deslop pass
  OR
$team 3:executor "execute plan in parallel"  # Coordinated parallel execution via tmux

THEN: merge/deploy
```

## Key Principles
- **P1 — OMX Is a Layer, Not a Replacement**: Codex does the actual agent work. OMX adds better task routing + better workflow + better runtime. If you want plain Codex with no workflow layer, you don't need OMX.
- **P2 — Clarify First Is The Default Path**: `$deep-interview` before any implementation. Ambiguity that survives into implementation costs 10× more than catching it in the interview phase.
- **P3 — $ralplan Must Produce a Pass/Fail Signal**: Not "here's a plan" but "here's a plan with explicit GO / NO-GO on each tradeoff." The output is an artifact that `$ralph` or `$team` can execute against. If the plan doesn't have a clear signal, it's not done.
- **P4 — $ralph Is a Persistence Loop with Mandatory Deslop**: `$ralph` pushes the approved plan to completion. Before declaring done, it runs a deslop pass — removing filler, placeholder comments, and unresolved TODOs. Done means done.
- **P5 — $team vs $ralph Is a Coordination Choice, Not a Quality Choice**: `$team` = coordinated parallel execution (multiple agents, tmux-backed, stateful). `$ralph` = single persistent owner. Use `$team` for parallelizable plans, `$ralph` for sequential ones. Neither is "better" — the plan shape determines the choice.
- **P6 — AGENTS.md Scopes Project Guidance**: Project-specific constraints, conventions, and context go in `AGENTS.md`. Skills are reusable across projects; `AGENTS.md` is the per-project configuration layer.
- **P7 — .omx/ Persists State**: Plans, logs, memory, and mode tracking live in `.omx/`. Not in memory. Sessions die; `.omx/` doesn't. This is the durable state that makes OMX a workflow layer rather than a prompt collection.
- **P8 — omx doctor Is the First Command to Run**: Before any real work, `omx doctor` catches missing files, hooks, and runtime prerequisites. The real smoke test (`omx exec --skip-git-repo-check -C . "Reply with exactly OMX-EXEC-OK"`) catches auth and provider problems.
- **P9 — macOS/Linux Is the Primary Platform**: Native Windows and Codex App are explicitly less supported and may behave inconsistently. Budget extra time for Windows setups.

## 4 Canonical Skills

| Skill | Purpose | Key Contract |
|-------|---------|-------------|
| `$deep-interview` | Socratic clarification of intent, boundaries, non-goals | Produces ambiguity score + scope document |
| `$ralplan` | Architecture and implementation plan with tradeoff review | Produces explicit GO/NO-GO on tradeoffs |
| `$ralph` | Persistent completion + verification loop | Runs deslop pass before declaring done |
| `$team` | Coordinated parallel execution via tmux | Stateful multi-agent coordination; not in-session subagents |

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Starting with $ralph before $ralplan | $deep-interview → $ralplan → $ralph | Executing against an unreviewed plan compounds errors |
| Using $team for sequential plans | $ralph for sequential, $team for parallel | $team coordination overhead costs more than it saves on sequential work |
| Skipping omx doctor | Always run omx doctor first | Silent failures at auth/provider level cause confusing downstream errors |
| Treating .omx/ as temporary | Keep .omx/ in version control | Plans and logs are the audit trail; losing them loses context |
| Plan without clear pass/fail signal | $ralplan must produce explicit GO/NO-GO | Ambiguous plans execute unpredictably |
| Using Windows as primary platform | macOS/Linux primary; budget extra debug time for Windows | Windows support is explicitly secondary |

## Integration Points
- Pairs with: [[claw-code-parity]] (claw-code-parity uses OMX ($team, $ralph) for autonomous repo maintenance)
- Pairs with: [[three-man-team]] (three-man-team formalizes Architect/Builder/Reviewer; OMX's $ralplan/Builder/$ralph/Reviewer maps similarly)
- Pairs with: [[specops]] (SpecOps specs are the artifact that $ralplan reviews and $ralph implements against)
- Precedes: [[02 Workflows/omx-canonical-flow]]

## Pre-Init Checklist
- [ ] Node.js 20+ and Codex CLI installed
- [ ] Codex auth configured and visible in same shell profile that will run OMX
- [ ] tmux installed (macOS/Linux) for $team coordination
- [ ] Run `omx setup` → `omx doctor` → smoke test before first real task
- [ ] Create `.omx/` directory structure before first project session
- [ ] Write AGENTS.md with project-specific guidance before first $deep-interview

## Key Quotes
> "OMX does not replace Codex. It adds a better working layer around it." — README
> "Most users should think of OMX as better task routing + better workflow + better runtime, not as a command surface to operate manually all day." — README
