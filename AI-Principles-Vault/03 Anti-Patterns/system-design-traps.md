---
type: anti-pattern
severity: high
tags: [#anti-pattern, #system-design, #architecture]
---

# Anti-Pattern: System Design Traps

> Architecture decisions that seem reasonable but become expensive problems at scale — from system-design-primer and real engineering postmortems.

---

## T-1: Consistency Model Mismatch

**Trap**: Using eventual consistency for data that requires strong consistency (or vice versa).
**Example**: Shopping cart using eventual consistency for inventory — oversell bugs.
**Example**: Chat application using strong consistency — unnecessary latency and scaling limits.
**Check**: For each data type, explicitly ask: "What happens if two writes conflict? Is stale data acceptable?"
**Rule**: Document consistency model choice in spec. Reference [[01 Principles/system-design-primer]] CAP/consistency section.

---

## T-2: Premature Optimization

**Trap**: Adding caching, sharding, or scaling infrastructure before measuring that it's needed.
**Example**: Adding Redis cache before DB query latency is even measured.
**Cost**: Complexity, cache invalidation bugs, operational overhead — for no measured benefit.
**Rule**: Measure first. Optimize the bottleneck you found, not the one you imagined.
> "Premature optimization is the root of all evil" — Knuth (still true 50 years later)

---

## T-3: N+1 Query Pattern

**Trap**: Fetching a list of N entities, then making N individual queries to fetch related data.
**Example**: Fetch 100 users, then fetch each user's profile separately = 101 queries.
**Signal**: DB CPU spikes with query count proportional to result set size.
**Fix**: Batch query or eager load with JOIN. One query for all related data.

---

## T-4: Synchronous Fan-Out

**Trap**: An API handler calls 5-10 downstream services synchronously and waits for all.
**Cost**: Total latency = sum of all service latencies. One slow service blocks everything.
**Fix**: Async fan-out with message queue, or parallel calls with timeout + fallback.
**Rule**: Count synchronous dependencies in your critical path. Each one multiplies failure surface.

---

## T-5: Availability Math Ignored

**Trap**: Chaining services without accounting for compound availability degradation.
**Math**: Three services at 99.9% availability chained = 99.7% total (0.999³ ≈ 0.997).
**Fix**: Circuit breakers on each dependency. Know your SLA before your dependency chain.
**Rule**: For each synchronous dependency added, ask: "What is my new total availability?"

---

## T-6: No Back Pressure

**Trap**: High-throughput producer sending work to a consumer with no rate signaling.
**Failure**: Producer overwhelms consumer → consumer dies → cascading failure upstream.
**Fix**: Queue with back pressure signals. Consumer signals "slow down" or "reject."
**Rule**: Every async pipeline must define its back pressure mechanism before implementation.

---

## T-7: Retrofitting Caching

**Trap**: Adding a cache to a system that wasn't designed with cache invalidation in mind.
**Cost**: Cache invalidation is notoriously hard. Retrofitting = debugging stale data indefinitely.
**Fix**: Design for caching from the start. Decide cache invalidation strategy during SPEC phase.
**Rule**: "We'll add caching later if needed" = guaranteeing future cache invalidation bugs.

---

## T-8: Single Point of Failure (Undocumented)

**Trap**: SPOF exists in the architecture but nobody documented it as an accepted risk.
**Cost**: When it fails (it will), team scrambles without a plan. Outage duration × cost.
**Fix**: Identify all SPOFs. For each: mitigate (HA/redundancy) OR document as accepted risk with runbook.
**Rule**: Unknown SPOFs are more dangerous than known ones. Document them.

---

## T-9: Cross-DC Latency Ignored

**Trap**: Cross-datacenter calls treated as local network calls in system design.
**Reality**: Cross-DC round trip = ~150ms. Synchronous cross-DC in critical path = UX problem.
**Fix**: Design for 150ms budget when crossing DCs. Use async where possible.

---

## T-10: Schema Without Migration Plan

**Trap**: Adding a DB column (especially NOT NULL) to a large table without a migration plan.
**Example**: Adding `NOT NULL email` to users table with 50M rows = table lock during migration.
**Fix**: Add as NULL first, backfill in batches, add NOT NULL constraint, add application enforcement.
**Rule**: Any schema change on a table > 1M rows needs a multi-step migration plan in the spec.

---

## Pre-Architecture Checklist
Before finalizing any system design:
- [ ] Consistency model documented per data type — is this right?
- [ ] CAP tradeoff choice explicit (CP or AP) and justified
- [ ] Read:write ratio estimated — is the architecture designed for it?
- [ ] All synchronous dependencies counted — availability math done?
- [ ] Back pressure mechanism defined for every async pipeline
- [ ] SPOFs identified and either mitigated or documented
- [ ] Cache invalidation strategy defined (not "we'll figure it out")
- [ ] Large table schema changes have multi-step migration plan

## Related
- [[01 Principles/system-design-primer]] — full reference
- [[04 Rules/specops-governance.rules.mdc]] — document architecture decisions in spec
