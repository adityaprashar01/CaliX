---
type: meta
tags: [meta, readme, vault]
date-updated: 2026-04-19
---

# AI Principles Vault — README

## What This Is

Pre-init knowledge base distilled from 18+ AI engineering resources. Every principle here was extracted from a real methodology, paper, or production system. The vault exists because skipping pre-project alignment is the single most consistent cause of AI-assisted project failure.

**Use this vault before the first prompt of every project.**

---

## Philosophy

Three beliefs underpin this vault:

1. **Process over prompts.** A better prompt doesn't fix a missing UNDERSTAND phase. A better process does.
2. **Anti-patterns are as valuable as patterns.** Knowing what breaks is as important as knowing what works.
3. **Governance must be machine-readable.** Rules in `.rules.mdc` files are consumed by agents, not just humans.

---

## Vault Structure

```
AI-Principles-Vault/
├── .obsidian/          # Obsidian config (app.json, graph.json, templates.json)
├── 00 MOC/             # Maps of Content — navigation hubs
│   ├── HOME.md         # Master index
│   ├── By-Domain.md    # Grouped by knowledge domain
│   ├── By-Phase.md     # Grouped by dev lifecycle phase
│   └── Anti-Pitfalls.md # Consolidated pitfall index
├── 01 Principles/      # One note per extracted resource
├── 02 Workflows/       # Step-by-step execution guides
├── 03 Anti-Patterns/   # Failure modes, traps, rationalization tables
├── 04 Rules/           # .rules.mdc governance files (AI-consumable)
├── 05 Templates/       # Reusable note and spec templates
└── 99 Meta/            # Vault documentation (this file + resource inventory)
```

---

## How to Use as Pre-Init

### Minimal pre-init (5 minutes)
1. Open [[project-pre-init]] checklist
2. Run through all 7 sections
3. Proceed only when all gates pass

### Full pre-init (30 minutes)
1. [[project-pre-init]] checklist
2. Read [[By-Phase]] — Phase 0 and Phase 1 sections
3. Check [[Anti-Pitfalls]] for failure modes relevant to your project type
4. Choose memory architecture: [[mempalace]] or [[cursor-memory-bank]]
5. Load [[ai-principles.rules.mdc]] and [[specops-governance.rules.mdc]] into agent context
6. Run $deep-interview (see [[oh-my-codex]]) before writing spec

### Adding a new project
1. Copy [[project-pre-init]] to your project notes
2. Copy [[specops-spec]] and fill in EARS notation
3. Run [[dependency-gates.rules.mdc]] against your initial dependency list
4. Brief agents using [[agent-brief]] template

---

## How to Add New Resources

When a new AI resource / methodology appears:

1. Copy [[principle-note]] template
2. Fill all frontmatter fields (type, source, source-path, tags, related)
3. Extract: Core Purpose, Key Principles, Critical Workflow, Anti-Patterns
4. Add [[wikilink]] to relevant MOC files ([[By-Domain]], [[By-Phase]])
5. Check if any new anti-patterns belong in [[agent-failure-modes]] or [[rationalization-tables]]
6. If resource produces governance rules, generate [[rulefy]] `.rules.mdc`

---

## Rules Files Usage

`.rules.mdc` files in `04 Rules/` are formatted for direct agent consumption:

| File | Load When |
|------|-----------|
| [[ai-principles.rules.mdc]] | Every session (alwaysApply: true) |
| [[specops-governance.rules.mdc]] | Every session (alwaysApply: true) |
| [[anti-patterns.rules.mdc]] | Every session (alwaysApply: true) |
| [[dependency-gates.rules.mdc]] | When package.json in context |

In Cursor/Windsurf: add `04 Rules/` as rules directory.
In Claude: paste relevant rules into system prompt or use MCP file server.

---

## Obsidian-Specific Features

- **Graph view:** Tags create color groups. `#methodology` = blue, `#workflow` = green, `#memory` = purple, `#token-optimization` = orange, `#system-design` = red, `#tools` = yellow.
- **Templates:** Configured via `.obsidian/templates.json`. Trigger from command palette: "Insert template".
- **Backlinks:** Every `[[note]]` reference creates a navigable backlink. High-backlink nodes in graph view = high-value principles.

---

## Source Material

All 18+ resources inventoried at [[resource-inventory]].

Primary sources:
- SpecOps methodology (specops/)
- Superpowers (superpowers/)
- Three-Man-Team (three-man-team/)
- oh-my-codex (oh-my-codex/)
- Caveman token compression (caveman/)
- MemPalace Zettelkasten (mempalace/)
- Cursor Memory Bank (cursor-memory-bank/)
- System Design Primer (system-design-primer/)
- REST API Patterns (rest-api-design-patterns/)
- Rulefy (rulefy/)
- MCP Servers (servers-mcp/)
- Awesome Claude Code (awesome-claude-code/)
- OpenClaw (openclaw/)
- Claude Task Master (claude-task-master/)
- Claw-Code-Parity (claw-code-parity/)

---

## Maintenance

- Update [[resource-inventory]] when new resources are added to AI-Resources/
- Review [[agent-failure-modes]] quarterly — new failure modes emerge
- Prune [[rationalization-tables]] when rationalizations become extinct (rare)
- Keep `.rules.mdc` files in sync with principle notes they reference
