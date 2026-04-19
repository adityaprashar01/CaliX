---
type: workflow
source: specops
tags: [#workflow, #spec-driven]
phases: [UNDERSTAND, SPEC, IMPLEMENT, COMPLETE]
related: [superpowers-full-flow, three-man-team-flow]
---

# Workflow: SpecOps 4-Phase

## Purpose
> Force structured thinking before any code is written. For any feature, bug fix, or significant change — run this before opening an editor.

## Trigger
Invoke when: starting any new feature, making significant changes, or any work that spans multiple files or touches existing behavior.

---

## Phase 1 — UNDERSTAND

**Goal**: Know what exists. Know what you're actually building. Eliminate assumptions.
**Input**: Feature description or task brief
**Output**: Scope document (IN/OUT), unknowns list, existing code inventory

**Steps**:
1. Read relevant codebase areas — do not start fresh without reading
2. Identify what already exists that addresses any part of the request
3. Define explicit scope: what is IN, what is OUT
4. List unknowns — resolve or explicitly defer them
5. Note related systems/components that will be affected

**Gate**: Cannot proceed until scope is documented and unknowns are listed.

---

## Phase 2 — SPEC

**Goal**: Requirements precise enough to implement without asking questions during implementation.
**Input**: Scope document from UNDERSTAND
**Output**: `requirements.md` (EARS), `design.md` (tradeoffs), `tasks.md` (ordered)

**Steps**:
1. Write requirements in EARS notation: `WHEN [trigger] THE SYSTEM SHALL [behavior]`
2. Write design document: options considered, tradeoff analysis, decision + rationale
3. Break into ordered tasks with dependencies and effort estimates
4. Run dependency gate for any new packages: 5-criteria evaluation
5. Commit spec to git before proceeding

**Gate**: All requirements in EARS. Acceptance criteria measurable. Spec committed.

---

## Phase 3 — IMPLEMENT

**Goal**: Code exactly what the spec says. No spec amendments without documentation.
**Input**: `tasks.md`, `requirements.md`, `design.md`
**Output**: Working code, drift log if spec amendments made

**Steps**:
1. Implement each task in dependency order
2. Write tests before or alongside implementation (never after)
3. If implementation diverges from spec: document divergence in drift log, don't silently deviate
4. No new scope without spec amendment
5. Review drift log before moving to COMPLETE

**Gate**: All tasks complete. Drift log reconciled.

---

## Phase 4 — COMPLETE

**Goal**: Adversarial verification that the spec was actually met.
**Input**: Completed implementation + acceptance criteria
**Output**: Adversarial evaluation score, production learnings (post-deploy)

**Steps**:
1. Run adversarial evaluation: score implementation against acceptance criteria (must be ≥ 7/10)
2. Verify every acceptance criterion with evidence (not "it should work")
3. Check for spec drift — is the implementation consistent with the spec?
4. Post-deployment: run `/specops learn` to capture discoveries that specs missed

**Gate**: Adversarial score ≥ 7/10. All criteria verified. Learnings captured.

---

## Handoffs
| From | To | Artifact |
|------|----|----------|
| UNDERSTAND | SPEC | Scope doc + unknowns list |
| SPEC | IMPLEMENT | requirements.md + design.md + tasks.md (git-committed) |
| IMPLEMENT | COMPLETE | All tasks complete + drift log |
| COMPLETE | Production | Adversarial score ≥ 7 + evidence |

## Failure Modes
| Failure | Signal | Recovery |
|---------|--------|----------|
| Skipped UNDERSTAND | Discovering existing code mid-implementation | Stop. Read. Restart UNDERSTAND. |
| Vague acceptance criteria | "Works correctly" or "behaves as expected" | Stop SPEC phase. Rewrite in EARS. |
| Spec drift unlogged | Implementation differs from spec with no record | Audit codebase vs spec. Write drift log retroactively. |
| Self-certification | Agent marks own work complete without adversarial pass | Run adversarial evaluation with skepticism prompting |

## Anti-Rationalization
| Temptation | Reality |
|------------|---------|
| "The spec is obvious, I'll code first" | Obvious specs have hidden assumptions that cost 30 min of corrections |
| "I'll write the spec after I see what the code looks like" | Post-hoc specs rationalize what was built, not what was needed |
| "This is too small for a full spec" | Size doesn't predict complexity. Rate limiting seems small. |

## Related
- [[01 Principles/specops]] — source resource
- [[05 Templates/specops-spec]] — spec template
- [[04 Rules/specops-governance.rules.mdc]] — enforcement rules
