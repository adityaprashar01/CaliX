---
type: workflow
source: superpowers
tags: [#workflow, #tdd, #multi-agent]
phases: [brainstorming, git-worktrees, writing-plans, subagent-dev, TDD, code-review, finishing]
related: [specops-4-phase, three-man-team-flow]
---

# Workflow: Superpowers Full Flow

## Purpose
> Complete end-to-end development methodology from vague idea to merged PR — enforcing TDD, subagent isolation, and systematic review at every step.

## Trigger
Invoke when: starting any non-trivial development task. The agent should check for relevant skills before any task.

---

## Step 1 — BRAINSTORMING

**Goal**: Understand what's actually needed. Not what was said, but what is meant.
**Skill**: `brainstorming`

**Steps**:
1. Ask clarifying questions (don't assume)
2. Explore alternative approaches
3. Present design in readable chunks for sign-off
4. Save design document to disk

**Gate**: Design document saved + user signed off on each section.

---

## Step 2 — USING-GIT-WORKTREES

**Goal**: Isolated workspace so changes don't pollute other work.
**Skill**: `using-git-worktrees`

**Steps**:
1. Create new branch for the feature
2. Create git worktree for this branch
3. Run project setup (install, build) in worktree
4. Verify clean test baseline before starting

**Gate**: Worktree created, tests pass in clean state.

---

## Step 3 — WRITING-PLANS

**Goal**: Plan detailed enough for "an enthusiastic junior with poor taste, no judgment, and an aversion to testing" to follow.
**Skill**: `writing-plans`

**Steps**:
1. Break work into 2-5 minute atomic tasks
2. Every task has: exact file paths, complete code, verification steps
3. Dependencies between tasks are explicit
4. No task that relies on implied context

**Gate**: Plan is self-contained. Every task has verification step.

---

## Step 4 — SUBAGENT-DRIVEN-DEVELOPMENT (or EXECUTING-PLANS)

**Goal**: Execute plan with fresh subagents to prevent context bleed between tasks.
**Skills**: `subagent-driven-development` or `executing-plans`

**Steps (subagent path)**:
1. Dispatch fresh subagent per task (no context from previous tasks)
2. Two-stage review per task: spec compliance first, code quality second
3. Failed review → subagent reworks, not move forward

**Steps (executing-plans path)**:
1. Execute tasks in batches
2. Human checkpoints between batches
3. Stop and review on any critical issue

**Gate**: All tasks complete with two-stage review passed.

---

## Step 5 — TEST-DRIVEN-DEVELOPMENT

**Goal**: Tests prove the implementation, not validate assumptions.
**Skill**: `test-driven-development`

**Strictly enforced**:
1. Write failing test (RED) — verify it fails
2. Write minimal code to make test pass (GREEN) — verify it passes
3. Refactor (REFACTOR) — verify still passes
4. Code written before tests = **DELETED**, not refactored

Test pyramid: 80% unit / 15% integration / 5% e2e

**Gate**: RED seen before GREEN. No code without test. DAMP test names.

---

## Step 6 — REQUESTING-CODE-REVIEW

**Goal**: Independent review before merge.
**Skill**: `requesting-code-review`

**Steps**:
1. Review against plan: does implementation match intent?
2. Report findings by severity:
   - Critical: block progress until resolved
   - Major: must address before merge
   - Minor: address or document why not
3. Critical findings stop the pipeline

**Gate**: No critical findings open. Major findings resolved or explicitly deferred.

---

## Step 7 — FINISHING-A-DEVELOPMENT-BRANCH

**Goal**: Clean handoff — working code, clean tree, clear options.
**Skill**: `finishing-a-development-branch`

**Steps**:
1. Verify all tests pass
2. Present options: merge to main / create PR / keep on branch / discard
3. Clean up worktree after merge or decision
4. Document what was built

**Gate**: Tests pass. Worktree cleaned. Decision made.

---

## Handoffs
| Step | Output Artifact |
|------|----------------|
| BRAINSTORMING | Design document (saved to disk) |
| GIT-WORKTREES | Worktree path + clean baseline confirmation |
| WRITING-PLANS | Plan file with atomic tasks + verification steps |
| SUBAGENT-DEV | Completed tasks with two-stage review evidence |
| TDD | Tests + implementation with RED→GREEN→REFACTOR trace |
| CODE-REVIEW | Review report with severity-labeled findings |
| FINISHING | Merged/PR'd code + cleaned worktree |

## Anti-Rationalization
| Temptation | Reality |
|------------|---------|
| "Skip brainstorming for simple tasks" | "Simple" is where assumptions hide |
| "Write tests after I get it working" | Tests after always pass — they don't prove correctness |
| "One big agent session is fine" | Context bleed across tasks causes subtle drift |
| "I'll review my own code" | Self-review is systematically blind to your assumptions |

## Related
- [[01 Principles/superpowers]] — source resource
- [[02 Workflows/specops-4-phase]] — SpecOps version of steps 1-3
