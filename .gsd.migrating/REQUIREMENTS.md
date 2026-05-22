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

### R002 — Represent GitHub activity as a designed build-time dashboard using repo/activity data fetched with a local or CI token, without exposing secrets in client code or logs.
- Class: integration
- Status: active
- Description: Represent GitHub activity as a designed build-time dashboard using repo/activity data fetched with a local or CI token, without exposing secrets in client code or logs.
- Why it matters: The user's GitHub work is the most honest representation of their output, but the static portfolio must remain fast, safe, and rate-limit resilient.
- Source: user-discussion-2026-05-21
- Validation: Build produces a static GitHub activity JSON artifact and the rendered dashboard shows contribution/activity signals without any token in bundled output.

### R003 — Use only C:/Users/smati/VS Code Projects/career-ops/cv.md as the source of truth for personal/career content unless the user provides explicit replacement copy.
- Class: constraint
- Status: active
- Description: Use only C:/Users/smati/VS Code Projects/career-ops/cv.md as the source of truth for personal/career content unless the user provides explicit replacement copy.
- Why it matters: Using other files caused hallucinated work history; the implementation must not import unsupported roles, companies, or claims.
- Source: user-correction-2026-05-21
- Validation: Content audit confirms Selected Work, Experience, Education, Leadership, and contact details are traceable to cv.md or explicit user-provided wording.

## Validated

## Deferred

## Out of Scope

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | core-capability | active | none | none | Browser verification shows the redesigned homepage uses the new editorial section order, warm paper palette, serif typography, and no remaining matrix/cosmic/terminal visual system. |
| R002 | integration | active | none | none | Build produces a static GitHub activity JSON artifact and the rendered dashboard shows contribution/activity signals without any token in bundled output. |
| R003 | constraint | active | none | none | Content audit confirms Selected Work, Experience, Education, Leadership, and contact details are traceable to cv.md or explicit user-provided wording. |

## Coverage Summary

- Active requirements: 3
- Mapped to slices: 3
- Validated: 0
- Unmapped active requirements: 0
