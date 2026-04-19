---
type: anti-pattern
severity: critical
tags: [#anti-pattern, #agent-coordination, #multi-agent]
---

# Anti-Pattern: Agent Failure Modes

> The most common ways AI agent workflows break — consolidated from three-man-team, superpowers, specops, oh-my-codex, and claw-code-parity.

---

## FM-1: Coding Without Understanding

**Signal**: Agent writes code in the first 30 seconds without reading the codebase.
**Cost**: Duplicated implementations, wrong abstractions, 30+ minutes of corrections.
**Prevention**: UNDERSTAND phase (specops) or brainstorming (superpowers) must complete first.
**Rule**: [[04 Rules/specops-governance.rules.mdc]] — UNDERSTAND gate.

---

## FM-2: Self-Certification

**Signal**: Agent marks own work as "done" or "working" based on its own assessment.
**Cost**: Bugs reach production. Specs are not verified against implementation.
**Prevention**: Adversarial evaluator (specops) or separate Reviewer agent (three-man-team).
**Rule**: Never mark done without independent review. Score must be ≥7/10.

---

## FM-3: Context Bleed Between Tasks

**Signal**: Task N's implementation is influenced by knowledge or assumptions from Task N-1.
**Cost**: Subtle drift from plan. Hard to debug because the deviation is invisible.
**Prevention**: Fresh subagent per task (superpowers subagent-driven-development).
**Rule**: New subagent = clean context. No context from previous task unless explicitly passed.

---

## FM-4: Notification Flood in Context Window

**Signal**: Agent context fills with coordination messages, event notifications, status updates.
**Cost**: Context window consumed by coordination, not by work. Token budget depleted fast.
**Prevention**: Route notifications OUTSIDE context window (claw-code-parity / clawhip pattern).
**Rule**: [[04 Rules/anti-patterns.rules.mdc]] — context window bloat check.

---

## FM-5: Plan Without Pass/Fail Signal

**Signal**: Plan exists but tradeoffs are presented as "options" without explicit GO/NO-GO.
**Cost**: Executor (ralph/builder) doesn't know which option was chosen. Executes inconsistently.
**Prevention**: $ralplan must produce explicit GO/NO-GO on each tradeoff (oh-my-codex).
**Rule**: Every plan review produces a decision, not a menu.

---

## FM-6: Spec Drift (Silent)

**Signal**: Implementation diverges from spec. No one notices until production.
**Cost**: Spec becomes meaningless. Drift accumulates silently across features.
**Prevention**: 5 automated drift checks (specops). Drift log maintained during implementation.
**Rule**: Any deviation from spec = documented in drift log immediately.

---

## FM-7: Ungated Dependency Addition

**Signal**: Package appears in package.json/requirements.txt without 5-criteria evaluation.
**Cost**: CVE exposure, license liability, bloated bundle, unmaintained dependency.
**Prevention**: Dependency gate (specops, [[04 Rules/dependency-gates.rules.mdc]]).
**Rule**: No install command runs without passing all 5 criteria.

---

## FM-8: Verification Theater

**Signal**: "Tests pass" claimed without tests having been run. Or tests are present but don't cover the changed behavior.
**Cost**: Broken code ships. False confidence.
**Prevention**: `verification-before-completion` skill (superpowers). Evidence required, not assertion.
**Rule**: "It should work" is not evidence. Run it. Show the output.

---

## FM-9: Builder Starts Without Brief

**Signal**: Builder receives a verbal description and starts coding.
**Cost**: Misinterpretation. Rework. Architect deploys something different than intended.
**Prevention**: Written brief required (three-man-team). Brief is the handoff artifact.
**Rule**: No code without written brief. Verbal briefings are pre-brief, not the brief.

---

## FM-10: Recovery Loop Missing

**Signal**: Autonomous agent fails. No retry or recovery mechanism exists. Work is lost.
**Cost**: Full restart required. Agent state lost. Progress lost.
**Prevention**: Recovery loops are first-class design (claw-code-parity).
**Rule**: Every autonomous workflow must define: what does failure look like? What is the recovery path?

---

## Failure Mode Priority Matrix

| FM | Frequency | Severity | Detect Early |
|----|-----------|----------|--------------|
| FM-1 Coding without understanding | Very high | High | Yes — no spec exists |
| FM-2 Self-certification | High | High | Yes — no review step |
| FM-3 Context bleed | Medium | Medium | Harder — subtle drift |
| FM-5 Plan without signal | High | Medium | Yes — plan has no GO/NO-GO |
| FM-7 Ungated dependency | High | High | Yes — no gate record |
| FM-8 Verification theater | Very high | Critical | Yes — no evidence |
