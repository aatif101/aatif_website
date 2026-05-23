---
id: T03
parent: S04
milestone: M001
key_files:
  - src/components/editorial/GitHubActivity.jsx
  - src/components/EditorialPortfolio.jsx
  - src/__tests__/editorial-shell.test.js
key_decisions:
  - Rendered fallback status as visible editorial copy (`Fallback data visible` plus reason) rather than hiding it in console-only diagnostics so stale/missing data is observable in the static site.
  - Kept the GitHub spread on a custom wide section instead of the prose-width `SectionShell`, preserving the annual-report spread layout requested by the task.
duration: 
verification_result: passed
completed_at: 2026-05-23T04:10:46.849Z
blocker_discovered: false
---

# T03: Rendered a wide editorial GitHub activity spread from the static artifact and integrated it into the homepage with fallback visibility.

**Rendered a wide editorial GitHub activity spread from the static artifact and integrated it into the homepage with fallback visibility.**

## What Happened

Added `GitHubActivity` as an editorial annual-report style spread that imports the static GitHub activity artifact, computes a large headline metric, renders a cream/oxblood contribution-style data print, lists recent public activity, lists active repositories, and shows a tally/status line. Integrated the spread into `EditorialPortfolio` as a wide `#github-activity` section with navigation. The component renders explicit fallback labels and fallback empty-state copy when the artifact is marked as fallback or lacks activity/repositories, so missing/stale fetch data remains visible without crashing. Added a regression assertion in the editorial shell test to confirm the homepage exposes the new activity report, headings, and status label.

## Verification

Ran the production CRA build successfully. Also ran the editorial shell regression test after adding the GitHub spread assertion; all 10 shell tests passed.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npm test -- --watchAll=false --runTestsByPath src/__tests__/editorial-shell.test.js` | 0 | ✅ pass | 8046ms |
| 2 | `npm run build` | 0 | ✅ pass | 23955ms |

## Deviations

Added a focused regression assertion to `src/__tests__/editorial-shell.test.js` in addition to the planned component and portfolio integration files, because the task created a user-visible homepage section and the execution rules required tests for touched behavior.

## Known Issues

`npm run build` still emits the existing CRA Browserslist/caniuse-lite staleness warning; build exits 0 and the warning is unrelated to this task.

## Files Created/Modified

- `src/components/editorial/GitHubActivity.jsx`
- `src/components/EditorialPortfolio.jsx`
- `src/__tests__/editorial-shell.test.js`
