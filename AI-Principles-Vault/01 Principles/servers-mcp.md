
type: principle
source: servers (MCP reference implementations)
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/servers
tags: [#tooling, #mcp, #integration, #agent-capabilities]
related: [awesome-claude-code, openclaw]
date-extracted: 2026-04-19
---

# MCP Servers (Model Context Protocol)

## Core Purpose
> Reference implementations of MCP servers — the protocol that gives LLMs secure, controlled access to tools and data sources. Understanding these servers is essential for extending agent capabilities.

## Key Principles
- **P1 — MCP Is a Standardized Extension Protocol**: MCP (Model Context Protocol) provides a standard way to add capabilities to any LLM — not just Claude. Building on MCP means your tool works with Claude, Cursor, Copilot, and any other MCP-compatible client.
- **P2 — Reference Servers Are Educational, Not Production-Ready**: README explicitly warns: these are reference implementations for learning MCP, not production solutions. Evaluate security requirements before deploying any reference server.
- **P3 — 7 Core Reference Servers Cover the Essential Patterns**: everything (test/reference), fetch (web content), filesystem (file ops with access controls), git (repo manipulation), memory (knowledge graph persistence), sequentialthinking (structured reasoning), time (timezone operations).
- **P4 — Memory Server = Knowledge Graph, Not Key-Value**: The `memory` MCP server implements a knowledge graph (not a simple cache). Entities with relationships, persistent across sessions, queryable. This is the right architecture for agent long-term memory over sessions.
- **P5 — Sequential Thinking Server Structures Problem-Solving**: The `sequentialthinking` server implements dynamic, reflective thought sequences — not a linear chain but a process that can revisit earlier steps. Useful for complex multi-step reasoning.
- **P6 — Filesystem Server Has Configurable Access Controls**: The filesystem server accepts a list of allowed paths at startup. Security boundary is explicit, not implicit. Always configure it with the narrowest path scope needed.
- **P7 — npx for TypeScript, uvx for Python**: TypeScript MCP servers use `npx -y @modelcontextprotocol/server-NAME`. Python servers use `uvx mcp-server-NAME`. This distinction matters for configuration syntax.

## MCP Reference Servers

| Server | Purpose | Key Capability |
|--------|---------|----------------|
| `everything` | Test/reference | All MCP features in one server |
| `fetch` | Web content | Fetch URLs, convert to LLM-friendly format |
| `filesystem` | File ops | Read/write/list with configurable path restrictions |
| `git` | Repo tools | Read, search, manipulate git repos |
| `memory` | Persistence | Knowledge graph: entities + relationships, persistent |
| `sequentialthinking` | Reasoning | Dynamic thought sequences, can revisit steps |
| `time` | Time/timezone | Current time, timezone conversion |

## Configuration Pattern (Claude Desktop)
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "/path/to/repo"]
    }
  }
}
```

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Using reference servers in production without review | Evaluate security, implement safeguards | README explicitly warns: reference ≠ production-ready |
| Filesystem server with root path `/` | Narrowest required path scope | Unrestricted filesystem access = full system exposure |
| Building proprietary agent tools without MCP | Build on MCP standard | Proprietary tools work with one client; MCP works with all |
| Memory as key-value (losing graph structure) | Use knowledge graph entities + relationships | Graph structure enables complex queries flat storage can't |

## Integration Points
- Pairs with: [[awesome-claude-code]] (real projects show how to configure MCP in CLAUDE.md)
- Pairs with: [[openclaw]] (OpenClaw uses MCP servers as extension points for agent capabilities)
- Pairs with: [[mempalace]] (mempalace is an alternative to the MCP memory server for more sophisticated retrieval)

## Pre-Init Checklist
- [ ] Identify which MCP servers are needed for the project
- [ ] Configure filesystem server with narrowest allowed path — never `/`
- [ ] Document MCP server configuration in CLAUDE.md / AGENTS.md
- [ ] Verify server is running before depending on it: `npx @modelcontextprotocol/server-NAME --help`
- [ ] Check MCP Registry (registry.modelcontextprotocol.io) for community servers before building custom
