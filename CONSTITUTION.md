# Project Constitution

These principles govern every decision and every line of code. When a tradeoff is unclear, the higher-numbered principle yields to the lower-numbered one. Referenced throughout `ARCHITECTURE.md` and enforced via `.cursor/rules/00-constitution.mdc`.

1. **Architecture over speed.** Sound structure matters more than shipping fast.
2. **Simplicity over complexity.** Prefer the simplest solution that works; avoid unnecessary abstractions.
3. **Events are the primary entity.** Everything organizes around events, never around individual social posts.
4. **AI assists, never replaces, moderators.**
5. **Human verification before publication.** No content goes public without a human decision.
6. **Security and contributor privacy over convenience.**
7. **Reference, don't republish.** Link to external content; store copyrighted media only when unavoidable and rights-cleared.
8. **Fewer dependencies, fewer moving parts.**
9. **Document every major architectural decision** (`DECISIONS.md`).
10. **Usable without AI.** The platform must remain fully functional if AI services are unavailable.
11. **Optimize for maintainability, readability, and long-term sustainability.**
12. **Stay on free tiers** for as long as reasonably possible.

**Hard invariants (never violate without a new ADR):**
- AI output is always a *draft*; publishing is always a human action.
- RLS is enabled on every table; the service-role key never reaches the browser.
- Application code never calls an LLM directly — only through `AIProvider`.
- No submitter IP addresses or fingerprinting are stored.
- People detected by AI default to `redacted`; only verified public figures publish by default.
