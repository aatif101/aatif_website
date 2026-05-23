---
id: S03
parent: M001
milestone: M001
provides:
  - Stable curated portfolio content module for downstream dashboard and colophon slices.
  - Rendered editorial sections for lede, selected work, experience, education, leadership, and contact details.
  - Executable guard against unsupported personal-content claims.
requires:
  - slice: S01
    provides: Editorial shell, design tokens, section containers, and removal of the old cosmic terminal system.
  - slice: S02
    provides: Motion orchestration and reduced-motion section behavior for content sections.
affects:
  - S04
  - S05
  - S06
key_files:
  - src/content/portfolioContent.js
  - src/components/EditorialPortfolio.jsx
  - src/components/editorial/OpeningSpread.jsx
  - src/components/editorial/SelectedWork.jsx
  - src/components/editorial/ExperienceTimeline.jsx
  - src/__tests__/portfolio-content.test.js
  - src/__tests__/portfolioContent.test.js
  - src/__tests__/editorial-shell.test.js
key_decisions:
  - Centralized personal/career claims in `src/content/portfolioContent.js` so future edits have a single auditable source.
  - Constrained Selected Work to Reliu and NazScan only, matching the explicit slice contract.
  - Folded education and leadership into the editorial timeline instead of creating standalone Skills or card-grid sections.
  - Checked for an exact public `Skills` label rather than banning lowercase internal `skills` data.
patterns_established:
  - Personal content is data-driven from `portfolioContent` and then rendered by editorial components.
  - Content integrity tests serialize the content model to catch unsupported names before visual review.
  - Future content edits should update the content module first, then rely on Jest for claim integrity.
observability_surfaces:
  - `src/__tests__/portfolio-content.test.js` is the canonical diagnostic surface for content integrity regressions.
  - `npm run build` remains the production compile check for the assembled editorial page.
drill_down_paths:
  - .gsd/milestones/M001/slices/S03/tasks/T01-SUMMARY.md
  - .gsd/milestones/M001/slices/S03/tasks/T02-SUMMARY.md
  - .gsd/milestones/M001/slices/S03/tasks/T03-SUMMARY.md
duration: ""
verification_result: passed
completed_at: 2026-05-23T04:02:36.361Z
blocker_discovered: false
---

# S03: Curated CV Content and Editorial Sections

**Trusted CV-sourced portfolio content now drives the editorial lede, selected-work spreads, combined timeline, education, leadership, and contact details, with tests guarding against unsupported claims.**

## What Happened

S03 replaced placeholder editorial content with a centralized trustworthy content model in `src/content/portfolioContent.js`. The selected-work model is intentionally constrained to Reliu and NazScan using the explicit positioning from the milestone plan: Reliu moved from zero to TestFlight ready, and NazScan was an attempt at a one-command security scanner for vibe-coded repos. The React editorial shell now renders identity, lede, selected work, experience, education, leadership, and contact details from that module instead of hard-coded placeholder copy. Education and leadership are folded into the same editorial timeline rather than becoming separate card grids or skill gutters, preserving the one-page editorial pacing established by S01 and S02. A focused content integrity Jest test was added at `src/__tests__/portfolio-content.test.js` to lock approved selected-work and organization names, reject known hallucinated companies from earlier drafts, and prevent a standalone `Skills` section label from entering the content model.

## Verification

Closeout verification was run through `gsd_exec` only. `npm test -- --watchAll=false --testPathPattern=portfolio-content` passed in gsd_exec `94e8e55e-27ff-4290-8281-1382ffe7da08`: 1 suite passed, 4 tests passed, covering approved project names, approved organization names, banned hallucinated companies, and absence of a standalone Skills section label. `npm run build` passed in gsd_exec `b385c247-0e47-4d9f-8949-e5e77e84d0d9` and produced the CRA production build. The build emitted only the known non-fatal Browserslist/caniuse-lite freshness warning.

## Requirements Advanced

- R001 — Advanced by replacing placeholder editorial sections with real one-page portfolio content while preserving the S01/S02 editorial shell and motion structure.
- R003 — Advanced and validated by centralizing CV-sourced personal content and adding integrity tests against unsupported claims.

## Requirements Validated

- R003 — `npm test -- --watchAll=false --testPathPattern=portfolio-content` passed in gsd_exec `94e8e55e-27ff-4290-8281-1382ffe7da08`, verifying approved selected work, approved organizations, banned hallucinated companies, and no standalone Skills label; `npm run build` also passed in gsd_exec `b385c247-0e47-4d9f-8949-e5e77e84d0d9`.

## New Requirements Surfaced

- None.

## Requirements Invalidated or Re-scoped

- None. — 

## Operational Readiness

None.

## Deviations

T01 added an initial focused content integrity test earlier than planned, strengthening the slice contract. T03 used a Node child_process wrapper inside `gsd_exec` because the bash runtime is unavailable on this Windows environment; the effective npm command matched the planned verification.

## Known Limitations

The production build still emits the pre-existing Browserslist/caniuse-lite freshness warning. Full-suite verification has an unrelated legacy `src/services/__tests__/GitHubService.test.js` repository-count expectation noted during T02; S03 focused verification and build both pass.

## Follow-ups

S04 should consume `portfolioContent` as the stable personal-content context when adding the build-time GitHub activity dashboard. S06 should revisit the unrelated GitHubService full-suite failure if full-suite green status is required before deployment.

## Files Created/Modified

- `src/content/portfolioContent.js` — Centralized trusted identity, lede, selected work, timeline, education, leadership, and contact content.
- `src/components/EditorialPortfolio.jsx` — Wired the editorial page to render from the trusted content model.
- `src/components/editorial/OpeningSpread.jsx` — Rendered opening identity and lede content from the content module.
- `src/components/editorial/SelectedWork.jsx` — Rendered two pinned selected-work spreads for Reliu and NazScan.
- `src/components/editorial/ExperienceTimeline.jsx` — Rendered experience, education, and leadership as one dense editorial timeline.
- `src/__tests__/portfolio-content.test.js` — Added content integrity guard for approved projects, approved organizations, banned hallucinated companies, and standalone Skills label prevention.
- `src/__tests__/portfolioContent.test.js` — Earlier focused content tests covering the content module contract.
- `src/__tests__/editorial-shell.test.js` — Extended DOM-level editorial shell coverage for visible trusted content.
