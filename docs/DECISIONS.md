# Decision Records (ADRs)

Format per decision: **Decision · Why · Alternatives considered · Tradeoffs · Review notes.** These are the long-term memory of *why* the project is the way it is. Add a new ADR rather than silently changing an old one.

---

## ADR-0001 — Supabase JS client + RLS instead of Prisma
**Decision.** Access Postgres through the Supabase JS client with generated TypeScript types and SQL migrations; enforce authorization with Row Level Security. No ORM.
**Why.** Fewer moving parts for a solo + AI-assisted build (Constitution #8): one client, one type-generation step, one auth model. RLS becomes the *primary* access boundary at the database, which is the Supabase-native, defense-strong design. Removes the Prisma/RLS impedance mismatch and the connection-pooler config footguns.
**Alternatives.** (a) Prisma ORM + app-layer authz + RLS backstop (v1 plan) — more type ergonomics but two tools and RLS bypass. (b) Drizzle — lighter than Prisma but still a second schema source. (c) Raw `pg` — too low-level.
**Tradeoffs.** Lose Prisma's relation ergonomics and migration DX; complex nested reads are more verbose with the Supabase client. Mitigated by feature-scoped `queries.ts` and generated types. Must be disciplined about the **service-role key** (bypasses RLS) — quarantined to worker/server.
**Review.** Revisit if nested-query verbosity or RLS policy complexity becomes a real maintenance burden.

## ADR-0002 — Full-Text Search only in v1; defer embeddings
**Decision.** Ship Postgres FTS (`tsvector` + GIN + `pg_trgm`) covering title, summary, tags, city, category, organizations. No pgvector/embeddings in v1.
**Why.** FTS covers the actual v1 need at zero cost/complexity. Embeddings add an extension, an embedding provider dependency, backfill jobs, and index tuning that aren't justified yet (Constitution #2, #8).
**Alternatives.** pgvector semantic search now (v1 plan) — better dedup/"find similar" but premature. External search service — cost + a moving part.
**Tradeoffs.** Weaker semantic dedup in v1; handled by heuristic + LLM shortlist (ADR-0003, M4). Schema is **embedding-ready**: adding a `vector` column later is a purely additive migration.
**Review.** Add embeddings (M8) when "find similar events" or dedup quality becomes a felt limitation.

## ADR-0003 — `AIProvider` abstraction; no direct LLM calls
**Decision.** All AI goes through an `AIProvider` interface (`generateSummary`, `extractMetadata`, `generateTags`, `detectDuplicates`, `clusterEvents`, `translate`, `summarizeDaily`). First impl: `GeminiFlashProvider`.
**Why.** Vendor independence and testability (Constitution #10): the platform must survive an LLM going away, changing price, or needing a privacy-preserving swap. Isolating AI behind one interface keeps feature code AI-agnostic.
**Alternatives.** Call Gemini SDK directly where needed — fewer files but vendor lock-in and untestable features.
**Tradeoffs.** A little upfront interface design; a risk of the interface leaking Gemini-isms (guard against this in review).
**Review.** Reassess method signatures when a second provider is implemented (M8.3).

## ADR-0004 — Source reliability + explicit confidence model
**Decision.** Every source carries a `reliability` classification (government, major_news, verified_journalist, verified_organizer, citizen_video, citizen_photo, anonymous, unknown). Event `confidence` is a documented pure function of reliability weight, independent-source count, corroboration, publication type, and moderator override.
**Why.** The product's credibility depends on signalling *how well-supported* an event is. Making confidence a defined function (not a vibe) is both an editorial and a legal safeguard.
**Alternatives.** Free-text reliability notes — unstructured, unsortable. No confidence — loses the core trust signal.
**Tradeoffs.** Weights need tuning; wrong weights mislead. Mitigated by moderator override and documenting the formula in `CONTENT_POLICY.md`. Weights can later move to a config table if tuning-without-deploy is needed.
**Review.** Revisit weights after real moderation experience; consider config-table if edited often.

## ADR-0005 — Human-gated publishing (AI never auto-publishes)
**Decision.** AI produces drafts only; a moderator publishes. Unchanged and non-negotiable.
**Why.** Quality, defamation risk, and contributor/subject safety in a charged political context (Constitution #4, #5).
**Alternatives.** Auto-publish high-confidence drafts — unacceptable risk.
**Tradeoffs.** Human throughput is the bottleneck — which is also why free AI tiers suffice.
**Review.** Never relax without an explicit, documented policy decision.

## ADR-0006 — Feature-based architecture
**Decision.** Organize by feature (`features/<name>/` owning components, queries, actions, schema, types, utils, `index.ts`), not by technical layer. Features communicate only through `index.ts`.
**Why.** Keeps AI/human context tight; lets a feature be rewritten, disabled, or open-sourced independently (Constitution #11).
**Alternatives.** Layer-based (`/components`, `/services`, `/db`) — scatters a feature's logic across the tree; worse for AI context.
**Tradeoffs.** Some cross-feature duplication; needs discipline about the `shared/` boundary.
**Review.** If two features grow tightly coupled, reconsider the boundary rather than reaching across it.

## ADR-0007 — GitHub Actions worker instead of Vercel cron
**Decision.** Run the AI pipeline as a scheduled GitHub Actions job (service role), not a Vercel cron function.
**Why.** Vercel Hobby cron is once-per-day and functions time out at ~10s; the pipeline needs neither limit. The Actions job also keeps Supabase awake and runs on free minutes.
**Alternatives.** Vercel cron (too limited on Hobby); external scheduler hitting an API route (extra secret surface); Supabase pg_cron + Edge Function (viable fallback).
**Tradeoffs.** Actions minimum cadence ~5 min and cold Node start each run — fine for a human-gated pipeline.
**Review.** Move to a dedicated worker (Fly.io/Cloud Run) if cadence or runtime outgrows Actions.

## ADR-0008 — Store references, not copies
**Decision.** For third-party media, store URL + platform + metadata + our own summary and render official embeds. Only host first-party citizen uploads (EXIF-stripped).
**Why.** Copyright exposure, storage/bandwidth cost, and takedown resilience (Constitution #7).
**Alternatives.** Mirror media — legal and storage cost; heavier to relocate.
**Tradeoffs.** Dependent on external availability and oEmbed limits (IG/FB need Meta app review); graceful link fallback required.
**Review.** Revisit if link-rot threatens the archive's completeness (consider selective, rights-cleared archiving).

## ADR-0009 — Defer live police-presence mapping from v1
**Decision.** Ship the map without a live `police_presence` layer in v1. Keep the marker type in schema but hidden; revisit deliberately with policy owners.
**Why.** Real-time police-position mapping in an active protest with documented police violence is high-risk to real people and to the platform (Constitution #5). Safety over feature completeness.
**Alternatives.** Ship it with verification + delay + aggregation — still risky and premature. Drop the type entirely — loses future optionality.
**Tradeoffs.** A feature in the brief is postponed. Documented in `THREAT_MODEL.md`.
**Review.** Only enable after an explicit safety review and policy decision.

## ADR-0010 — Free-tier hosting with Cloudflare portability
**Decision.** Deploy on Vercel Hobby behind Cloudflare, but keep the app portable to Cloudflare Pages.
**Why.** Vercel Hobby is non-commercial-only with hard caps; a civic no-revenue archive is defensible but not guaranteed. Portability de-risks a forced move (Constitution #12).
**Alternatives.** Vercel Pro ($20/seat) now — unnecessary cost. Cloudflare Pages from day one — viable; Vercel's Next.js DX is smoother to start.
**Tradeoffs.** Avoid Vercel-only features (or wrap them) to preserve portability.
**Review.** Migrate to Cloudflare Pages if bandwidth caps or the commercial-use clause bite.

## ADR-0011 — Remote-first Supabase migrations (no local Docker)
Decision: Manage the database with the Supabase CLI in remote-first mode: write versioned SQL migrations in supabase/migrations/ and apply them to the linked cloud project with `supabase db push`. Do not run the local Docker-based Supabase stack.
Why: Docker Desktop is a heavy dependency (virtualization/WSL2, high RAM) that a solo developer on Windows does not need for a project with no real user data yet. Remote-first keeps the toolchain light while still giving versioned, source-controlled migrations.
Alternatives: Full local stack via `supabase start` (Docker) gives isolation and offline testing but is heavy. Dashboard-only SQL has no version control.
Tradeoffs: No isolated local database; migrations apply straight to the cloud project. Acceptable now (throwaway data). `supabase db push` prints a harmless Docker warning from an optional local caching step; this is expected and can be ignored.
Review: Revisit if we need a separate staging database or offline development; we can add Docker local dev or use the second free Supabase project then.
