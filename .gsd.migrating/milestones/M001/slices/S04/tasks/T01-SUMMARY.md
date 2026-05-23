---
id: T01
parent: S04
milestone: M001
key_files:
  - scripts/fetch-github-activity.js
  - src/data/githubActivity.json
  - src/__tests__/github-activity-fetch.test.js
  - package.json
key_decisions:
  - Implemented a dependency-free .env parser instead of adding dotenv so the build-time fetch path does not require dependency changes.
  - Kept Authorization only inside request options and excluded token-like keys from all structured logs.
duration: 
verification_result: passed
completed_at: 2026-05-23T04:05:18.263Z
blocker_discovered: false
---

# T01: Added a safe build-time GitHub REST fetch script and npm command that writes sanitized activity data to src/data/githubActivity.json with graceful fallback support.

**Added a safe build-time GitHub REST fetch script and npm command that writes sanitized activity data to src/data/githubActivity.json with graceful fallback support.**

## What Happened

Created scripts/fetch-github-activity.js as a CommonJS Node CLI that reads .env directly without printing values, resolves GITHUB_TOKEN_PORTFOLIO before GITHUB_TOKEN, requests the aatif101 profile, repos, and public events through GitHub REST, aggregates public signals, sanitizes repository and event payloads, and writes the static JSON artifact consumed by the app. Added src/data/githubActivity.json as the static output artifact and wired package.json with npm run fetch-github-activity. Added Jest coverage for dotenv parsing/token precedence, Authorization header containment, sanitized activity shaping, and fallback output shape. The script logs only non-secret phases, endpoint classes, status/rate-limit metadata, fallback state, and output path.

## Verification

Ran focused Jest tests via gsd_exec node/cmd.exe because bash is unavailable in this Windows runner. Ran npm run fetch-github-activity, which successfully queried GitHub REST and wrote src/data/githubActivity.json with fallback=false. Ran an additional artifact/log safety validation that parsed the generated JSON and scanned captured fetch output for Authorization, Bearer token patterns, or GITHUB_TOKEN markers; no leakage was found.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npm test -- --watchAll=false --runTestsByPath src/__tests__/github-activity-fetch.test.js` | 0 | ✅ pass | 4944ms |
| 2 | `npm run fetch-github-activity` | 0 | ✅ pass | 1502ms |
| 3 | `node artifact/log safety validation for src/data/githubActivity.json and fetch stdout` | 0 | ✅ pass | 66ms |

## Deviations

Used gsd_exec runtime='node' spawning cmd.exe for npm commands after runtime='bash' failed due to missing /bin/bash in this Windows environment; implementation scope unchanged.

## Known Issues

None.

## Files Created/Modified

- `scripts/fetch-github-activity.js`
- `src/data/githubActivity.json`
- `src/__tests__/github-activity-fetch.test.js`
- `package.json`
