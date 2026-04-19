
type: principle
source: rulefy
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/rulefy
tags: [#tooling, #cursor, #convention-extraction, #rules]
related: [awesome-claude-code, agent-skills]
date-extracted: 2026-04-19
---

# Rulefy

## Core Purpose
> One-command tool that transforms a GitHub repo or local codebase into a custom `.rules.mdc` file for Cursor AI — extracting project conventions, architecture, and coding standards so the AI immediately understands how your project works.

## Key Principles
- **P1 — Convention Extraction, Not Manual Rule Writing**: Instead of writing Cursor rules from scratch, rulefy analyzes the actual codebase and generates rules grounded in what already exists. Rules reflect reality, not aspiration.
- **P2 — One Command, Intelligent Output**: `rulefy <repo-path>` or `rulefy --remote <github-url>`. No configuration required for basic usage. Claude AI (Anthropic API) does the analysis.
- **P3 — Handles Large Codebases via Chunking**: Large repos exceeding LLM token limits are chunked. `--chunk-size` controls how much is processed per pass (default 100K). Rules are generated from analyzed chunks, not from a truncated view.
- **P4 — 4 Rule Types for Different Use Cases**: `auto` (Cursor decides when to apply), `manual` (only when referenced), `agent` (always active in agent mode), `always` (active in every request). Match rule type to how the rule should be used.
- **P5 — Context Minimization Options**: `--compress` reduces token usage. `--include "src/**/*.ts"` scopes to relevant files. `--exclude` removes noise. `--description` guides what aspects to extract. These aren't optional — large repos without scoping produce bloated rules.
- **P6 — Output Is Immediate-Use .rules.mdc**: Generated file installs directly in Cursor without transformation. Structure: Project Overview → Coding Standards → File Structure Guidelines → specific conventions.
- **P7 — Built on repomix for Repo Packing**: Rulefy inherits all repomix options (the tool that packs repos into LLM-readable format). Any repomix configuration flag works with rulefy.

## Critical Workflow
```
# Basic: analyze current directory
rulefy

# Local path
rulefy ./my-project/

# GitHub URL
rulefy --remote https://github.com/org/repo

# Scoped + compressed (recommended for large repos)
rulefy --include "src/**/*.ts,src/**/*.tsx" --compress

# With description for specific focus
rulefy --description "guidelines for extending components using base interface"

# Agent rule type
rulefy --rule-type agent --description "coding standards for React components"

# After generation: install in Cursor
# Settings > AI > Rules > Add Rules File > select <repo-name>.rules.mdc
```

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Running rulefy on full monorepo without scoping | `--include` to scope to relevant subdir | Unfocused rules are diluted and less useful |
| One massive rule file for all concerns | Separate rule files per concern (component rules, API rules, etc.) | Focused rules activate at the right time |
| Running without description for complex codebases | `--description` guides extraction focus | Without description, Claude extracts what it deems important, which may not match your priority |
| Treating generated rules as final | Review and edit generated rules | AI extraction may miss subtle conventions or include irrelevant ones |
| ANTHROPIC_API_KEY not set | Set before running | Rulefy requires Claude API access — will fail without it |

## Integration Points
- Pairs with: [[awesome-claude-code]] (awesome-claude-code shows real CLAUDE.md patterns; rulefy generates Cursor rule equivalents)
- Pairs with: [[agent-skills]] (agent-skills define what good code looks like; rulefy extracts what your code actually does)
- Use at project init to generate baseline rules before writing CLAUDE.md

## Pre-Init Checklist
- [ ] `export ANTHROPIC_API_KEY='...'` in shell profile
- [ ] Node.js 18+ installed (`npm install -g rulefy` or use `npx rulefy`)
- [ ] Decide scope: full repo vs specific subdirectory
- [ ] Write `--description` that captures the most important aspect to extract
- [ ] Plan rule type: `agent` for always-active coding standards, `manual` for reference-only patterns

## Key Quotes
> "Supercharge your Cursor AI with codebase-specific intelligence." — README
> "Fewer Hallucinations: Rules constrain the AI to work within your codebase's patterns and dependencies." — README
