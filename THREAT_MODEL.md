# Threat Model — DRAFT

> **Status: DRAFT for human owner sign-off before launch (M7).** Context: an active anti-government movement in Albania with documented police violence and human-rights concern. Safety is a first-class requirement, not a formality.

## Assets to protect
- **Contributors' identities** (submitters, especially anonymous ones).
- **Named individuals** in content (protesters, bystanders, officials).
- **The archive's integrity** (accurate, tamper-evident record).
- **Availability** of the platform (resistance to takedown/DDoS).
- **Credentials & data** (service-role key, DB, backups).

## Adversaries (illustrative)
- State/political actors seeking to identify contributors, discredit the archive, or force takedown.
- Bad actors injecting disinformation into the pipeline.
- Opportunistic attackers (spam, DDoS, credential theft).
- Well-meaning users who over-share dangerous tactical detail.

## Threats → mitigations
| Threat | Mitigation |
|---|---|
| Deanonymizing submitters | No IP/fingerprint logging; guest submission allowed; cookieless analytics; minimal PII |
| Doxxing / GPS leakage in media | EXIF/GPS stripped on upload; people `redacted` by default; naming policy (`CONTENT_POLICY.md`) |
| Endangering people via live tactical data | `police_presence` deferred (ADR-0009); markers verified + auto-expiring |
| Disinformation injected via submissions | Human-gated publishing; reliability + corroboration; audit trail |
| Defamation via AI hallucination | Drafts only; conservative person extraction; right-of-reply |
| Account/role compromise | RLS-first; least privilege; service-role quarantined; audit log; ≥2 admins |
| Data breach | RLS default-deny; encrypted off-platform backups; secrets in managed stores |
| Takedown / censorship | Reference-not-copy archive; portable stack (Cloudflare Pages/R2); encrypted backups; documented process |
| Spam / DDoS | Cloudflare WAF + Turnstile + rate limits |
| LLM data exposure (free tier trains on prompts) | Send only public content, never PII; option to swap `AIProvider` to a private/self-hosted model |

## Residual risks (accepted / to revisit)
- Free-tier hosting can be pressured or rate-limited; mitigated by portability, not eliminated.
- oEmbed limits may degrade some previews; link fallback accepted.
- Heuristic dedup (no embeddings in v1) will miss some duplicates; moderator merge covers it.

## Decisions requiring a human owner
1. Final call on ever enabling live police-presence mapping.
2. Jurisdiction / hosting-of-record and legal contact for takedowns.
3. Data-retention limits for submissions and audit logs.
4. Whether to enable a privacy-preserving (paid/self-hosted) `AIProvider` before scaling.
