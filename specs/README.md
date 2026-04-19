# CaliX Specs

## EARS Notation

All specs use EARS (Easy Approach to Requirements Syntax):

- **Ubiquitous:** `The <system> shall <action>.`
- **Event-driven:** `When <trigger>, the <system> shall <action>.`
- **State-driven:** `While <state>, the <system> shall <action>.`
- **Optional:** `Where <feature>, the <system> shall <action>.`
- **Unwanted:** `If <condition>, then the <system> shall <action>.`

## 4-Phase Workflow (SpecOps)

1. **UNDERSTAND** — Read the requirement. Ask clarifying questions.
2. **SPEC** — Write the spec in EARS notation with acceptance criteria.
3. **IMPLEMENT** — Build against the spec. Tests for every criterion.
4. **COMPLETE** — Adversarial self-review scored /10, must be >= 7.

No phase may be skipped.
