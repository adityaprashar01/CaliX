---
type: anti-pattern
severity: critical
tags: [#anti-pattern, #agent-discipline]
---

# Anti-Pattern: Rationalization Tables

> Every workflow system in these resources includes a "rationalization table" — a list of thoughts that FEEL reasonable but are actually shortcuts that cause failure. This doc consolidates them all.

## The Core Trap
Rationalization feels like judgment. It isn't. It's the brain finding the path of least resistance and dressing it up as a decision.

---

## From agent-skills / superpowers

| Thought | Why It's Rationalization |
|---------|------------------------|
| "This is just a simple question" | Questions are tasks. Skills check comes before answering. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check for skills first. |
| "I can check git/files quickly" | Files lack conversation context. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes time. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. |

## From specops

| Thought | Why It's Rationalization |
|---------|------------------------|
| "The spec is obvious, I'll code first" | Obvious specs have hidden assumptions. 30 min of corrections. |
| "I'll write the spec after I see what the code looks like" | Post-hoc specs rationalize what was built. |
| "This is too small for a full spec" | Size doesn't predict complexity. |
| "The acceptance criteria are implied" | Implied criteria are unverifiable. |
| "I'll add the dependency gate later" | The gate exists specifically because "later" never comes. |

## From superpowers

| Thought | Why It's Rationalization |
|---------|------------------------|
| "Skip brainstorming for this simple task" | "Simple" is where assumptions hide. |
| "Write tests after I get it working" | Tests after always pass — they don't prove correctness. |
| "One big agent session is fine" | Context bleed across tasks causes subtle drift. |
| "I'll review my own code" | Self-review is systematically blind to your assumptions. |
| "We can refactor after it works" | Working = shipped = no refactor budget. |

## From three-man-team

| Thought | Why It's Rationalization |
|---------|------------------------|
| "The brief is in my head" | Verbal briefs lose fidelity. Write it. |
| "I'll show my plan informally" | Informal plan approval = no approval. |
| "The reviewer can be the same person as the builder" | Self-review misses what you can't see. |
| "We can skip review this once for speed" | Skipping review once creates a precedent. |

## From cursor-memory-bank

| Thought | Why It's Rationalization |
|---------|------------------------|
| "I'll start with /build since I know what to do" | /van detects platform and routes complexity. Always first. |
| "I'll edit tasks.md manually to fix this" | Manual edits corrupt the state machine. |
| "/creative is overkill for this feature" | /creative is for genuine design forks — not "overkill," inappropriate |

## The Meta-Pattern
All rationalization follows the same structure:
```
"I [will skip / don't need / can do without] X because [this situation is special / I know better / it's just this once]"
```
The moment you find yourself completing this sentence, **stop**. The sentence itself is the signal.
