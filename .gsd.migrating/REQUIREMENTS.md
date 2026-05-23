# Requirements

This file is the explicit capability and coverage contract for the project.

## Active

### R001 — Replace the existing cosmic terminal portfolio with a one-page editorial portfolio using Spectral as the Plantin-like serif, warm cream paper color, restrained ink palette, and smooth novel-like scrolling.
- Class: core-capability
- Status: active
- Description: Replace the existing cosmic terminal portfolio with a one-page editorial portfolio using Spectral as the Plantin-like serif, warm cream paper color, restrained ink palette, and smooth novel-like scrolling.
- Why it matters: The current site does not match the user's desired personal brand; the redesign must feel intentional, editorial, minimal, and premium rather than AI-generated.
- Source: user-discussion-2026-05-21
- Validation: Browser verification shows the redesigned homepage uses the new editorial section order, warm paper palette, serif typography, and no remaining matrix/cosmic/terminal visual system.

### R004 — Motion must be premium, smooth, and accessible: Lenis for scroll feel, GSAP ScrollTrigger for choreography, and full reduced-motion fallbacks.
- Class: quality-attribute
- Status: active
- Description: Motion must be premium, smooth, and accessible: Lenis for scroll feel, GSAP ScrollTrigger for choreography, and full reduced-motion fallbacks.
- Why it matters: The desired site should feel like an editorial Apple/pi.dev-style scroll, but must remain usable for motion-sensitive users and performant on portfolio traffic.
- Source: user-discussion-2026-05-21
- Validation: Browser verification covers normal motion and reduced-motion mode, with no console errors and no keyboard/accessibility regressions.

## Validated

### R002 — Represent GitHub activity as a designed build-time dashboard using repo/activity data fetched with a local or CI token, without exposing secrets in client code or logs.
- Class: integration
- Status: validated
- Description: Represent GitHub activity as a designed build-time dashboard using repo/activity data fetched with a local or CI token, without exposing secrets in client code or logs.
- Why it matters: The user's GitHub work is the most honest representation of their output, but the static portfolio must remain fast, safe, and rate-limit resilient.
- Source: user-discussion-2026-05-21
- Primary owning slice: S04
- Validation: S04 closeout verification passed: `npm run fetch-github-activity` (gsd_exec 0b63f6eb-fe26-4298-ba30-aa0dc424a979) wrote `src/data/githubActivity.json` with `fallback:false`; `npm test -- --watchAll=false --testPathPattern=github-activity-data` (gsd_exec bd764391-9782-4f6f-8aa9-ec378f4d5c4a) passed 5 artifact shape and secret-redaction tests; `npm run build` (gsd_exec a0c45c77-761b-4609-8fc6-516f3c6cdfdc) compiled successfully; `npm run verify:no-secrets` (gsd_exec b0bdc52e-62a5-4d40-ae98-11526c455464) scanned 80 files including build output with `dotenvIgnored:true` and `githubTokenLeakage:false`.
- Notes: Validated by S04 Build Time GitHub Activity Dashboard.

### R003 — Use only C:/Users/smati/VS Code Projects/career-ops/cv.md as the source of truth for personal/career content unless the user provides explicit replacement copy.
- Class: constraint
- Status: validated
- Description: Use only C:/Users/smati/VS Code Projects/career-ops/cv.md as the source of truth for personal/career content unless the user provides explicit replacement copy.
- Why it matters: Using other files caused hallucinated work history; the implementation must not import unsupported roles, companies, or claims.
- Source: user-correction-2026-05-21
- Primary owning slice: S03
- Supporting slices: S01, S02
- Validation: S03 content integrity verification passed: `npm test -- --watchAll=false --testPathPattern=portfolio-content` (gsd_exec 94e8e55e-27ff-4290-8281-1382ffe7da08) verified selected work is constrained to Reliu and NazScan, experience organization names are constrained to the approved set, prior hallucinated companies are rejected, and no standalone Skills section label is exposed. `npm run build` (gsd_exec b385c247-0e47-4d9f-8949-e5e77e84d0d9) also passed.
- Notes: Validated by S03 Curated CV Content and Editorial Sections.

## Deferred

## Out of Scope

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | core-capability | active | none | none | Browser verification shows the redesigned homepage uses the new editorial section order, warm paper palette, serif typography, and no remaining matrix/cosmic/terminal visual system. |
| R002 | integration | validated | S04 | none | S04 closeout verification passed: `npm run fetch-github-activity` (gsd_exec 0b63f6eb-fe26-4298-ba30-aa0dc424a979) wrote `src/data/githubActivity.json` with `fallback:false`; `npm test -- --watchAll=false --testPathPattern=github-activity-data` (gsd_exec bd764391-9782-4f6f-8aa9-ec378f4d5c4a) passed 5 artifact shape and secret-redaction tests; `npm run build` (gsd_exec a0c45c77-761b-4609-8fc6-516f3c6cdfdc) compiled successfully; `npm run verify:no-secrets` (gsd_exec b0bdc52e-62a5-4d40-ae98-11526c455464) scanned 80 files including build output with `dotenvIgnored:true` and `githubTokenLeakage:false`. |
| R003 | constraint | validated | S03 | S01, S02 | S03 content integrity verification passed: `npm test -- --watchAll=false --testPathPattern=portfolio-content` (gsd_exec 94e8e55e-27ff-4290-8281-1382ffe7da08) verified selected work is constrained to Reliu and NazScan, experience organization names are constrained to the approved set, prior hallucinated companies are rejected, and no standalone Skills section label is exposed. `npm run build` (gsd_exec b385c247-0e47-4d9f-8949-e5e77e84d0d9) also passed. |
| R004 | quality-attribute | active | none | none | Browser verification covers normal motion and reduced-motion mode, with no console errors and no keyboard/accessibility regressions. |

## Coverage Summary

- Active requirements: 2
- Mapped to slices: 2
- Validated: 2 (R002, R003)
- Unmapped active requirements: 0
