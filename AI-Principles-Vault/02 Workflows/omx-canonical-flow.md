---
type: workflow
source: oh-my-codex
tags: [#workflow, #codex, #multi-agent]
phases: [deep-interview, ralplan, execute]
related: [three-man-team-flow, specops-4-phase]
---

# Workflow: OMX Canonical Flow

## Purpose
> Standard clarify-approve-execute sequence for Codex CLI with OMX — from ambiguous task to completed implementation via 4 canonical skills.

## Trigger
Invoke when: starting any Codex session with OMX installed. This is the default path.

---

## Setup (Once Per Session)

```bash
omx setup          # first time only
omx doctor         # every session — verify install health
omx --madmax --high  # start interactive leader session
```

Smoke test before real work:
```bash
codex login status
omx exec --skip-git-repo-check -C . "Reply with exactly OMX-EXEC-OK"
```

---

## Step 1 — $deep-interview (Clarify)

**Goal**: Eliminate ambiguity before any planning.
**Invoke**: `$deep-interview "<task description>"`

**What it does**:
- Scores ambiguity in the task
- Asks Socratic questions to clarify intent and non-goals
- Separates "what the user said" from "what the user needs"
- Produces scope document with greenfield/brownfield assessment

**Gate**: Ambiguity score acceptable. Non-goals explicit. Scope document produced.

---

## Step 2 — $ralplan (Plan with Explicit GO/NO-GO)

**Goal**: Architecture and tradeoff review producing an actionable plan.
**Invoke**: `$ralplan "<scope document or description>"`

**What it does**:
- Reviews architectural options with explicit tradeoff analysis
- Produces a plan with GO/NO-GO signal on each tradeoff
- Output is an artifact that $ralph or $team can execute against

**Key constraint**: The plan MUST have a clear pass/fail signal on each tradeoff. "Here are some options" is not an output — "Option A: GO, because X; Option B: NO-GO, because Y" is.

**Gate**: Explicit GO/NO-GO on all tradeoffs. Actionable plan exists.

---

## Step 3 — Execute (Choose Path)

### Path A: $ralph (Sequential Persistent Execution)

**Invoke**: `$ralph "carry the approved plan to completion"`

**When to use**: Plan is sequential, single owner, or requires consistent context across steps.

**What it does**:
- Persistent completion loop — keeps pushing until done
- **Mandatory deslop pass** before declaring done: removes filler, placeholder comments, unresolved TODOs
- "Done" means actually done, not "seems to work"

### Path B: $team (Parallel Coordinated Execution)

**Invoke**: `$team 3:executor "execute the approved plan in parallel"`

**When to use**: Plan has parallelizable tasks, or coordination of multiple agents is beneficial.

**What it does**:
- Spawns multiple coordinated agents via tmux
- Stateful coordination — agents share state via `.omx/`
- Not in-session subagents; real parallel execution

**Choosing**:
- Sequential plan → $ralph
- Parallel plan → $team
- Uncertain → default to $ralph (coordination overhead of $team must be justified)

---

## Handoffs

| Step | Artifact |
|------|----------|
| $deep-interview | Scope document + ambiguity resolution |
| $ralplan | Plan with explicit GO/NO-GO on all tradeoffs |
| $ralph / $team | Completed implementation + deslop pass evidence |

## Failure Modes
| Failure | Signal | Recovery |
|---------|--------|----------|
| Skipped $deep-interview | Ambiguity discovered mid-implementation | Stop. Run $deep-interview retroactively. |
| $ralplan without GO/NO-GO | Plan exists but tradeoffs unresolved | Redo $ralplan with explicit tradeoff prompting |
| $team for sequential plan | Coordination overhead > execution benefit | Switch to $ralph |
| $ralph declaring done without deslop | TODOs and placeholders in committed code | Run deslop pass before final commit |

## State Files
All session state in `.omx/`:
- Plans, logs, memory, mode tracking
- Survives session death
- Commit `.omx/` to version control for auditability

## Related
- [[01 Principles/oh-my-codex]] — source resource
- [[01 Principles/claw-code-parity]] — shows $team and $ralph in action on a real project
