
type: principle
source: openclaw
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/openclaw
tags: [#tooling, #agent-orchestration, #multi-agent, #platform]
related: [claw-code-parity, oh-my-codex, servers-mcp]
date-extracted: 2026-04-19
---

# OpenClaw

## Core Purpose
> Open-source agent orchestration platform with extensible plugin SDK, multi-channel communication (Discord, Signal, Google Chat), multi-platform apps (Android, iOS, macOS), and a gateway protocol for managing agent lifecycles.

## Key Principles
- **P1 — Platform, Not Just a Script**: OpenClaw is infrastructure for agent orchestration — gateway protocol, plugin system, channel integrations, agent lifecycle management. It's the difference between a workflow and a product.
- **P2 — Plugin SDK Enables Extensibility**: The core platform is intentionally minimal. Domain-specific capabilities (memory, voice, Discord, Zalo, Twitch) are plugins. Build on the SDK to extend; don't fork the core.
- **P3 — Channel Abstraction = Write Once, Deploy Everywhere**: The channel abstraction (Discord, Signal, Google Chat, etc.) means agent logic is written once and deployed to any channel. Channel-specific code stays in the channel adapter, not in agent logic.
- **P4 — Multi-Platform Apps Solve the Human Interface Problem**: Where claw-code-parity uses Discord as human interface, OpenClaw provides native apps (Android, iOS, macOS) for the same purpose. Human-agent interaction needs a first-class interface, not a hacked CLI.
- **P5 — Agent Lifecycle Management Is a First-Class Concern**: Spawning, monitoring, recovering, and terminating agents are orchestration concerns. OpenClaw's gateway protocol handles these. Ad-hoc agent management = unrecoverable state when things go wrong.

## Architecture Overview
```
Gateway Protocol
    ↓
Plugin System ← Plugin SDK
    ↓
Channel Adapters (Discord, Signal, Google Chat, Zalo, Twitch, nostr)
    ↓
Agent Lifecycle (spawn, monitor, recover, terminate)
    ↓
Apps (Android, iOS, macOS)
```

## Plugin Ecosystem
Key plugins included:
- `memory-wiki` — wiki-style persistent memory
- `voice-call` — voice integration
- Discord, Zalo, Twitch, nostr channels
- Extensible via Plugin SDK

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Agent-specific channel logic | Channel abstraction in adapter | Mixing agent logic with channel logic = brittle coupling |
| Forking core for customization | Extend via Plugin SDK | Forks diverge; plugins stay current |
| Ad-hoc agent spawning | Gateway protocol lifecycle | Unmanaged agents have no recovery path |
| CLI as only human interface | Native app or channel integration | CLI doesn't scale as the number of concurrent agents grows |

## Integration Points
- Pairs with: [[claw-code-parity]] (claw-code-parity is a project built on this ecosystem)
- Pairs with: [[oh-my-codex]] (OMX provides workflow layer; OpenClaw provides platform infrastructure)
- Pairs with: [[servers-mcp]] (MCP servers as tool providers for agents running on OpenClaw)

## Pre-Init Checklist
- [ ] Identify which channels are needed (Discord? Slack? native app?)
- [ ] Define plugin requirements before starting — plugin SDK is the extension path
- [ ] Design agent lifecycle states (spawning, active, recovering, terminated) before implementation
- [ ] Establish gateway protocol configuration for the deployment environment
