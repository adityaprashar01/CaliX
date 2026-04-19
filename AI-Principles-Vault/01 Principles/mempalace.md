
type: principle
source: mempalace
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/mempalace
tags: [#memory, #token, #zettelkasten, #retrieval, #local-first]
related: [caveman, cursor-memory-bank]
date-extracted: 2026-04-19
---

# MemPalace

## Core Purpose
> Local-first verbatim conversation memory with Zettelkasten wings/rooms/closets/drawers architecture and semantic retrieval — solves agent amnesia without API calls, cloud dependency, or session token re-transmission cost.

## Key Principles
- **P1 — Verbatim, Not Summary**: MemPalace stores conversations as exact text, never summarizing or paraphrasing. Summaries introduce lossy compression and retrieval errors. Index is structured; content is raw.
- **P2 — Zettelkasten Architecture**: People/projects → wings. Topics → rooms. Compressed index entries → closets. Full original content → drawers. Scope-narrowed search from any angle — not a flat corpus scan.
- **P3 — AAAK Compression for Closets**: Compresses names, repeated words, concepts, and key moments into AI-readable shorthand in closets. Two-tier: closet tells WHERE to look; drawer holds full verbatim content. Index fast, retrieve full.
- **P4 — V4 Philosophy: Move Noise Off Chat Into Background Hooks**: V3 lesson: hooks firing in chat window consumed tokens AND caused agents to repeat identical writes. V4 moves all diary writes, palace filing, and timestamp injection to background subagents. What used to cost ~$1.13/session in re-transmitted diary blocks now costs zero.
- **P5 — Session → JSON → Markdown → AAAK Pipeline**: Claude stores data as JSON natively. Background pipeline extracts to markdown, compresses key topics to AAAK for closets, points to drawer where session lives. Invisible during conversation.
- **P6 — Pluggable Retrieval Backend**: ChromaDB default, but interface defined for drop-in replacement. No vendor lock-in on retrieval layer. ~300 MB disk for default embedding model.
- **P7 — Hybrid Retrieval Compounds Semantic Search**: Raw semantic search alone: 96.6% R@5 on LongMemEval (500 questions, no LLM). Hybrid v4 (keyword + temporal-proximity boosting): 98.4% on held-out data. LLM rerank on top: ≥99%. Each tier is optional — add only what you need.
- **P8 — Temporal Knowledge Graph with Validity Windows**: Entity-relationship graph backed by local SQLite. Facts can expire — system tracks when they stop being true. Not just "who said what" but "what was true when."
- **P9 — Agent-Per-Wing Isolation**: Each specialist agent gets its own wing and diary. Discoverable at runtime via `mempalace_list_agents` — no bloat in system prompt. Context scoped to the agent that needs it.

## Critical Workflow
```
MINE:     mempalace mine ~/projects/myapp           # index project files
          mempalace mine ~/chats/ --mode convos      # index conversation exports
SEARCH:   mempalace search "why did we switch to GraphQL"
WAKE-UP:  mempalace wake-up                         # load context for new session
HOOKS:    Two Claude Code hooks — fire on session start + before context compression

BACKGROUND PIPELINE (invisible during chat):
  Chat session → JSON (Claude native) → markdown extraction → AAAK closet compression → drawer write
```

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Testing with production files first | Run with throwaway data first | New tool; irreversible writes possible |
| Running hooks in chat window (V3) | Background hook subagents (V4) | Chat-window hooks consume tokens and cause duplicate writes |
| Expecting keyword search to work | Semantic search + scope to wing/room | Flat keyword fails vague recall queries |
| Using cloud memory for sensitive data | Keep local (default) | Nothing leaves machine unless you opt in |
| Cross-system benchmark comparisons | Check per-metric (R@5 ≠ QA accuracy) | Different evaluation types not comparable |

## Integration Points
- Pairs with: [[caveman]] (cavemem is caveman ecosystem's memory layer; AAAK ≈ caveman-compress for storage)
- Pairs with: [[cursor-memory-bank]] (memory-bank = local markdown; mempalace = structured semantic — complementary)
- Precedes long sessions where context re-loading would otherwise cost tokens

## Pre-Init Checklist
- [ ] Python 3.9+ installed
- [ ] ChromaDB or alternative backend ready (~300 MB disk for default embedding model)
- [ ] Confirm no API key required for core path (zero cloud dependencies)
- [ ] Test mine + search on non-critical data before indexing production files
- [ ] Configure Claude Code auto-save hooks (session start + before context compression)
- [ ] Decide agent-per-wing isolation strategy before first mine run

## Key Quotes
> "MemPalace is not just about storing info in a highly structured way. But also RETRIEVING it in a highly UNSTRUCTURED way." — MISSION.md
> "What used to cost about $1.13 per session just in re-transmitted diary blocks is now zero, because the content never enters the chat window at all." — MISSION.md
> "The closet tells it WHERE to look, then it pulls the full content from the drawer." — MISSION.md
