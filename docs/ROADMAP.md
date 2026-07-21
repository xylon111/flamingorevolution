# Roadmap

Milestones are broken into **small, single-purpose tasks** — each is one focused PR/commit, independently reviewable and revertible. This granularity is deliberate for solo + AI-assisted (Cursor) development: small tasks keep context tight, make review easy, and make recovery cheap.

**Definition of done (every task):** builds clean · `lint` + `typecheck` pass · no `any`/no unused · docs touched if behavior changed · meaningful commit message · nothing broken on `main`.

**Legend:** each task lists *Deliverable* and *Done when*. Do them in order within a milestone; milestones are sequential. Nothing AI-related exists before M3, by design.

---

## M0 — Foundations

- **M0.1 — Initialize Next.js.** App Router, TypeScript **strict**, `src/` layout.
  *Done when:* dev server runs; a placeholder home route renders.
- **M0.2 — Tailwind + shadcn/ui.** Base config, tokens, `shared/ui/`.
  *Done when:* a shadcn Button renders with theme tokens.
- **M0.3 — Lint/format/TS config.** ESLint (flat), Prettier, `tsconfig` strict, editorconfig, import-boundary lint (block `service.ts` in client).
  *Done when:* `pnpm lint` + `pnpm typecheck` pass on a clean tree.
- **M0.4 — Supabase project + CLI.** `supabase/config.toml`, local dev DB, link to hosted project.
  *Done when:* `supabase start` works locally; remote project linked.
- **M0.5 — First migration: enums + reference tables.** `profiles`, `cities`, `categories`, and shared enums (roles, status, reliability, platform, marker types).
  *Done when:* migration applies locally and remotely.
- **M0.6 — Generated types + Supabase clients.** `types/database.ts`; `shared/supabase/{server,client,service}.ts`.
  *Done when:* a typed query compiles against generated types.
- **M0.7 — Auth: magic link (+ Google OAuth if confirmed).** `@supabase/ssr`, `middleware.ts` session refresh, sign-in / callback routes.
  *Done when:* a user can sign in and a session persists across reloads.
- **M0.8 — Profile trigger + role claim.** Trigger creates `profiles` on signup; Auth Hook injects `user_role` into JWT.
  *Done when:* new signups get a `user` profile; JWT carries `user_role`.
- **M0.9 — RLS baseline.** Enable RLS on all tables; default-deny; "published readable by anon"; "own profile" policies.
  *Done when:* anon can read published, cannot read drafts; policy notes in `DECISIONS.md`.
- **M0.10 — App shell + theme + i18n.** Root layout, header/footer, dark/light toggle, `sq`/`en` scaffold (sq default).
  *Done when:* layout renders in both themes and both locales.
- **M0.11 — Docs + `.cursor/rules`.** Commit `docs/*` and `.cursor/rules/*.mdc`.
  *Done when:* rules load in Cursor; docs render.
- **M0.12 — GitHub Actions CI + keep-alive.** `ci.yml` (lint/typecheck/build); `worker.yml` skeleton pings Supabase to prevent pause.
  *Done when:* CI green on PR; keep-alive ping succeeds.
- **M0.13 — Env + first deploy.** `.env.example`, `README`, deploy to Vercel behind Cloudflare.
  *Done when:* the shell is live on the domain over HTTPS.

## M1 — Read the archive *(no AI; seeded data)*

- **M1.1 — Full schema migration.** `events`, `sources` (+`reliability`), `media`, `event_timeline_entries`, `people`, `organizations`, `tags` + join tables, `event_relations`, `map_markers`, `announcements`, `audit_log`, `ai_jobs`.
  *Done when:* migration applies; types regenerated.
- **M1.2 — RLS policies for all tables.** Per §6 matrix.
  *Done when:* each role sees exactly what it should (manual check + notes).
- **M1.3 — Seed data.** `supabase/seed.sql`: sample cities, categories, events, sources, media, markers.
  *Done when:* local + preview show realistic content.
- **M1.4 — `events` feature (read).** `queries.ts`, `types.ts`, event card + list components.
  *Done when:* a published event list renders from the DB.
- **M1.5 — Event detail page.** Summary, timeline, media, sources, people/orgs, related, confidence.
  *Done when:* `/events/[slug]` renders all sections.
- **M1.6 — Home / "Today's Situation."** Latest + featured/pinned + announcements.
  *Done when:* home aggregates correctly.
- **M1.7 — `timeline` feature + filters.** Date, city, category, tags, organizations.
  *Done when:* filters compose and paginate.
- **M1.8 — `search` feature (FTS).** `search_document` trigger + `search_vector` + GIN + `pg_trgm`; search UI + autocomplete over title/summary/tags/city/category/orgs.
  *Done when:* keyword search returns ranked results; autocomplete works.
- **M1.9 — `map` feature.** MapLibre + free tiles; markers from `map_markers` (police type hidden per ADR-0009).
  *Done when:* markers render and link to events.
- **M1.10 — `media` library.** Grid + filters (type, city, date); external embeds vs. stored uploads.
  *Done when:* media browses and filters.
- **M1.11 — SEO.** Metadata, dynamic OG images, sitemap, robots, JSON-LD.
  *Done when:* OG previews render; sitemap valid.
