# Flamingo Revolution — Event Intelligence Platform

An AI-assisted information hub that organizes public reports about the Albanian
"Flamingo Revolution" protest movement into verified **events** — not another
social feed. Many sources (posts, articles, videos, citizen reports) are merged
into a single event page with a summary, timeline, media, map location, and
original sources. AI drafts; **humans verify and publish.**

> Status: **early development (Milestone M0 — foundations).** No public features yet.

## Tech stack

- **Next.js (App Router) + TypeScript** — web app
- **Tailwind CSS + shadcn/ui** — styling and components
- **Supabase** — Postgres, Auth, Storage (with Row Level Security)
- **Zod + @t3-oss/env-nextjs** — validation and typed environment variables
- **ESLint + Prettier + Husky + lint-staged** — code quality
- **GitHub Actions** — CI and a Supabase keep-alive
- **Vercel + Cloudflare** — hosting and CDN (planned)

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full design.

## Getting started

**Prerequisites:** Node.js 22 LTS, npm, and a free Supabase project.

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Create your local env file, then fill in your Supabase values
cp .env.example .env.local
#    edit .env.local: project URL, publishable key, secret key

# 3. Start the dev server
npm run dev
\`\`\`

Then open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| \`npm run dev\` | Start the development server |
| \`npm run build\` | Production build |
| \`npm run start\` | Run the production build |
| \`npm run lint\` | Lint with ESLint |
| \`npm run typecheck\` | Type-check with TypeScript |
| \`npm run format\` | Format all files with Prettier |
| \`npm run format:check\` | Check formatting without writing |

## Project structure

\`\`\`
src/
  app/         Next.js routes (App Router)
  features/    Feature modules (events, sources, moderation, ai, ...)
  shared/      Cross-cutting code (supabase clients, env, ui, utils)
docs/          Architecture, roadmap, decisions, policies
.cursor/rules/ AI-assistant coding rules
\`\`\`

## Documentation

- [Architecture](docs/ARCHITECTURE.md) · [Roadmap](docs/ROADMAP.md) · [Decisions](docs/DECISIONS.md)
- [Constitution](docs/CONSTITUTION.md) · [Contributing](docs/CONTRIBUTING.md)
- [Content policy](docs/CONTENT_POLICY.md) · [Threat model](docs/THREAT_MODEL.md)

## Security & privacy

This project handles sensitive civic information. Secrets live only in
\`.env.local\` (never committed); the Supabase secret key is server-only. See
[docs/THREAT_MODEL.md](docs/THREAT_MODEL.md).
