---
type: moc
tags: [moc, index, home]
date-updated: 2026-04-19
---

# AI Principles Vault — Home

> Pre-init knowledge base. Before any project starts, consult this vault. Every failure mode here was paid for in real projects.

---

## How to Use This Vault

1. **New project?** → Start at [[project-pre-init]] checklist
2. **Picking a methodology?** → [[By-Domain]] or [[By-Phase]]
3. **Hit a failure?** → [[Anti-Pitfalls]] or [[agent-failure-modes]]
4. **Writing a spec?** → [[specops-spec]] template + [[specops]] principles
5. **Setting up agents?** → [[three-man-team]] + [[agent-skills]]

---

## Principles (01)

### Workflow & Methodology
- [[specops]] — 4-phase UNDERSTAND→SPEC→IMPLEMENT→COMPLETE with EARS notation
- [[superpowers]] — 7-step agent workflow with 14-skill library
- [[three-man-team]] — Architect→Builder→Reviewer multi-agent pattern
- [[oh-my-codex]] — $deep-interview→$ralplan→$ralph/$team canonical flow

### Memory & Context
- [[mempalace]] — Wings/rooms/closets/drawers Zettelkasten; 96.6%→99% retrieval
- [[cursor-memory-bank]] — 4-tier rule loading; tasks.md as project spine
- [[agent-skills]] — 20 skills across DEFINE→PLAN→BUILD→VERIFY→REVIEW→SHIP

### Token Optimization
- [[caveman]] — 4 intensity levels; 22%–87% token savings; arXiv:2604.00025
- [[claw-code-parity]] — OmX/clawhip/OmO architecture; human skills that still matter

### System Design
- [[system-design-primer]] — CAP, ACID vs BASE, consistency models, scaling patterns
- [[rest-api-patterns]] — HTTP status codes, REST constraints, versioning strategies

### Tooling
- [[rulefy]] — .rules.mdc governance file generation
- [[servers-mcp]] — 7 reference MCP servers; Claude Desktop config pattern
- [[awesome-claude-code]] — Minimal vs full CLAUDE.md patterns; forbidden patterns
- [[openclaw]] — Plugin ecosystem; architecture diagram
- [[claude-task-master]] — PRD→tasks workflow; dependency graph

---

## Workflows (02)

- [[specops-4-phase]] — Full gate-by-gate SpecOps execution guide
- [[superpowers-full-flow]] — 7-step Superpowers with per-step gates
- [[three-man-team-flow]] — 5-phase Architect→Builder→Reviewer execution
- [[omx-canonical-flow]] — Setup + $deep-interview→$ralplan→$ralph/$team

---

## Anti-Patterns (03)

- [[rationalization-tables]] — Consolidated "I will skip X because…" patterns from all 5 systems
- [[agent-failure-modes]] — FM-1 through FM-10; priority matrix
- [[system-design-traps]] — T-1 through T-10; pre-architecture checklist

---

## Rules (04)

| File | Scope | Purpose |
|------|-------|---------|
| [[ai-principles.rules.mdc]] | `**/*` | Master principle lookup by phase |
| [[specops-governance.rules.mdc]] | `**/*` | 4-phase contract enforcement |
| [[anti-patterns.rules.mdc]] | `**/*` | Hard stops + soft warnings |
| [[dependency-gates.rules.mdc]] | `package.json` | 5-criteria dependency evaluation |

---

## Templates (05)

- [[principle-note]] — Frontmatter + sections for extracting any new resource
- [[specops-spec]] — SpecOps spec with EARS notation + adversarial rubric
- [[project-pre-init]] — 7-section day-0 checklist
- [[agent-brief]] — Task brief for spinning up agents
- [[post-mortem]] — Incident / failure retrospective format

---

## Meta

- [[VAULT-README]] — Vault philosophy and usage guide
- [[resource-inventory]] — Full source paths for all 18+ resources

---

## Key Principle

> "The solution isn't a better prompt. It's a process." — Three-Man-Team

Every rule in this vault exists because someone skipped a step and paid for it.
