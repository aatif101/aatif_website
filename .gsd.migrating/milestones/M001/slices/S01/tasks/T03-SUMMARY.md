---
id: T03
parent: S01
milestone: M001
key_files:
  - src/components/editorial/OpeningSpread.jsx
  - src/components/editorial/SectionShell.jsx
  - src/components/EditorialPortfolio.jsx
  - src/__tests__/editorial-shell.test.js
key_decisions:
  - Extracted OpeningSpread as a standalone component rather than an inline section so future slices can import and test it independently without touching the root layout file.
  - SectionShell accepts a surface prop ('paper' | 'surface') to alternate backgrounds between sections, preserving the alternating rhythm established in T02 without hardcoding colors in the caller.
  - Shell test includes a source-file read assertion (fs.readFileSync) to catch future re-introduction of legacy imports — this gives future agents a deterministic signal without needing a browser.
duration: 
verification_result: passed
completed_at: 2026-05-22T18:32:18.249Z
blocker_discovered: false
---

# T03: Extracted OpeningSpread and SectionShell editorial components, refactored EditorialPortfolio to use them, and added 10-test shell verification suite (all passing).

**Extracted OpeningSpread and SectionShell editorial components, refactored EditorialPortfolio to use them, and added 10-test shell verification suite (all passing).**

## What Happened

The existing EditorialPortfolio.jsx from T02 already contained the correct editorial structure with no terminal or matrix visuals. T03 decomposed it into two reusable components: OpeningSpread.jsx (the lede spread with display headline and body copy) and SectionShell.jsx (a parameterised section wrapper with label, heading, surface prop, and children slot). EditorialPortfolio.jsx was rewritten to import and compose these — the file is now ~90 lines vs the original ~295 and reads like a table of contents for the one-page scroll. The shell test suite in src/__tests__/editorial-shell.test.js covers nine DOM assertions (identity heading contains "Aatif", all five section anchors present, footer rendered, skip link href, lede headline text) and one source-level assertion that EditorialPortfolio.jsx contains no references to matrix, terminal, cosmic, rain, framer-motion, gsap, or lenis.

## Verification

Ran: npx react-scripts test --watchAll=false --testPathPattern=editorial-shell --forceExit. All 10 tests passed in 5.1 s. The only output besides PASS was a React 18 act() deprecation warning from CRA's pinned @testing-library/react — not a test failure and not actionable without ejecting.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npx react-scripts test --watchAll=false --testPathPattern=editorial-shell --forceExit` | 0 | 10/10 tests passed | 5118ms |

## Deviations

none

## Known Issues

CRA's pinned @testing-library/react emits a ReactDOMTestUtils.act deprecation warning on React 18. Not a test failure; requires upgrading @testing-library/react to 14+ which would need ejecting or overriding CRA's dependency resolution.

## Files Created/Modified

- `src/components/editorial/OpeningSpread.jsx`
- `src/components/editorial/SectionShell.jsx`
- `src/components/EditorialPortfolio.jsx`
- `src/__tests__/editorial-shell.test.js`
