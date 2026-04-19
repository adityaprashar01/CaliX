
type: principle
source: specops
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/specops
tags: [#workflow, #spec-driven, #governance, #methodology]
related: [agent-skills, superpowers, three-man-team]
date-extracted: 2026-04-19
---

# SpecOps

## Core Purpose
> Force AI agents to think before coding: structured 4-phase workflow (Understand → Spec → Implement → Complete) with git-tracked specs, EARS notation, adversarial evaluation, dependency governance, and production learnings loop.

## Critical Workflow
```
/specops <feature description>

Phase 1 — UNDERSTAND:  Analyze codebase + context, scope IN/OUT
Phase 2 — SPEC:        requirements.md (EARS), design.md (tradeoffs), tasks.md (ordered)
Phase 3 — IMPLEMENT:   Code from spec, not from assumptions. Drift logged.
Phase 4 — COMPLETE:    Adversarial evaluator scores. All criteria verified. Learnings captured.
```

**Before/After example:**
```
WITHOUT: "Add OAuth" → agent picks JWT, hardcodes Google, skips rate limiting, creates 6 files
  → 30 min of corrections

WITH: /specops → 4 user stories, 12 criteria (EARS), JWT vs sessions tradeoff, 8 ordered tasks
  → Implements against verified criteria
```

## Key Principles
- **P1 — EARS Notation Makes Requirements Unambiguous**: `WHEN [trigger] THE SYSTEM SHALL [behavior]`. Vague acceptance criteria ("works correctly") are blocked. EARS forces precision.
- **P2 — Specs Are Git-Tracked Markdown**: No cloud service, no account, no lock-in. Sessions die; git repos don't. Cross-session recovery is built-in because the spec is a file.
- **P3 — 5 Automated Drift Checks**: After implementation, drift detection compares codebase to spec. Audit and reconcile commands address divergence. Specs don't rot silently.
- **P4 — Adversarial Evaluation Is Structurally Separate**: The evaluator scores spec quality (Phase 2) AND implementation quality (Phase 4) against hard thresholds. Agents praise their own work; a second skeptical pass catches what they missed.
- **P5 — Dependency Governance Is Always Active, No Bypass**: Every new package → 5-criteria gate (scope match, maintenance health, size proportionality, security surface, license compatibility). There is no flag to skip this.
- **P6 — Production Learnings Close the Spec-to-Production Loop**: `/specops learn` captures post-deployment discoveries, links them to originating specs, and surfaces relevant learnings when future specs touch the same code. No other spec tool does this.
- **P7 — Multi-Spec Decomposition for Bounded Contexts**: Large features spanning multiple contexts auto-detected and split into coordinated specs with dependency tracking and initiative orchestration.
- **P8 — 7 Vertical Templates Provide Domain Awareness**: Backend/frontend/infra/data pipeline/library/SDK/fullstack/builder templates. Infrastructure specs include rollback steps. Data pipeline specs include data contracts and backfill strategy. Generic specs miss domain-specific requirements.
- **P9 — Local Memory Layer Loaded Every Session**: Agent decisions from yesterday aren't lost. The local memory layer loads automatically each session — not a nice-to-have, a drift-prevention mechanism.
- **P10 — Enforcement, Not Suggestions**: CI-integrated drift detection, checkbox completion gates, dependency gates, approval workflows — these *block* implementation until specs are approved. SpecOps is not a prompt template.

## EARS Notation Reference
| Pattern | Template |
|---------|----------|
| Event-driven | `WHEN [trigger] THE SYSTEM SHALL [response]` |
| Conditional | `IF [condition] THEN THE SYSTEM SHALL [behavior]` |
| Unwanted | `IF [condition] THE SYSTEM SHALL NOT [behavior]` |
| State-driven | `WHILE [state] THE SYSTEM SHALL [behavior]` |
| Optional feature | `WHERE [feature included] THE SYSTEM SHALL [behavior]` |

## Dependency Governance (5-Criteria Gate)
Before ANY `npm install` / `pip install` / `go get`:
1. **Scope**: Does this genuinely require an external dependency?
2. **Maintenance**: Active commits? Responsive maintainers?
3. **Size**: Footprint proportional to value? Transitive deps?
4. **Security**: Known CVEs? Reputable publisher?
5. **License**: Compatible? Copyleft implications?

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| "The spec is obvious, let's code" | Write the spec | Obvious specs still have hidden assumptions |
| Vague acceptance criteria | EARS notation | "Works correctly" is not testable |
| Adding packages without gate | 5-criteria dependency evaluation | One bad package = CVE, license liability, or 200MB bloat |
| Spec in head, not in git | Git-tracked spec file | Sessions die; git doesn't |
| Agent marking own work done | Adversarial evaluator phase | Self-certification is systematically optimistic |
| Shipping without production learnings capture | /specops learn post-deploy | Specs without feedback loops repeat same mistakes |
| One spec for multi-context feature | Multi-spec decomposition | Cross-context specs create hidden dependencies |

## Integration Points
- Pairs with: [[agent-skills]] (agent-skills `/spec` command triggers spec-driven-development; SpecOps formalizes this further)
- Pairs with: [[superpowers]] (Superpowers' brainstorming + writing-plans map to SpecOps UNDERSTAND + SPEC phases)
- Pairs with: [[three-man-team]] (Architect writes SpecOps spec; Builder implements against it; Reviewer evaluates)
- Powers: [[04 Rules/specops-governance.rules.mdc]]
- Powers: [[05 Templates/specops-spec.md]]

## Pre-Init Checklist
- [ ] Install: `/plugin marketplace add sanmak/specops` or bash install script
- [ ] Initialize in project: `.specops.json` created by `specops init`
- [ ] Choose vertical template: backend/frontend/infra/data-pipeline/library/fullstack/builder
- [ ] Confirm ANTHROPIC_API_KEY set if using dependency gate's AI analysis
- [ ] Run `/specops` on first feature, not on 5th — start the habit early

## Key Quotes
> "Make your AI agent think before it codes." — README tagline
> "The problem isn't the AI. It's that nobody told it to think first." — README
> "Enforcement, not suggestions: CI-integrated drift detection, checkbox completion gates, dependency gates, and approval workflows that block implementation until specs are approved." — README
