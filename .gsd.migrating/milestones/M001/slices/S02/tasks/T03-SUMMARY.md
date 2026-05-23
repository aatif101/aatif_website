---
id: T03
parent: S02
milestone: M001
key_files:
  - src/__tests__/editorial-motion.test.js
  - __mocks__/lenis.js
  - src/setupTests.js
  - package.json
key_decisions:
  - moduleNameMapper used to redirect lenis and gsap ESM modules to CJS builds — avoids ejecting CRA and keeps Jest transform config intact
  - resetMocks: false added to package.json jest config — CRA default resetMocks:true wiped jest.fn() constructor implementations between tests, breaking the Lenis mock
  - Manual __mocks__/lenis.js at project root rather than inline jest.mock factory — ensures consistent resolution when moduleNameMapper redirects the import to our CJS stub
  - matchMedia global stub in setupTests.js rather than per-test — gsap.registerPlugin(ScrollTrigger) calls matchMedia at module load time, before any per-test setup runs
duration: 
verification_result: passed
completed_at: 2026-05-22T18:49:28.569Z
blocker_discovered: false
---

# T03: Added 11-test reduced-motion guard suite for useEditorialMotion; fixed Jest ESM blockers for gsap and lenis via moduleNameMapper and manual mock

**Added 11-test reduced-motion guard suite for useEditorialMotion; fixed Jest ESM blockers for gsap and lenis via moduleNameMapper and manual mock**

## What Happened

The task required verifying that useEditorialMotion correctly skips Lenis and GSAP when prefers-reduced-motion is active, and adding a focused test suite to lock in that behavior.

**Hook analysis:** The hook already had a correct reduced-motion guard at line 38 — it reads `window.matchMedia('(prefers-reduced-motion: reduce)').matches` synchronously, stamps `data-reduced-motion` on `<html>`, and returns early before the dynamic `import('lenis')` call. CSS in index.css uses `html[data-reduced-motion='true']` to override `will-change` and a `@media (prefers-reduced-motion: reduce)` block to collapse all transitions. No content is hidden in reduced-motion mode — GSAP inline `opacity:0` only applies in normal-motion mode, and only after JS has confirmed motion is live.

**Jest ESM blockers:** Two ESM-only packages caused test failures: lenis ships only a `.mjs` bundle (no CJS fallback in its `main` field), and gsap/ScrollTrigger uses ESM imports. CRA's jest config has `transformIgnorePatterns` that blocks transforming node_modules, and `moduleFileExtensions` that excludes `.mjs`. Fix: added `moduleNameMapper` in package.json to redirect `lenis` → `__mocks__/lenis.js` (a CommonJS manual mock) and `gsap/ScrollTrigger` / `gsap` → their CJS dist builds. Also added `src/setupTests.js` with a global `matchMedia` stub so `gsap.registerPlugin(ScrollTrigger)` doesn't throw when the real CJS gsap loads at module scope.

**resetMocks conflict:** CRA's jest config sets `resetMocks: true`, which wipes mock implementations between tests — this broke the Lenis constructor mock since `jest.fn(() => instance)` had its implementation cleared. Fixed by setting `resetMocks: false` in the package.json jest override.

**Test suites written (11 tests total):**
- Reduced-motion guard (7): `data-reduced-motion="true"` stamped, `data-motion-ready` absent, Lenis not constructed, `gsap.fromTo` not called, `reducedMotion: true` returned, no inline opacity on reveal/hero elements
- Normal-motion path (3): `data-reduced-motion="false"` stamped, `reducedMotion: false` returned, Lenis constructed
- CSS contract (1): elements have no inline opacity before hook runs

**Side fix:** The `editorial-shell.test.js` was already failing (pre-existing, caused by T02 wiring gsap/ScrollTrigger into EditorialPortfolio). The moduleNameMapper + setupTests.js additions also fixed that suite as a side effect, restoring it to passing.

## Verification

Ran `npm test -- --watchAll=false --testPathPattern=editorial-motion --forceExit`. All 11 tests pass in ~3s. Also ran the full test suite: editorial-motion (11/11 pass), editorial-shell (9/9 pass, restored from pre-existing failure). GitHubService has 1 pre-existing failure unrelated to this task (confirmed via git stash before/after).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npx react-scripts test --watchAll=false --testPathPattern=editorial-motion --forceExit` | 0 | pass — 11/11 tests pass | 2987ms |
| 2 | `npx react-scripts test --watchAll=false --forceExit` | 1 | editorial-motion 11/11 pass, editorial-shell 9/9 pass; GitHubService 1 failure is pre-existing (confirmed via git stash) | 5477ms |

## Deviations

Added src/setupTests.js (not in the task plan's expected output list) to provide a global matchMedia stub — required because gsap's CJS dist calls matchMedia at module load time via registerPlugin(ScrollTrigger). Also added __mocks__/lenis.js to resolve the lenis ESM-only bundle issue. package.json jest config was extended with moduleNameMapper and resetMocks:false. These additions were necessary to make any tests runnable in the Jest/JSDOM environment and are not feature changes.

## Known Issues

GitHubService filterRepositories test has 1 pre-existing failure (expects length 3, gets 2) — not introduced by this task, present in main branch before T03 work began.

## Files Created/Modified

- `src/__tests__/editorial-motion.test.js`
- `__mocks__/lenis.js`
- `src/setupTests.js`
- `package.json`
