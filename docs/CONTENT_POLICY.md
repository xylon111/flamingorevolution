# Content Policy — DRAFT

> **Status: DRAFT for human owner sign-off before M2/M7.** This is an engineering starting point, not legal advice. A responsible human editor/owner must review and own it. It drives schema and moderation behavior, so it is written early.

## 1. What gets published
An event is publishable when a moderator has (a) verified it describes a real occurrence related to the movement, (b) attached at least the minimum corroboration for its confidence level, and (c) resolved any named-individual and sensitive-marker questions below. AI drafts are never publishable as-is.

## 2. Source reliability tiers
Each source is classified. Indicative default weights (0–1) feed confidence; moderators may override.

| Tier | Example | Default weight |
|---|---|---|
| `government` | Official statement / gazette | 0.9 |
| `major_news` | Established outlet with a masthead | 0.85 |
| `verified_journalist` | Known reporter, verified account | 0.8 |
| `verified_organizer` | Recognized protest organizer/NGO | 0.7 |
| `citizen_video` | First-party video, plausible metadata | 0.55 |
| `citizen_photo` | First-party photo | 0.5 |
| `anonymous` | Unattributed report | 0.3 |
| `unknown` | Unclassified | 0.2 |

## 3. Confidence formula (definition)
`confidence` is a pure function, recomputed on change and overridable:

```
base            = max(reliability_weight of attached sources)
corroboration   = +0.05 per *independent* corroborating source (cap +0.25)
publication_type= small adjustment (primary/eyewitness > aggregated > opinion)
moderator_delta = explicit manual adjustment (recorded with reason)
confidence      = clamp(base + corroboration + publication_type + moderator_delta, 0, 1)
```
Independence: sources are "independent" only if not derived from one another (e.g. three reposts of one video = one source). Weights live here so tuning is a policy change, not a code change; if edited often, move to a config table (ADR-0004).

## 4. Naming individuals (redaction rules)
- AI-detected people default to **`redacted`**.
- Publish by default only: **public officials**, **verified organization representatives**, and **verified public figures** acting in a public capacity.
- **Private individuals are not named** without a specific editorial reason and moderator decision; err toward redaction. Wrongful/association naming is a defamation and physical-safety risk.
- Provide a **right-of-reply / correction** path for anyone named.

## 5. Sensitive map markers
- `police_presence` is **not enabled in v1** (ADR-0009).
- `meeting_point`, `roadblock`, `medical_aid`, `water`, `press`, `protest`: moderator-verified before public; set `valid_until` (auto-expire) so stale tactical data disappears.

## 6. Media & copyright
- Prefer official embeds/links to third-party media; store URL + metadata + our own summary, not copies.
- First-party uploads only when rights are clear; strip EXIF/GPS on upload.
- Record `credit` and `license` for every media item.

## 7. Corrections & takedowns
- Publish a visible corrections process and a takedown/appeal contact.
- Log every correction in the audit trail; keep an editorial changelog for significant events.

## 8. Tone & scope
- Neutral, factual summaries. The platform documents and organizes; it does not editorialize.
- Out of scope: unrelated news, personal disputes, unverifiable rumor.
