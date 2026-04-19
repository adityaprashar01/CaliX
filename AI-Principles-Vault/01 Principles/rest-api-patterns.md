
type: principle
source: Hands-On-RESTful-API-Design-Patterns-and-Best-Practices
source-path: /Users/bgmanu/Documents/Dezerv/GitHub/AI-Resources/Hands-On-RESTful-API-Design-Patterns-and-Best-Practices
tags: [#system-design, #api, #rest, #patterns]
related: [system-design-primer, specops]
date-extracted: 2026-04-19
---

# REST API Design Patterns

## Core Purpose
> Patterns and best practices for building RESTful APIs that are consistent, evolvable, and maintainable — covering URI design, versioning, error handling, security, and architectural patterns.

## Key Principles
- **P1 — REST Is an Architectural Style, Not a Standard**: REST (Representational State Transfer) is Fielding's set of constraints — statelessness, uniform interface, layered system, client-server, cacheable, (optional) code on demand. "RESTful" is a claim; check the constraints.
- **P2 — URI Design Is the API's Public Contract**: URIs should be nouns (`/users/{id}`), not verbs (`/getUser/{id}`). Hierarchy expresses containment (`/users/{id}/orders`). Once published, URIs are public contracts — changing them breaks clients.
- **P3 — HTTP Verbs Have Semantics That Must Be Respected**: GET = safe + idempotent. PUT/DELETE = idempotent. POST = neither. Violating these semantics (e.g., GET with side effects) breaks caching, retry logic, and client assumptions.
- **P4 — Idempotency Enables Safe Retries**: PUT/DELETE/GET are idempotent. POST is not. For non-idempotent operations that must be retried safely (payment processing), use idempotency keys. Design for retry-ability from the start.
- **P5 — Versioning Strategy Must Be Decided at API Inception**: URI versioning (`/v1/users`) = explicit but pollutes URI. Header versioning (`Accept: application/vnd.api+v1+json`) = clean but hidden. Query param (`?version=1`) = easy but cache-unfriendly. No versioning = breaking changes = broken clients. Decide before first release.
- **P6 — Error Responses Must Be Machine-Readable**: Not just HTTP status codes but structured error bodies: `{"error": "INVALID_INPUT", "message": "...", "field": "email"}`. Status codes alone don't give clients enough to handle errors programmatically.
- **P7 — Pagination Is Not Optional at Scale**: List endpoints without pagination become unusable as data grows. Cursor-based pagination (next cursor) scales better than offset-based (page + limit) for large datasets. Build it in from the start.
- **P8 — HATEOAS Enables Discoverability**: Hypermedia as the Engine of Application State — responses include links to related actions. Clients don't need to hardcode URIs; they follow links. Practical in full REST; often omitted in pragmatic APIs.
- **P9 — Rate Limiting and Throttling Are First-Class API Features**: Not security afterthoughts. Rate limit responses: 429 Too Many Requests with `Retry-After` header. Design rate limit tiers (per user, per API key, per endpoint) upfront.
- **P10 — API Gateway Pattern Centralizes Cross-Cutting Concerns**: Auth, rate limiting, logging, SSL termination, request routing — these don't belong in individual services. API gateway handles them once, consistently.

## Critical Concepts (Cheat Sheet)

### HTTP Status Codes
| Code | Meaning | Use For |
|------|---------|---------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Client validation error |
| 401 | Unauthorized | No/invalid authentication |
| 403 | Forbidden | Authenticated but no permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource state conflict (e.g., duplicate) |
| 422 | Unprocessable | Semantic validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server fault (don't leak details) |

### API Architectural Styles
| Style | Pattern | Use When |
|-------|---------|---------|
| REST | Resource-oriented, HTTP verbs | Standard CRUD web APIs |
| GraphQL | Query language, single endpoint | Flexible data fetching, multiple clients |
| gRPC | Binary protocol, schema-first | High-performance microservices, streaming |
| Event-driven | Async, pub/sub | Decoupled systems, high throughput |
| SOA | Service-oriented, WSDL/SOAP | Enterprise integration (legacy) |

### REST Constraints
| Constraint | What It Means |
|------------|--------------|
| Stateless | No client context on server between requests — all context in request |
| Uniform Interface | Consistent resource identification + manipulation + self-description + HATEOAS |
| Layered System | Client can't tell if talking to origin server or intermediary |
| Cacheable | Responses must declare cacheability |
| Client-Server | UI/client separated from data storage |

### Versioning Strategies
| Strategy | Example | Tradeoff |
|----------|---------|---------|
| URI segment | `/v1/users` | Most explicit, pollutes URI space |
| Header | `Accept: application/vnd.api.v1+json` | Clean URIs, hidden from casual inspection |
| Query param | `/users?version=1` | Easy to test, cache-unfriendly |
| Subdomain | `v1.api.example.com` | DNS-level separation, operational complexity |

## Anti-Patterns (Pitfalls)
| ❌ Avoid | ✅ Do Instead | Why |
|---------|--------------|-----|
| Verbs in URIs (`/getUser`, `/createOrder`) | Nouns + HTTP verbs (`GET /users`, `POST /orders`) | HTTP verbs ARE the verbs; nouns in URIs = redundancy |
| POST for idempotent operations | PUT or PATCH | POST non-idempotency breaks retry safety |
| No versioning at launch | Version before first release | Retrofitting versioning = breaking all existing clients |
| 200 OK for errors | Proper 4xx/5xx status codes | Clients can't detect errors they're not told about |
| String error messages only | Structured error objects | Strings can't be handled programmatically |
| No pagination on list endpoints | Cursor-based pagination | Unpaginated lists become unusable at scale |
| Auth in URL (`?token=abc`) | Authorization header | URLs are logged, cached, shared — tokens leak |

## Integration Points
- Pairs with: [[system-design-primer]] (API design sits on top of system design infrastructure choices)
- Pairs with: [[specops]] (API contracts belong in requirements.md using EARS notation)
- Pairs with: [[agent-skills]] (`api-and-interface-design` skill covers Hyrum's Law + contract-first design)

## Pre-Init Checklist
- [ ] Versioning strategy decided before first endpoint goes live
- [ ] URI convention documented (plural nouns, nested hierarchy depth limit)
- [ ] Error response schema defined and documented
- [ ] Rate limiting tiers planned per endpoint category
- [ ] Pagination pattern chosen (cursor vs offset) for all list endpoints
