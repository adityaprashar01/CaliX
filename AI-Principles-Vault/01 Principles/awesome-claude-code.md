

# Awesome Claude Code

## Core Purpose
> Curated library of real-world CLAUDE.md files, plugins, and workflow guides from 25+ production projects — showing how teams actually configure Claude Code context, not theoretical best practices.

## Key Principles
- **P1 — CLAUDE.md Is the Project's Cognitive Context**: CLAUDE.md tells Claude who the project is, what conventions it follows, what to avoid, and how to work within it. Every project should have one. It's not documentation — it's operational context.
- **P2 — Context Files Range from 1KB to 25KB**: Real projects show a wide range. Short CLAUDE.md files (1-2KB) focus on key conventions only. Longer ones (15-25KB) include full tech stack, architectural decisions, forbidden patterns, and workflow instructions. Match length to context complexity, not completeness aspiration.
- **P3 — Forbidden Patterns Section Is the Most Valuable**: The highest-ROI section in any CLAUDE.md is "what NOT to do." Real projects use it to prevent Claude from: adding unnecessary abstractions, breaking existing patterns, adding comments that describe what code does, using forbidden libraries, etc.
- **P4 — Tech Stack Declaration Prevents Hallucination**: Explicitly listing the tech stack (versions, chosen libraries, frameworks) prevents Claude from suggesting alternatives or hallucinating API calls from wrong library versions.
- **P5 — Workflow Instructions Replace Prompt Engineering**: Instead of prompting Claude correctly every session, encode the workflow in CLAUDE.md: "when adding a new endpoint, follow pattern in src/routes/example.ts," "always check for existing utilities in lib/ before implementing," etc.
- **P6 — Plugin Ecosystem Extends Claude Code Significantly**: Plugins (superpowers, specops, agent-skills, caveman, etc.) are loaded alongside CLAUDE.md. The combination of project context (CLAUDE.md) + methodology skills (plugins) is more powerful than either alone.
- **P7 — Cross-Project Patterns Emerge from the Corpus**: The awesome-claude-code collection shows recurring patterns: always having a testing section, specifying git workflow, listing the main directories, and explaining what "done" means for the project.

## CLAUDE.md Structure Patterns (from real projects)

### Minimal Effective CLAUDE.md (~2KB)
```markdown
# Project Name

## Tech Stack
- Node.js 20, TypeScript 5.x, Fastify 4.x, PostgreSQL 15
- Testing: Vitest, Supertest

## Key Conventions
- All endpoints in src/routes/ following pattern in src/routes/health.ts
- Database queries through src/db/queries/ — never raw SQL in routes
- Error handling: throw AppError(code, message) — middleware catches

## Never Do
- Add console.log to production code
- Import from node_modules not in package.json
- Create abstract base classes unless feature is used 3+ times
```

### Full CLAUDE.md (~10KB) adds:
- Architecture overview with diagram
- Complete directory structure with purpose of each dir
- Code examples of correct patterns
- Testing requirements per component type
- Git workflow (branch naming, commit format, PR requirements)
- Security requirements (never log PII, always validate at boundary)
- Performance requirements (response time targets)
- Deployment process overview

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Generic CLAUDE.md copied from a template | Write project-specific context | Generic context is noise; specific context is signal |
| No "never do" section | Always include forbidden patterns | Claude defaults to common patterns; project-specific prohibitions require explicit listing |
| Aspiration CLAUDE.md ("we follow clean code principles") | Observable CLAUDE.md ("all routes follow pattern in src/routes/health.ts") | Aspirational guidance is unactionable; concrete examples are followable |
| Setting it once and never updating | Update CLAUDE.md when conventions change | Stale CLAUDE.md causes confident incorrect suggestions |
| One massive global CLAUDE.md for monorepo | Per-package CLAUDE.md files | Scoped context is more focused and less noisy |

## Integration Points
- Pairs with: [[rulefy]] (rulefy generates Cursor rules from codebases; CLAUDE.md does the same for Claude Code)
- Pairs with: [[agent-skills]] (`context-engineering` skill covers how to structure agent context)
- Pairs with: [[servers-mcp]] (MCP server configuration belongs in CLAUDE.md)
- Powers: [[04 Rules/ai-principles.rules.mdc]] (this vault's own CLAUDE.md-equivalent)

## Pre-Init Checklist
- [ ] Create CLAUDE.md at project root before first Claude Code session
- [ ] Include tech stack with exact versions
- [ ] Include at least 3 "never do" items specific to this project
- [ ] Reference a concrete example file for each convention
- [ ] Include testing requirements and what "done" means for this project
- [ ] Review and update CLAUDE.md at end of each sprint
---
type: principle
source: awesome-claude-code
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/awesome-claude-code
tags: [#tooling, #claude-code, #context-engineering, #CLAUDE-md]
related: [rulefy, agent-skills, servers-mcp]
date-extracted: 2026-04-19
---