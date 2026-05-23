---
id: T02
parent: S04
milestone: M001
key_files:
  - src/__tests__/github-activity-data.test.js
key_decisions:
  - Used explicit token-prefix/key-pattern checks rather than overly broad long-string heuristics so legitimate URLs/descriptions are not flagged as secrets.
duration: 
verification_result: passed
completed_at: 2026-05-23T04:10:34.409Z
blocker_discovered: false
---

# T02: Added static GitHub activity artifact safety tests covering render shape, timestamps, sanitized event/repo fields, and token-looking leakage patterns.

**Added static GitHub activity artifact safety tests covering render shape, timestamps, sanitized event/repo fields, and token-looking leakage patterns.**

## What Happened

Created `src/__tests__/github-activity-data.test.js` to parse the committed `src/data/githubActivity.json` artifact through Jest and verify the exact public data contract needed by the portfolio UI. The tests assert required top-level fields, ISO generated timestamps, profile and aggregate signal types, recent activity shape without raw payload/actor/org fields, repository shape without private/owner fields, and absence of secret-looking keys or values such as GitHub token prefixes, Authorization strings, bearer values, and token query parameters.

## Verification

Ran the focused CRA/Jest command for the new artifact test. It passed with 5 tests covering top-level shape, profile/signals, recent activity, active repositories, and secret-looking leakage checks.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npm test -- --watchAll=false --testPathPattern=github-activity-data` | 0 | ✅ pass | 3386ms |

## Deviations

None.

## Known Issues

None.

## Files Created/Modified

- `src/__tests__/github-activity-data.test.js`
