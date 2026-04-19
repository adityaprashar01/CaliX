
type: principle
source: superpowers
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/superpowers
tags: [#methodology, #workflow, #tdd, #multi-agent]
related: [agent-skills, specops, three-man-team]
date-extracted: 2026-04-19
---

# Superpowers

## Core Purpose
> A complete, composable software development methodology — agent doesn't jump to code, instead brainstorms spec → creates plan → launches subagents → enforces TDD — skills trigger automatically so the process is followed without manual invocation.

## Critical Workflow
```
1. BRAINSTORMING         → Socratic refinement, explore alternatives, save design doc
2. USING-GIT-WORKTREES   → Isolated workspace on new branch, clean test baseline
3. WRITING-PLANS         → Bite-sized tasks (2-5 min each), exact file paths, complete code, verify steps
4. SUBAGENT-DRIVEN-DEV   → Fresh subagent per task, two-stage review (spec compliance + code quality)
   OR EXECUTING-PLANS    → Batch execution with human checkpoints
5. TEST-DRIVEN-DEV       → RED-GREEN-REFACTOR enforced. Code written before tests = deleted.
6. REQUESTING-CODE-REVIEW → Reviews against plan by severity. Critical issues block progress.
7. FINISHING-BRANCH      → Verify tests, present options (merge/PR/keep/discard), clean worktree
```
**The agent checks for relevant skills before any task. Mandatory workflows, not suggestions.**

## Key Principles
- **P1 — Agent Asks What You're Really Trying To Do**: No code before brainstorming. The agent steps back and asks. This catches "I think I want X" before you build X and realize you needed Y.
- **P2 — Spec Shown In Readable Chunks**: Design presented in sections short enough to read and digest — not a wall of text. You sign off on each section before planning begins.
- **P3 — Plan Built for "Enthusiastic Junior With Poor Taste"**: The plan must be clear enough for someone with no project context, no judgment, and an aversion to testing to follow. If the plan relies on context, it's not complete.
- **P4 — Subagent Per Task with Two-Stage Review**: Each engineering task gets a fresh subagent. No context bleed between tasks. Review happens twice: spec compliance first, code quality second.
- **P5 — TDD is Non-Negotiable**: Code written before tests is deleted. Not refactored. Not documented. Deleted. RED (failing test) must exist before GREEN (passing code) starts.
- **P6 — Systematic Debugging Before Claiming Fixed**: 4-phase root cause process: reproduce → localize → reduce → fix. `verification-before-completion` runs after to confirm it's actually fixed, not just passing tests.
- **P7 — Brainstorming Activates Before Plan Mode**: Before entering plan mode, brainstorming must run if it hasn't. This prevents going straight from vague instruction to execution plan.
- **P8 — Git Worktrees for Isolation**: Each feature lives in its own worktree (not branch checkout). Changes in one worktree don't pollute another. Clean test baseline before work begins.
- **P9 — Review by Severity, Critical Blocks Progress**: Code review produces severity-labeled findings. Critical issues aren't logged for later — they block the pipeline until resolved.
- **P10 — Claude Works Autonomously for Hours**: With a good plan and subagent-driven-development, it's "not uncommon for Claude to work autonomously for a couple hours at a time without deviating from the plan."

## Skills Library Reference

| Category | Skill | Key Behavior |
|----------|-------|-------------|
| Testing | `test-driven-development` | RED-GREEN-REFACTOR, delete pre-test code |
| Debugging | `systematic-debugging` | 4-phase root cause |
| Debugging | `verification-before-completion` | Proves it's actually fixed |
| Collaboration | `brainstorming` | Socratic design refinement |
| Collaboration | `writing-plans` | 2-5 min tasks, complete code, verify steps |
| Collaboration | `executing-plans` | Batch execution with checkpoints |
| Collaboration | `dispatching-parallel-agents` | 2+ independent tasks → parallel |
| Collaboration | `subagent-driven-development` | Fresh subagent per task, two-stage review |
| Collaboration | `requesting-code-review` | Severity labels, critical blocks |
| Collaboration | `receiving-code-review` | How to handle feedback |
| Git | `using-git-worktrees` | Isolated workspace, clean baseline |
| Git | `finishing-a-development-branch` | Test verify, merge options, cleanup |
| Meta | `writing-skills` | How to create new skills |
| Meta | `using-superpowers` | Entry point skill |

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Skip brainstorming for "simple" tasks | Always brainstorm | "Simple" tasks are where assumptions hide |
| Write code then add tests | RED-GREEN-REFACTOR | Tests added after always pass; they don't prove correctness |
| One big subagent does everything | Fresh subagent per task | Context bleed across tasks causes drift |
| Plan that relies on implied context | Plan readable by "poor-taste junior" | If plan needs explanation, it will fail execution |
| Mixing features in one worktree | One worktree per feature | Cross-contamination of changes = debugging nightmare |
| Review yourself | Separate requesting-code-review | Self-review is systematically blind to your own assumptions |
| Continue after critical review finding | Block until resolved | Critical issues grow; they don't self-resolve |

## Integration Points
- Pairs with: [[specops]] (SpecOps handles the formalization layer; Superpowers handles the execution methodology)
- Pairs with: [[agent-skills]] (agent-skills covers similar lifecycle; Superpowers adds TDD enforcement + subagent discipline)
- Pairs with: [[three-man-team]] (three-man-team externalizes the Reviewer role; Superpowers keeps review internal to the skill system)
- Precedes: [[02 Workflows/superpowers-full-flow]]

## Pre-Init Checklist
- [ ] Install: `/plugin install superpowers@claude-plugins-official`
- [ ] Verify brainstorming skill activates before plan mode (test with a vague request)
- [ ] Confirm git worktrees are available (`git worktree list`)
- [ ] Understand: code written before tests will be deleted — this is by design

## Key Quotes
> "It puts together an implementation plan that's clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow." — README
> "The agent checks for relevant skills before any task. Mandatory workflows, not suggestions." — README
> "It's not uncommon for Claude to be able to work autonomously for a couple hours at a time without deviating from the plan." — README
