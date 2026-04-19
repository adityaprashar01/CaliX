
type: principle
source: claude-task-master
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/claude-task-master
tags: [#tooling, #task-management, #workflow, #ide-integration]
related: [agent-skills, specops, awesome-claude-code]
date-extracted: 2026-04-19
---

# Claude Task Master

## Core Purpose
> Task management and planning framework for Claude with PRD-to-task decomposition, structured prompt schemas, and IDE extension integration — turning high-level requirements into executable task lists that agents can follow.

## Key Principles
- **P1 — PRD as Input, Tasks as Output**: The core workflow starts with a Product Requirements Document (PRD) and generates structured, atomic tasks. Requirements are the upstream artifact; tasks are the downstream execution units.
- **P2 — Structured Prompt Schemas Enforce Consistency**: Task generation isn't free-form prompting — it uses validated schemas that ensure every task has: title, description, acceptance criteria, dependencies, effort estimate. Schema enforcement prevents vague tasks.
- **P3 — Task Dependencies Are First-Class**: The task graph tracks which tasks must complete before others can start. This prevents parallelization mistakes and clarifies critical path.
- **P4 — IDE Integration Keeps Tasks In-Context**: The extension brings task management into the IDE — you see current tasks, mark completion, and get context without switching tools. Task state is always in view.
- **P5 — CLAUDE.md Configuration Shapes Task Generation**: The `.taskmaster/CLAUDE.md` file configures how task generation behaves for the project — tech stack constraints, task granularity preferences, forbidden approaches. Contextual task generation, not generic.

## Critical Workflow
```
INPUT: PRD (Product Requirements Document)
    ↓
/task-master parse-prd <prd-file>
    ↓
Task graph with dependencies generated
    ↓
/task-master list → shows all tasks with status
/task-master next  → shows next unblocked task
/task-master complete <id> → marks task done
    ↓
IDE extension: shows active task + context inline
```

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Generating tasks without a PRD | Write PRD first, parse to tasks | Task generation from vague input = vague tasks |
| Marking tasks complete without acceptance criteria check | Verify criteria before marking complete | Tasks with no criteria check accumulate hidden technical debt |
| Tasks with no dependencies specified | Always specify dependencies | Missing dependencies cause parallelization errors |
| Generic CLAUDE.md in .taskmaster | Project-specific task generation config | Generic config produces generic tasks irrelevant to your stack |

## Integration Points
- Pairs with: [[specops]] (SpecOps generates tasks in its SPEC phase; Task Master provides the tracking layer)
- Pairs with: [[agent-skills]] (`planning-and-task-breakdown` skill produces tasks; Task Master manages them)
- Pairs with: [[awesome-claude-code]] (CLAUDE.md patterns for configuring `.taskmaster/CLAUDE.md`)

## Pre-Init Checklist
- [ ] Write PRD before generating tasks — never task-generate from verbal description
- [ ] Configure `.taskmaster/CLAUDE.md` with project stack and task granularity preferences
- [ ] Install IDE extension for inline task context
- [ ] Define "done" criteria in project CLAUDE.md before first task generation run
