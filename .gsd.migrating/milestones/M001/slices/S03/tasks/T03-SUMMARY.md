---
id: T03
parent: S03
milestone: M001
key_files:
  - src/__tests__/portfolio-content.test.js
key_decisions:
  - Validated the absence of a standalone Skills section by checking string values for an exact `Skills` label rather than rejecting the existing lowercase `skills` data object.
duration: 
verification_result: passed
completed_at: 2026-05-23T04:00:58.888Z
blocker_discovered: false
---

# T03: Added a portfolio content integrity test that locks approved project and experience names while rejecting prior hallucinated company claims.

**Added a portfolio content integrity test that locks approved project and experience names while rejecting prior hallucinated company claims.**

## What Happened

Created `src/__tests__/portfolio-content.test.js` to import the centralized `portfolioContent` model and verify the slice’s trustworthy-content guardrails. The test asserts selected work remains exactly Reliu and NazScan, experience organizations remain exactly Pfizer, CacheAi, USF IT, Mozilla, and Infrastructure Docs Collective, prior hallucinated companies Equitar, Triedata, Fovus, and Blink are absent from the serialized content, and no standalone `Skills` string label is exposed in content string values. The initial `gsd_exec` bash verification attempt failed because this Windows environment does not provide `/bin/bash`, so the same npm test command was rerun through a Node child_process shell wrapper.

## Verification

Ran `npm test -- --watchAll=false --testPathPattern=portfolio-content` through `gsd_exec` using a Node shell wrapper. Jest passed `src/__tests__/portfolio-content.test.js` with 1 test suite passed and 4 tests passed.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npm test -- --watchAll=false --testPathPattern=portfolio-content` | 0 | ✅ pass — 1 suite passed, 4 tests passed | 3856ms |

## Deviations

Used a Node child_process shell wrapper inside `gsd_exec` for verification because `gsd_exec` bash failed on Windows with `/bin/bash` unavailable. The effective npm test command and test pattern matched the task plan.

## Known Issues

None.

## Files Created/Modified

- `src/__tests__/portfolio-content.test.js`
