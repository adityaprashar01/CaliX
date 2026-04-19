
type: principle
source: caveman
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/caveman
tags: [#token, #compression, #output-efficiency, #agent-communication]
related: [mempalace, cursor-memory-bank]
date-extracted: 2026-04-19
---

# Caveman

## Core Purpose
> Reduce AI agent output tokens by ~75% through enforced terse communication style — without loss of technical accuracy — so agents respond faster, cost less, and are easier to read.

## Key Principles
- **P1 — Output Tokens Only**: Caveman compresses what the model *says*, not what it *thinks*. Reasoning tokens untouched. Only the mouth gets smaller, not the brain. Cost savings come from output side only.
- **P2 — Fluff Is Structural Noise**: Articles, filler (just/really/basically), pleasantries, hedging add zero semantic content. Mechanical removals, not paraphrasing. Pattern: `[thing] [action] [reason]. [next step].`
- **P3 — 4 Intensity Levels**: Lite (drop filler, keep grammar), Full (drop articles, use fragments — default), Ultra (telegraphic, abbreviate everything), Wenyan (Classical Chinese literary form — most token-efficient written language ever invented). Wrong level for audience wastes the technique.
- **P4 — 65% Average Masks Task Variance**: Benchmarks across 10 tasks: 22%–87% savings range. Refactoring callbacks (22%) compresses poorly. Explaining re-render bugs (87%) compresses extremely well. Tasks with more prose yield higher savings.
- **P5 — Brevity Can Improve Accuracy**: arXiv:2604.00025 (March 2026) — brevity constraints improved accuracy by 26 percentage points and reversed performance hierarchies. Verbose is not more correct; it can mask reasoning errors under padding.
- **P6 — caveman-compress Attacks the Input Side**: While caveman mode reduces output tokens, `caveman-compress` rewrites memory files (CLAUDE.md etc.) into caveman-speak. Average ~46% input savings across prose files. Code, URLs, paths, commands, dates pass through untouched.
- **P7 — Auto-Clarity Has Security Exceptions**: Critical security warnings must NOT be compressed. The always-on config explicitly exempts security alerts — misread severity has real consequences.
- **P8 — Mode Persists Until Explicitly Reverted**: "stop caveman" or "normal mode" reverts. No drift back to verbose defaults — this is the key failure mode of prompt-only terseness approaches.
- **P9 — Three Ecosystem Tools Compose**: `caveman` (output) + `cavemem` (persistent compressed memory) + `cavekit` (spec-driven build loop) — independent but composable.

## Critical Workflow
```
SESSION START: auto-activates via SessionStart hook (Claude Code / Codex / Gemini)
/caveman [lite|full|ultra|wenyan]  → sets intensity for session
/caveman-commit                    → Conventional Commits (≤50 char subject, why over what)
/caveman-review                    → one-line PR: "L42: 🔴 bug: user null. Add guard."
/caveman:compress <filepath>       → rewrites memory files, preserves .original.md backup
"stop caveman" / "normal mode"     → revert to full verbosity
```

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Compressing code blocks | Only compress prose | Code syntax is load-bearing; caveman-compress skips code by design |
| Ultra for non-technical audiences | Lite for mixed audiences | Ultra is telegraphic and confuses non-engineers |
| Compressing security warnings | Full verbosity for security | Misread severity = real consequences |
| Prompt-only always-on without hooks | Use SessionStart hooks | Cursor/Windsurf/Cline don't auto-activate without explicit hook/rule |
| Comparing to verbose Claude only | Three-arm eval (verbose vs terse vs skill) | Generic terseness ≠ the skill |

## Integration Points
- Pairs with: [[mempalace]] (cavemem stores compressed memory; caveman compresses agent speech — orthogonal)
- Pairs with: [[cursor-memory-bank]] (memory-bank reduces loaded rule tokens; caveman reduces output tokens — stack both)
- Pairs with: [[three-man-team]] (token discipline rules in three-man-team; caveman implements them)

## Pre-Init Checklist
- [ ] Determine target agent — install method differs per platform
- [ ] Decide intensity: Lite for mixed audiences, Full for solo dev, Ultra for pure token minimization
- [ ] For Cursor/Windsurf/Cline always-on: manually add always-on snippet to rules file (install script does NOT do this)
- [ ] For CLAUDE.md compression: run `/caveman:compress CLAUDE.md`, verify `.original.md` backup created
- [ ] Confirm security-related content is excluded from auto-compression

## Key Quotes
> "why use many token when few do trick" — README
> "Caveman only affects output tokens — thinking/reasoning tokens are untouched. Caveman no make brain smaller. Caveman make *mouth* smaller." — README
