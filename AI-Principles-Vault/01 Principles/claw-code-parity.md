
type: principle
source: claw-code-parity
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/claw-code-parity
tags: [#philosophy, #multi-agent, #automation, #human-ai-interface]
related: [oh-my-codex, three-man-team]
date-extracted: 2026-04-19
---

# Claw Code Parity

## Core Purpose
> A live demonstration that an open coding harness can be built autonomously, in public, at high velocity — with humans setting direction and agents doing the grinding — using Discord as the human interface and clawhip/OmO/OmX as the coordination layer.

## Key Principles
- **P1 — Humans Set Direction; Claws Do Labor**: The bottleneck shifted from typing speed to architectural clarity, task decomposition, and judgment. Humans provide direction and taste; agents handle grinding. What still matters: product taste, direction, system design, human trust, operational stability.
- **P2 — Discord as Human Interface**: Not a terminal, not SSH, not Vim. The human interacts through a Discord channel. This is intentional: it removes friction between direction-setting and agent execution, and keeps the human in the right role (strategic, not tactical).
- **P3 — Notifications Outside the Context Window**: clawhip routes events and notifications away from agent context windows. This is the key architectural insight — every notification that lands in the context window is tokens that aren't being used for work. Push coordination out; keep context for content.
- **P4 — Repo Is Artifact, Coordination System Is the Product Lesson**: The actual code in this repo is secondary. The real lesson is the coordination system: OmX (workflow layer) + clawhip (event router outside context) + OmO (oh-my-openagent multi-agent coordination). The repo demonstrates the system, not the other way around.
- **P5 — Autonomous Development in Public Has Trust Requirements**: Legal and ethical questions about AI-generated code require explicit ownership and attribution. The repo explicitly disclaims affiliation with Anthropic and ownership of original source material. Autonomous builds need clear provenance.
- **P6 — The 3-Part System Separates Concerns**: OmX = what agents do (workflow). clawhip = how they're notified (events). OmO = how they coordinate (multi-agent). Each layer is replaceable independently.
- **P7 — Recovery Loops Are First-Class**: Autonomous builds fail. Recovery loops, retry mechanisms, and failure-state detection are not edge cases — they're part of the standard coordination design.

## 3-Part Coordination Architecture
| Layer | Tool | Role |
|-------|------|------|
| Workflow | OmX (oh-my-codex) | What agents do |
| Events | clawhip | Notification routing OUTSIDE context window |
| Multi-agent | OmO (oh-my-openagent) | Cross-agent coordination |

## What Still Matters (Human Skills)
Even with full agent autonomy:
- Product taste
- Direction setting
- System design judgment
- Human trust in the process
- Operational stability decisions
- Knowing when agents are wrong

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Letting notifications land in agent context | Route via clawhip OUTSIDE context | Every notification in context = tokens not used for work |
| Humans doing tactical implementation work | Humans set direction; agents execute | Tactical involvement re-creates the original bottleneck |
| Building coordination system after the fact | Design coordination layer upfront | Retrofitting coordination onto built systems is 3× harder |
| Ignoring recovery loops | Recovery loops are first-class design requirements | Autonomous builds fail; recovery paths must be planned |
| Treating autonomous builds as ownership-free | Explicit attribution + provenance + disclaimer | Legal and ethical questions have real consequences |

## Integration Points
- Pairs with: [[oh-my-codex]] (OmX is one of the three layers in the coordination system)
- Pairs with: [[three-man-team]] (three-man-team formalizes the human-direction pattern with Architect as the human's proxy)

## Pre-Init Checklist
- [ ] Determine human interface channel (Discord, Slack, etc.) — not terminal
- [ ] Design clawhip (or equivalent) notification routing BEFORE building agent loops
- [ ] Define what "direction" means vs what "execution" means for your project
- [ ] Establish recovery loop patterns for each agent failure mode
- [ ] Write explicit attribution/ownership policy for AI-generated code

## Key Quotes
> "humans set direction; claws perform labor" — PHILOSOPHY.md
> "bottleneck changed from typing speed to architectural clarity, task decomposition, judgment" — PHILOSOPHY.md
> "Repository is artifact; coordination system is product lesson" — README
