# Contributing

## Read first
`CONSTITUTION.md` → `ARCHITECTURE.md` → `DECISIONS.md`. The `.cursor/rules/` encode these for AI-assisted work.

## Workflow (task-based)
Work one **ROADMAP task at a time** (e.g. `M1.5`). Each task is one branch → one PR → one squash-merge. Keep changes small and reviewable.

```
git checkout -b m1.5-event-detail
# implement the single task
pnpm lint && pnpm typecheck && pnpm build
git commit -m "feat(events): event detail page (M1.5)"
```

## Definition of done (every task)
- `lint`, `typecheck`, `build` pass; no `any`, no unused, no dead code.
- Touched a doc if behavior/architecture changed; added an ADR for any significant decision.
- Nothing broken on `main`; migrations apply cleanly and types regenerated.

## Conventions
- **Commits:** Conventional Commits, with the task id, e.g. `feat(search): FTS + autocomplete (M1.8)`.
- **Branches:** `m<milestone>.<task>-slug`.
- **TypeScript:** strict; explicit param/return types; prefer `interface` for object shapes; avoid enums in TS (use `const` maps) — DB enums are separate.
- **Files:** keep small and single-purpose (~≤300 lines). Split by concern.
- **Features:** stay inside `features/<name>/`; import other features only via their `index.ts`; cross-cutting code goes in `shared/`.

## Database
- Schema changes = a new SQL migration in `supabase/migrations/` (never edit applied migrations).
- After a migration: regenerate `types/database.ts`.
- Every new table: enable RLS + default-deny + explicit policies in the same migration.
- Never use the **service-role** client in browser/client code.

## AI code
- Never call an LLM SDK directly — go through `AIProvider`.
- Validate every AI output with Zod; treat it as untrusted (sanitize before render).
- AI produces drafts; publishing stays a human action.

## Security checklist (per PR touching input/data)
Zod at the boundary · RLS covers the new access path · no PII/IP logged · uploads validated + EXIF stripped · AI/user HTML sanitized · secrets only from managed stores.

## Local setup (filled in during M0)
`pnpm install` · `supabase start` · `cp .env.example .env.local` · `pnpm dev`. Exact steps land in `README.md` at M0.13.
