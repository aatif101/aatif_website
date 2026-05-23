---
id: S02
parent: M001
milestone: M001
provides:
  - A reusable editorial motion orchestration layer for downstream content slices.
  - Reduced-motion-safe section behavior for the one-page portfolio shell.
  - Stable data attributes for hero, reveal, pinned spread, and timeline choreography.
requires:
  - slice: S01
    provides: Editorial app shell, design tokens, font loading, and section containers.
affects:
  - S03: Curated CV Content and Editorial Sections
  - S06: Polish Verification and Old System Removal
key_files:
  - src/hooks/useEditorialMotion.js
  - src/components/EditorialPortfolio.jsx
  - src/components/editorial/SectionShell.jsx
  - src/components/editorial/OpeningSpread.jsx
  - src/index.css
  - src/__tests__/editorial-motion.test.js
  - src/setupTests.js
  - __mocks__/lenis.js
  - package.json
  - package-lock.json
key_decisions:
  - Centralize Lenis and GSAP integration in `useEditorialMotion` instead of scattering animation code across sections.
  - Use `data-motion-*` attributes as stable animation hooks for future content slices.
  - Set `data-reduced-motion` on `<html>` so CSS/tests can inspect motion state without duplicating media-query logic.
  - Map Lenis and GSAP to Jest-compatible modules rather than ejecting CRA.
patterns_established:
  - Motion-enabled sections opt in through SectionShell props and data attributes.
  - Content remains visible by default; JS animation enhances rather than gates readability.
  - Reduced-motion support is verified at the hook boundary with matchMedia-controlled tests.
observability_surfaces:
  - Development-only guarded console error for motion initialization failures.
  - `data-reduced-motion` document attribute for DOM-level inspection of motion mode.
  - Focused `editorial-motion` Jest suite for reduced-motion and initialization diagnostics.
drill_down_paths:
  - .gsd/milestones/M001/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M001/slices/S02/tasks/T02-SUMMARY.md
  - .gsd/milestones/M001/slices/S02/tasks/T03-SUMMARY.md
duration: ""
verification_result: passed
completed_at: 2026-05-23T03:53:06.562Z
blocker_discovered: false
---

# S02: Scroll Choreography and Reduced Motion

**Centralized Lenis and GSAP scroll choreography now drives the editorial shell, with reduced-motion guards and tests keeping all sections static and readable when motion is disabled.**

## What Happened

S02 added a contained `useEditorialMotion` hook that owns all Lenis and GSAP ScrollTrigger integration for the redesigned portfolio. The hook registers ScrollTrigger, initializes Lenis only when `prefers-reduced-motion` is not active, proxies Lenis scroll state into ScrollTrigger, sets an inspectable `data-reduced-motion` attribute on the document element, and cleans up timelines, triggers, RAF handles, and Lenis state on unmount. The editorial page now consumes that hook at the shell level and exposes stable `data-motion-*` hooks on the opening identity, section reveal groups, selected-work spread, and timeline year placeholders so later content inherits the choreography instead of reimplementing it. CSS was adjusted so pre-JS and reduced-motion states remain visible and readable rather than depending on hidden-until-animated content. The test environment was also hardened for motion code: Jest maps Lenis and GSAP to test-compatible modules, a global matchMedia stub is installed before module load, and the focused motion test suite verifies reduced-motion behavior and normal motion initialization.

## Verification

Fresh closeout verification passed. `npm run build` and `npm test -- --watchAll=false --testPathPattern=editorial-motion --forceExit` were run through `gsd_exec` in run e97d0735-2aab-4fca-9802-6eb3e442b8d8; both exited 0. A local CRA dev server was started and a headless Microsoft Edge CDP scroll check navigated to `http://localhost:3000`, scrolled through the page, and reported `browser_console_errors=0` in `gsd_exec` run 35be60de-e3a7-47a9-af1a-493c0c92b034. The initial bash and Playwright attempts failed because the verification environment lacked `/bin/bash` and the `playwright` package; those were tool/environment failures and were superseded by successful Node/Edge verification.

## Requirements Advanced

- R001 — Added the smooth novel-like scrolling foundation and reduced-motion fallback required for the one-page editorial portfolio.

## Requirements Validated

None.

## New Requirements Surfaced

- None.

## Requirements Invalidated or Re-scoped

None.

## Operational Readiness

None.

## Deviations

Added `src/setupTests.js` and `__mocks__/lenis.js` to support Jest/JSDOM motion tests, and extended `package.json` Jest configuration with `moduleNameMapper` and `resetMocks:false`. These were not in the original task file list but were required to test Lenis and GSAP in CRA without ejecting. OpeningSpread uses `data-motion-hero` on its inner content rather than the outer section to avoid conflicting with section padding layout.

## Known Limitations

The broader full test suite still contains a pre-existing unrelated GitHubService `filterRepositories` failure noted by T03; it was present before this slice and is outside S02 motion work. Final real content and GitHub dashboard are deferred to later slices.

## Follow-ups

S03 should attach curated CV-backed content to the existing section structure and reuse the `motionReveal`/`data-motion-*` surfaces rather than adding component-local GSAP code.

## Files Created/Modified

- `package.json` — Added Lenis/GSAP dependencies and Jest module mapping needed for motion tests.
- `package-lock.json` — Locked installed Lenis/GSAP dependency graph.
- `src/hooks/useEditorialMotion.js` — Introduced centralized Lenis, GSAP ScrollTrigger, cleanup, reduced-motion, and motion timeline orchestration.
- `src/components/EditorialPortfolio.jsx` — Wired the editorial shell to the motion hook and hero/reveal data attributes.
- `src/components/editorial/SectionShell.jsx` — Added opt-in section reveal surface for downstream content.
- `src/components/editorial/OpeningSpread.jsx` — Added hero motion hook target to the opening spread content.
- `src/index.css` — Added motion and reduced-motion CSS behavior that preserves readable content.
- `src/__tests__/editorial-motion.test.js` — Added focused tests for reduced-motion guard behavior and motion initialization.
- `src/setupTests.js` — Added global matchMedia test stub required before GSAP module initialization.
- `__mocks__/lenis.js` — Added Lenis mock for CRA/Jest compatibility.
