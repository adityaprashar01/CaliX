---
type: pre-init
project: <project-name>
date: <YYYY-MM-DD>
status: [not-started|in-progress|complete]
---

# Pre-Init Checklist: <Project Name>

> Run this BEFORE writing any code. Every unchecked item is a future incident.

---

## 1. Understand Before Spec

- [ ] Read existing codebase (if any) — no assumptions
- [ ] Document what already exists (avoid re-implementing)
- [ ] Define scope: what's IN, what's OUT
- [ ] Identify unknowns → resolve before speccing
- [ ] [[02 Workflows/specops-4-phase]] — UNDERSTAND phase complete

## 2. Spec Before Code

- [ ] Write spec using [[05 Templates/specops-spec]] template
- [ ] All requirements in EARS notation: `WHEN [...] THE SYSTEM SHALL [...]`
- [ ] Acceptance criteria defined and measurable
- [ ] Design decision documented (not just "use X")
- [ ] Spec committed to git before implementation starts

## 3. Governance Gates

- [ ] Every new dependency passes [[04 Rules/dependency-gates.rules.mdc]] (5-criteria)
- [ ] No packages added without scope justification
- [ ] Security checklist reviewed for the domain

## 4. Agent Setup (if using multi-agent)

- [ ] Team structure defined: Architect / Builder / Reviewer
- [ ] Handoff artifacts specified ([[02 Workflows/three-man-team-flow]])
- [ ] Token discipline plan: caveman mode? mempalace?
- [ ] Communication style set ([[01 Principles/caveman]])

## 5. Anti-Pattern Review

- [ ] Reviewed [[03 Anti-Patterns/rationalization-tables]] — none apply
- [ ] Reviewed [[03 Anti-Patterns/agent-failure-modes]] — mitigations in place
- [ ] If system design involved: [[03 Anti-Patterns/system-design-traps]] checked

## 6. Quality Gates

- [ ] TDD approach confirmed (tests before implementation)
- [ ] Verification criteria defined (how will we know it works?)
- [ ] Adversarial evaluator identified (who scores the output?)
- [ ] Production learnings capture plan exists

## 7. Knowledge Base Check

- [ ] Which principles from [[00 MOC/By-Phase]] apply to this project?
- [ ] Any workflows from [[00 MOC/By-Domain]] to follow?
- [ ] This pre-init doc committed/saved for future reference

---

## Notes
<!-- Anything project-specific not covered above -->
