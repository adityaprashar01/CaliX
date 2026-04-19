---
type: meta
tags: [meta, inventory, sources]
date-updated: 2026-04-19
---

# Resource Inventory

Full inventory of source materials from `/Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/`.

---

## Extracted Resources

| Resource | Source Path | Vault Note | Type |
|----------|-------------|------------|------|
| SpecOps | `AI-Resources/specops/` | [[specops]] | Methodology |
| Superpowers | `AI-Resources/superpowers/` | [[superpowers]] | Methodology |
| Three-Man-Team | `AI-Resources/three-man-team/` | [[three-man-team]] | Pattern |
| oh-my-codex | `AI-Resources/oh-my-codex/` | [[oh-my-codex]] | Methodology |
| Agent Skills | `AI-Resources/agent-skills/` | [[agent-skills]] | Reference |
| Caveman | `AI-Resources/caveman/` | [[caveman]] | Technique |
| MemPalace | `AI-Resources/mempalace/` | [[mempalace]] | Architecture |
| Cursor Memory Bank | `AI-Resources/cursor-memory-bank/` | [[cursor-memory-bank]] | Architecture |
| Claw-Code-Parity | `AI-Resources/claw-code-parity/` | [[claw-code-parity]] | Architecture |
| System Design Primer | `AI-Resources/system-design-primer/` | [[system-design-primer]] | Reference |
| REST API Patterns | `AI-Resources/rest-api-design-patterns/` | [[rest-api-patterns]] | Reference |
| Rulefy | `AI-Resources/rulefy/` | [[rulefy]] | Tool |
| MCP Servers | `AI-Resources/servers-mcp/` | [[servers-mcp]] | Tool |
| Awesome Claude Code | `AI-Resources/awesome-claude-code/` | [[awesome-claude-code]] | Reference |
| OpenClaw | `AI-Resources/openclaw/` | [[openclaw]] | Tool |
| Claude Task Master | `AI-Resources/claude-task-master/` | [[claude-task-master]] | Tool |

---

## Source Root

```
/Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/
```

---

## Extraction Method

Each resource was read from its `README.md` (primary) and supplementary files where README was insufficient. Extraction followed [[principle-note]] template:

1. Core Purpose (1–2 sentences)
2. Key Principles (structured list or table)
3. Critical Workflow (step-by-step or phase diagram)
4. Anti-Patterns (table with signal + cost)
5. Integration Points (how this resource connects to others)

Extraction date: **2026-04-19**

---

## Resources Not Yet Extracted

Check `AI-Resources/` for any directories not in the "Extracted" table above. For each unextracted resource:

1. Copy [[principle-note]] template
2. Read `<resource>/README.md`
3. Fill all sections
4. Add to this inventory table
5. Backlink from relevant [[By-Domain]] and [[By-Phase]] sections

---

## Key Cross-References

These resources reference each other — understanding the connections matters:

```
specops ←→ superpowers (phase alignment)
three-man-team ←→ agent-skills (role+skill mapping)
mempalace ←→ cursor-memory-bank (competing memory architectures)
caveman ←→ mempalace (token compression synergy)
rulefy ←→ specops (spec → rules pipeline)
oh-my-codex ←→ three-man-team ($team skill uses TMT pattern)
claude-task-master ←→ specops (PRD → EARS tasks pipeline)
servers-mcp ←→ agent-skills (MCP tools as agent capabilities)
```

---

## Citation: Caveman arXiv Paper

- **Title:** Token compression via natural language degradation
- **Reference:** arXiv:2604.00025
- **Claim:** 22%–87% token reduction across 4 intensity levels
- **Vault note:** [[caveman]]

---

## Vault Created

- **Date:** 2026-04-19
- **Creator:** Manu Hegde
- **Source count:** 16 resources extracted, ~2 directories unreviewed
- **Total vault notes:** 32 (16 principles + 4 workflows + 3 anti-patterns + 4 rules + 5 templates + 4 MOC + 2 meta = 38 files)
