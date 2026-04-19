---
type: spec
project: <project-name>
feature: <feature-name>
vertical: [backend|frontend|infra|data-pipeline|library|fullstack|builder]
status: [UNDERSTAND|SPEC|IMPLEMENT|COMPLETE]
created: <YYYY-MM-DD>
specops-version: 1.6.0
---

# Spec: <Feature Name>

## Phase 1 — UNDERSTAND

### Context
What codebase area does this touch? What exists already?

### Scope
- **In scope**: ...
- **Out of scope**: ...

### Unknowns
- [ ] ...

---

## Phase 2 — SPEC

### Requirements (EARS Notation)
<!-- Format: WHEN [trigger/event] THE SYSTEM SHALL [behavior] -->
- WHEN ... THE SYSTEM SHALL ...
- WHEN ... THE SYSTEM SHALL ...
- IF ... THEN THE SYSTEM SHALL ...

### Design
<!-- Architecture decision, data flow, key components -->

### Acceptance Criteria
- [ ] ...
- [ ] ...

### Dependency Gate
<!-- For every new package — must pass all 5 criteria -->
| Package | Scope Justified | Maintained | Size OK | Security OK | License OK |
|---------|----------------|------------|---------|-------------|------------|
| ...     | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |

### Task Breakdown
1. [ ] ...
2. [ ] ...

---

## Phase 3 — IMPLEMENT

### Notes
<!-- Capture decisions made during implementation -->

### Drift Log
<!-- If implementation diverged from spec, document here -->

---

## Phase 4 — COMPLETE

### Adversarial Evaluation
Score (1-10): __
- [ ] All acceptance criteria met
- [ ] No spec drift unaddressed
- [ ] Edge cases handled
- [ ] Tests written

### Production Learnings
<!-- Post-deployment — what spec didn't capture? Link back here. -->