- **M1.12 — Read-surface a11y + mobile pass.** Keyboard, ARIA, contrast, responsive.
  *Done when:* axe check clean on key pages; mobile verified.

## M2 — Submit & moderate *(platform becomes useful)*

- **M2.1 — `sources` submission form.** Zod schema, Turnstile verify, rate limit; guest + user.
  *Done when:* a submission creates a `pending` source; spam blocked.
- **M2.2 — Moderation queue.** `moderation` feature; list of `needs_review`/`pending`, RLS-gated.
  *Done when:* moderators see the queue; others get 403.
- **M2.3 — Manual event create/edit.** Title/summary (sq/en), city, date, category, tags.
  *Done when:* a moderator can build an event by hand.
- **M2.4 — Attach & curate.** Link sources, add media, timeline entries, people (redaction gate), orgs.
  *Done when:* all relations editable from the dashboard.
- **M2.5 — Reliability + confidence.** Reliability selector per source; pure confidence function (reliability + independent sources + corroboration + publication type + override).
  *Done when:* confidence recomputes and is overridable; formula in `CONTENT_POLICY.md`.
- **M2.6 — Merge / split events.** Reassign sources, fold timelines/media, record `event_relations`.
  *Done when:* merge and split both work and are audited.
- **M2.7 — Map marker verification.** Verify/expire flow; sensitive-type gating.
  *Done when:* only verified markers publish; expiry works.
- **M2.8 — Publish / reject workflow.** Status transitions + revalidation.
  *Done when:* publishing appears live within seconds; reject records a reason.
- **M2.9 — Audit log + viewer.** Write on every privileged action; admin viewer.
  *Done when:* actions are logged with before/after.
- **M2.10 — Announcements.** Create/pin banners.
  *Done when:* pinned announcements show site-wide.

> **Checkpoint:** after M2 the platform is a fully functional, human-run event archive. Ship/soft-launch here if desired before adding AI.

## M3 — AI drafting

- **M3.1 — `AIProvider` interface + types.** The 8 methods; shared result types + Zod schemas.
- **M3.2 — `GeminiFlashProvider`.** JSON mode; Zod-validated outputs; retry-once-then-error.
- **M3.3 — Worker entrypoint.** `scripts/worker/run.ts`; claim batch via service role (`SKIP LOCKED`); `ai_jobs` bookkeeping.
- **M3.4 — Worker cron.** `worker.yml` runs the pipeline ~10 min (also keep-alive).
- **M3.5 — Fetch/extract step.** oEmbed (YouTube/TikTok) / OG (news) / PDF text / upload text. No copyrighted bytes.
- **M3.6 — Enrichment steps.** relevance gate → `extractMetadata` → `generateSummary` (sq/en) → `generateTags`.
- **M3.7 — Persist drafts.** Write `needs_review` events/entities; people proposed, `redacted` by default.
- **M3.8 — Rate/cost guards.** Batch size cap, backoff, RPD ceiling, error handling.
  *Done when (M3):* a submitted link becomes a reviewable AI draft; nothing auto-publishes.

## M4 — Dedup assist *(no embeddings)*

- **M4.1 — Candidate filtering.** City + date window + trigram title similarity.
- **M4.2 — `detectDuplicates` / `clusterEvents`.** AIProvider check on the shortlist.
- **M4.3 — Merge suggestions in UI.** Surfaced in moderation with accept/reject.
- **M4.4 — Confidence w/ corroboration.** Recompute using independent-source count.

## M5 — AI enrichment

- **M5.1 — `translate`.** Fill missing sq/en summaries.
- **M5.2 — `summarizeDaily`.** Draft "Today's Situation" brief (moderator-approved).
- **M5.3 — Provider on/off switch.** Feature flag; platform fully functional with AI disabled (Constitution #10).

## M6 — Hardening

- **M6.1 — RLS test suite.** Automated policy tests per role.
- **M6.2 — Backups + test-restore.** `backup.yml` nightly `pg_dump` (encrypted) + a verified restore.
- **M6.3 — Performance/caching.** ISR, `revalidateTag`, CDN cache rules, image optimization.
- **M6.4 — Accessibility audit.** WCAG pass across dashboards too.
- **M6.5 — Abuse review.** Rate limits, Turnstile tuning, moderation load check.

## M7 — Launch

- **M7.1 — Policy sign-off.** `CONTENT_POLICY.md` + `THREAT_MODEL.md` finalized by a human owner.
- **M7.2 — Privacy notice + lawful basis.** Published; right-of-reply process live.
- **M7.3 — Real data + moderator onboarding.** Seed real events; train moderators.
- **M7.4 — Analytics.** Cloudflare Web Analytics (cookieless).
- **M7.5 — Docs pass.** Update `DECISIONS.md`; final `ARCHITECTURE.md` review.

## M8 — Future *(post-v1, optional)*

- **M8.1 — Embeddings + semantic search.** Enable pgvector; add `embedding`; backfill; swap dedup impl behind `AIProvider` (additive migration).
- **M8.2 — Public read API + RSS/JSON feeds.** For journalists/researchers.
- **M8.3 — Alternative `AIProvider`.** Paid tier or self-hosted model for privacy/scale.
