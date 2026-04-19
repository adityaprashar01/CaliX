
type: principle
source: system-design-primer + awesome-system-design-resources
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/system-design-primer
tags: [#system-design, #architecture, #distributed-systems]
related: [rest-api-patterns, specops]
date-extracted: 2026-04-19
---

# System Design Primer

## Core Purpose
> Comprehensive reference for distributed systems design — covering scalability, consistency, availability, databases, caching, async patterns — with canonical papers and a tradeoff framework for architecture decisions.

## Key Principles
- **P1 — CAP Is a Tradeoff, Not a Binary**: Choose CP or AP, not CA (CA only exists when there are no network partitions — i.e., a single-node system). Cassandra = AP. HBase = CP. Document which two you're choosing and WHY in every spec.
- **P2 — Consistency Is a Spectrum, Not a Switch**: Strong → Sequential → Causal → Eventual. The choice depends on the feature. Financial transactions = strong. Social feed = eventual. Using eventual where strong is needed = data corruption bugs.
- **P3 — Read:Write Asymmetry Changes the Architecture**: Most systems are read-heavy (100:1). Read-heavy → add read replicas, cache aggressively. Write-heavy → think about sharding, queue-based ingestion. Design for the dominant access pattern, not the average.
- **P4 — Stateless Scales, Stateful Doesn't**: Stateless services scale horizontally. Stateful services require sticky sessions or distributed state management. Prefer stateless; externalize state to a store (Redis, DB) rather than keeping it in application memory.
- **P5 — Cache Is an Eventual Consistency Decision**: Adding a cache always creates a window where the cache and the DB diverge. Cache-aside is the most common strategy but requires careful invalidation. Write-through adds latency but keeps cache consistent. There is no free lunch.
- **P6 — Availability Multiplies Downward**: Three 99.9% available services chained = 99.7% total availability (0.999³). In microservices, every synchronous dependency reduces your availability envelope. Circuit breakers exist specifically because of this math.
- **P7 — Back Pressure Is How Systems Stay Alive Under Load**: Without back pressure, overloaded downstream services die. Back pressure propagates load signals upstream. Design for it: message queues, rate limiting, rejection with retry-after signals.
- **P8 — Latency Intuition Beats Benchmarks**: Know rough numbers: L1 cache = 0.5ns, main memory = 100ns, SSD = 100μs, disk seek = 10ms, cross-DC round trip = 150ms. These inform whether "fast enough" is actually fast enough.
- **P9 — Denormalization Is an Optimization, Not a Bug**: In distributed systems, normalization creates join overhead. Denormalization (storing derived data) trades write complexity for read performance. Do it deliberately, document why.
- **P10 — Design for Operations, Not Just Development**: Observability (logs, metrics, traces) is not an afterthought. A system that works but can't be debugged in production is a liability. Design for failure visibility from day one.

## Critical Concepts (Cheat Sheet)

### Consistency Models
| Model | Guarantee | Use When |
|-------|-----------|----------|
| Strong | Read always sees latest write | Financial transactions, leader election |
| Sequential | All nodes see writes in same order | Collaborative editing |
| Causal | Causally related writes ordered | Chat, comments |
| Eventual | Eventually consistent, no timing guarantee | Social feeds, DNS, shopping carts |

### ACID vs BASE
| Property | ACID | BASE |
|----------|------|------|
| Focus | Correctness | Availability |
| Consistency | Strong | Eventual |
| Transactions | Yes | No (usually) |
| Scale | Harder | Easier |
| Examples | PostgreSQL, MySQL | Cassandra, DynamoDB |

### CAP Theorem
- **CA** (not partition-tolerant) — single-node systems only; not realistic for distributed
- **CP** (consistent + partition-tolerant) — HBase, Zookeeper, Mongo (with majority writes)
- **AP** (available + partition-tolerant) — Cassandra, CouchDB, DynamoDB

### Scaling Patterns
| Pattern | When | Cost |
|---------|------|------|
| Vertical scaling | Quick fix, limited ceiling | $$, limits at hardware max |
| Horizontal scaling | Stateless services | $ per node, coordination overhead |
| Read replicas | Read-heavy | Replication lag |
| Sharding | Write-heavy, massive scale | Query complexity, cross-shard joins |
| Federation | Domain separation | Schema coupling |
| Denormalization | Read performance | Write complexity, stale data risk |

### Caching Strategies
| Strategy | Pattern | Tradeoff |
|----------|---------|----------|
| Cache-aside | App checks cache, then DB | Stale data, cache miss latency |
| Write-through | Write to cache AND DB | Latency on writes |
| Write-behind | Write to cache, async to DB | Data loss on crash |
| Refresh-ahead | Proactively refresh before expiry | Wasted cache space |

### Async Patterns
| Pattern | Use Case |
|---------|---------|
| Message queue (Kafka, SQS) | Decouple producers from consumers |
| Pub/Sub | Fan-out, event broadcasting |
| Back pressure | Prevent downstream overload |
| CDC (Change Data Capture) | Sync DB changes to other systems |

### Distributed Primitives
| Primitive | What It Does |
|-----------|-------------|
| Heartbeat | Detect node failure |
| Consensus (Raft/Paxos) | Agree on values across nodes |
| Circuit breaker | Stop calling failing services |
| Bloom filter | Probabilistic set membership (no false negatives, rare false positives) |
| Consistent hashing | Distribute data across nodes with minimal reshuffling |

## Canonical Papers
| Paper | Key Insight |
|-------|------------|
| Dynamo (Amazon) | Eventually consistent key-value store; consistent hashing + vector clocks |
| Paxos (Lamport) | Consensus in distributed systems |
| MapReduce (Google) | Distributed batch processing via map + reduce |
| GFS (Google) | Distributed file system; chunk servers, master |
| Bigtable (Google) | Distributed sorted map; SST + memtable |
| Spanner (Google) | Globally distributed SQL with TrueTime |
| Kafka (LinkedIn) | Distributed log; at-least-once, partitioned, replicated |
| ZooKeeper | Coordination service; watches, ephemerals |

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| "We'll add caching later if needed" | Design for cache from start | Caching retrofitted = invalidation bugs |
| Using eventually consistent DB for financial data | Strong consistency for money | Eventual consistency + money = double-spend/data loss |
| Synchronous fan-out (calling 10 services inline) | Message queue or async | One slow dependency blocks all callers |
| Optimizing before measuring | Profile first, optimize bottleneck | 90% of optimizations hit non-bottlenecks |
| Ignoring cross-DC latency (150ms) | Design for it explicitly | Cross-DC synchronous calls kill UX |
| N+1 queries | Batch + eager load | N+1 = linear DB load scaling with entity count |
| No back pressure | Queue-based ingestion with backpressure signals | No back pressure = cascading failures under load |

## Interview Problem Reference
**Easy**: URL shortener, rate limiter, LRU cache, logging service
**Medium**: Instagram, Twitter, Spotify, YouTube, Dropbox, WhatsApp, Uber, Google Drive
**Hard**: Google Search, Google Maps, Zoom video, Netflix, Amazon (at-scale)

## Integration Points
- Pairs with: [[rest-api-patterns]] (REST design sits on top of system design foundations)
- Pairs with: [[specops]] (system design decisions belong in design.md during SPEC phase)
- Design tradeoffs → [[04 Rules/specops-governance.rules.mdc]] (document CAP/consistency choice in every spec)

## Pre-Init Checklist
- [ ] Know which consistency model is required for each data type in the system
- [ ] Document CAP tradeoff choice in spec before any implementation
- [ ] Identify read:write ratio — this determines caching and scaling strategy
- [ ] Define availability requirement (99.9%? 99.99%?) and work backward to dependency count
- [ ] Back pressure pattern defined for every async pipeline
