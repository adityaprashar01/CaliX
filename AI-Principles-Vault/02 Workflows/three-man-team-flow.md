---
type: workflow
source: three-man-team
tags: [#workflow, #multi-agent, #review]
phases: [brief, build, review, deploy]
related: [specops-4-phase, superpowers-full-flow]
---

# Workflow: Three Man Team

## Purpose
> Structured 3-agent coordination for any unit of work — Architect plans and deploys, Builder builds exactly to brief, Reviewer independently clears or rejects. Nothing skips a step.

## Trigger
Invoke when: work unit is large enough to benefit from independent review, or when deployment risk justifies structural separation of concerns.

---

## Role Definitions

### Architect (Arch)
- Owns: system understanding, briefs, deployment authority
- Does: plans work, writes briefs, deploys with Project Owner approval
- Does NOT: build the code, review own briefs

### Builder (Bob / custom name)
- Owns: implementation
- Does: reads brief, shows plan to Architect, builds, hands to Reviewer
- Does NOT: start without brief, skip plan approval, review own work

### Reviewer (Richard / custom name)
- Owns: quality gate
- Does: reviews Builder's output, clears or sends back with specific reason
- Does NOT: build, deploy, approve insufficient work to move things along

---

## Workflow

```
Step 1: Architect writes brief
           ↓
Step 2: Builder reads brief
           ↓
Step 3: Builder shows plan to Architect → APPROVAL REQUIRED
           ↓
Step 4: Builder builds
           ↓
Step 5: Builder hands off to Reviewer
           ↓
Step 6: Reviewer clears (→ Step 7) OR sends back with reason (→ Step 4)
           ↓
Step 7: Architect deploys (with Project Owner go-ahead)
```

---

## Phase 1 — Brief Writing (Architect)

**Goal**: A brief precise enough that Builder can build without asking questions.
**Output**: Written brief document

**Brief must include**:
- What to build (specific, not vague)
- What NOT to build (explicit out-of-scope)
- Which files/areas to work in
- Success criteria (testable)
- Known constraints

---

## Phase 2 — Plan Approval (Builder → Architect)

**Goal**: Catch misunderstandings before code is written.
**Output**: Builder's plan + Architect approval

**Builder shows**:
- Interpretation of the brief
- Proposed approach
- Any questions about ambiguous parts

**Architect decides**:
- Approve → Builder proceeds
- Reject with notes → Builder revises plan

---

## Phase 3 — Build (Builder)

**Goal**: Build exactly what the brief and approved plan say.
**Output**: Code + verification evidence

**Rules**:
- No scope additions without a new brief
- Questions → pause and ask Architect (don't assume)
- Evidence of working code ready for Reviewer

---

## Phase 4 — Review (Reviewer)

**Goal**: Independent quality gate.
**Output**: CLEARED or REJECTED with specific reason

**Reviewer checks**:
- Does it match the brief?
- Does the code work correctly?
- Are there obvious problems?
- Would I be confident shipping this?

**If REJECTED**: Must give specific actionable reason. "Not good enough" is not a rejection reason.

---

## Phase 5 — Deploy (Architect)

**Goal**: Production deployment with explicit go-ahead.
**Input**: Reviewer clearance + Project Owner approval

**Steps**:
1. Confirm Reviewer clearance
2. Get Project Owner go-ahead
3. Deploy
4. Verify post-deploy

---

## Token Optimization (Every Session)

These 5 rules are baked into CLAUDE.md for every session:

```
Is this in a skill or memory?   → Trust it. Skip the file read.
Is this speculative?            → Kill the tool call.
Can calls run in parallel?      → Parallelize them.
Output > 20 lines you won't use → Route to subagent.
About to restate what user said → Delete it.
```

## Failure Modes
| Failure | Signal | Recovery |
|---------|--------|----------|
| Builder starts without brief | Code appears without a written brief | Stop. Write the brief. Start over. |
| Builder skips plan approval | Implementation differs from intent | Stop. Show plan. Get approval. |
| Reviewer passes insufficient work | Quality regresses | Reviewer is accountable for clearance; identify what was missed |
| Architect deploys without Reviewer clearance | Only Architect sees the work | Re-run Reviewer phase before production |

## Related
- [[01 Principles/three-man-team]] — source resource
- [[02 Workflows/specops-4-phase]] — SpecOps spec is what Architect gives Builder as brief
