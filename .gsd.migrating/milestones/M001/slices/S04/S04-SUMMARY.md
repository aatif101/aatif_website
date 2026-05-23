---
id: S04
parent: M001
milestone: M001
provides:
  - A static `src/data/githubActivity.json` artifact for downstream rendering and deployment.
  - An editorial GitHub Activity homepage spread ready for final polish.
  - A repeatable `npm run verify:no-secrets` command for S06 final release verification.
requires:
  - slice: S01
    provides: Editorial shell, design tokens, and section containers.
  - slice: S02
    provides: Motion/reduced-motion behavior used by the homepage shell.
  - slice: S03
    provides: Stable curated homepage content and section structure before adding GitHub activity.
affects:
  - S05
  - S06
key_files:
  - scripts/fetch-github-activity.js
  - src/data/githubActivity.json
  - src/__tests__/github-activity-data.test.js
  - src/__tests__/github-activity-fetch.test.js
  - src/components/editorial/GitHubActivity.jsx
  - src/components/EditorialPortfolio.jsx
  - scripts/verify-no-secrets.js
  - package.json
  - build/
key_decisions:
  - Use dependency-free `.env` parsing and Node scripts to avoid dependency churn for build-time GitHub fetching and secret verification.
  - Keep Authorization only inside request options and exclude token-like values from logs and static artifacts.
  - Render fallback GitHub data status visibly in the editorial UI so stale/API-failure states are observable.
  - Skip `.env` files during secret scanning and validate gitignore coverage instead of reading secret files.
patterns_established:
  - Build-time GitHub REST fetch writes a sanitized static JSON artifact for client rendering.
  - Static data artifact tests verify schema and secret redaction constraints.
  - No-secret verification scans source and build output while redacting findings and avoiding dotenv reads.
  - Visible fallback copy doubles as an operational signal in a static portfolio.
observability_surfaces:
  - Fetch script phase logs for endpoint class, completion, write status, and fallback usage without secret values.
  - GitHub dashboard visible fallback/status line for static-site diagnosis.
  - `verify:no-secrets` output reports scanned file count, build-output coverage, dotenv ignore status, and token leakage verdict.
drill_down_paths:
  - .gsd/milestones/M001/slices/S04/tasks/T01-SUMMARY.md
  - .gsd/milestones/M001/slices/S04/tasks/T02-SUMMARY.md
  - .gsd/milestones/M001/slices/S04/tasks/T03-SUMMARY.md
  - .gsd/milestones/M001/slices/S04/tasks/T04-SUMMARY.md
duration: ""
verification_result: passed
completed_at: 2026-05-23T07:22:24.738Z
blocker_discovered: false
---

# S04: S04

**Built and verified a safe build-time GitHub activity pipeline that writes sanitized static JSON and renders an editorial GitHub activity spread with graceful fallback behavior.**

## What Happened

S04 delivered the GitHub activity integration end to end. The slice added a dependency-free build-time fetch script that reads `GITHUB_TOKEN_PORTFOLIO` or `GITHUB_TOKEN` without printing secret values, queries GitHub REST for public profile, repositories, events, and contribution-like signals, and writes a sanitized `src/data/githubActivity.json` artifact. It added focused artifact tests covering top-level shape, generated timestamps, profile/signals, recent activity, active repositories, and token-looking leakage constraints. The homepage now includes a wide editorial GitHub activity spread that uses the static artifact for headline metrics, contribution-style rhythm, recent activity, active repositories, and a small tally line, while visibly reporting fallback status when static data is stale or API fallback data is being used. The slice also added a repeatable `npm run verify:no-secrets` scanner that skips `.env` contents, validates `.env` remains gitignored, scans source/build outputs for common GitHub token leakage patterns, and redacts findings. Closeout refreshed the artifact successfully with real API data (`fallback:false`), rebuilt the production bundle, reran focused artifact tests, and reran the no-secret leakage verifier after build.

## Verification

Closeout verification passed through `gsd_exec`: `npm run fetch-github-activity` (0b63f6eb-fe26-4298-ba30-aa0dc424a979) exited 0, queried GitHub REST successfully, wrote `src/data/githubActivity.json`, and reported `fallback:false`; `npm test -- --watchAll=false --testPathPattern=github-activity-data` (bd764391-9782-4f6f-8aa9-ec378f4d5c4a) exited 0 with 1 suite and 5 tests passing; `npm run build` (a0c45c77-761b-4609-8fc6-516f3c6cdfdc) exited 0 and produced a deployable CRA build; `npm run verify:no-secrets` (b0bdc52e-62a5-4d40-ae98-11526c455464) exited 0, scanned 80 files including build output, reported `dotenvIgnored:true`, and reported `githubTokenLeakage:false`. Requirement R002 was updated to validated with this evidence.

## Requirements Advanced

- R001 — Added the planned GitHub Activity section to the one-page editorial homepage in the established visual language.
- R002 — Implemented build-time GitHub data fetching, static artifact generation, static rendering, fallback behavior, and secret leakage verification.

## Requirements Validated

- R002 — `npm run fetch-github-activity`, focused artifact tests, production build, and `npm run verify:no-secrets` all passed in closeout; build/static outputs reported no GitHub token leakage.

## New Requirements Surfaced

- None.

## Requirements Invalidated or Re-scoped

None.

## Operational Readiness

None.

## Deviations

Used Node wrappers around `cmd.exe` for verification commands because this Windows runner does not provide `/bin/bash` for `gsd_exec` bash runtime. T03 also added a focused editorial shell regression assertion for the new homepage spread. T04 intentionally tested dummy-token failure behavior during task execution, which produced fallback data temporarily; closeout reran the real fetch and restored `fallback:false`.

## Known Limitations

The GitHub activity artifact is refreshed only when `npm run fetch-github-activity` is run locally or in CI; automated scheduling is not part of this slice. Browser-level visual/a11y validation of the full page remains for S06.

## Follow-ups

S05 should consume the GitHub dashboard as a completed upstream section and add Things I Find Cool plus the colophon. S06 should perform final browser visual, accessibility, console, reduced-motion, and old-system removal checks.

## Files Created/Modified

- `scripts/fetch-github-activity.js` — Build-time GitHub REST fetch script with safe env handling, sanitized artifact writing, and fallback behavior.
- `src/data/githubActivity.json` — Static sanitized GitHub activity artifact consumed by the React app.
- `src/__tests__/github-activity-data.test.js` — Focused artifact shape and secret-redaction tests.
- `src/__tests__/github-activity-fetch.test.js` — Fetch script behavior and safety tests from T01.
- `src/components/editorial/GitHubActivity.jsx` — Editorial annual-report-style GitHub activity spread component.
- `src/components/EditorialPortfolio.jsx` — Homepage integration for the GitHub Activity spread.
- `src/__tests__/editorial-shell.test.js` — Regression coverage for the homepage GitHub spread integration.
- `scripts/verify-no-secrets.js` — Dependency-free source/build secret leakage verifier.
- `package.json` — Added fetch and no-secret verification npm scripts.
