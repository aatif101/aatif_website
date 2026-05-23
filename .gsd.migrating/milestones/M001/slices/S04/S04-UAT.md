# S04: S04 — UAT

**Milestone:** M001
**Written:** 2026-05-23T07:22:24.739Z

# UAT: S04 Build Time GitHub Activity Dashboard

## UAT Type
Operational integration UAT for build-time data generation, static rendering, fallback visibility, and secret-safety verification.

## Preconditions
- Project dependencies are installed.
- Optional: a valid `GITHUB_TOKEN_PORTFOLIO` or `GITHUB_TOKEN` may be available locally or in CI. The flow must still work without exposing token values.
- The working tree includes S04 files: `scripts/fetch-github-activity.js`, `src/data/githubActivity.json`, `src/components/editorial/GitHubActivity.jsx`, `src/__tests__/github-activity-data.test.js`, `scripts/verify-no-secrets.js`, and related `package.json` scripts.

## Steps and Expected Outcomes
1. Run `npm run fetch-github-activity`.
   - Expected: command exits 0.
   - Expected: logs show non-secret phase/endpoint/fallback information only.
   - Expected: `src/data/githubActivity.json` exists and contains sanitized static data with generated metadata.
   - Expected: when the API succeeds, `fallback:false`; when token/API access fails, a safe fallback artifact is written or preserved with a non-secret fallback reason.

2. Run `npm test -- --watchAll=false --testPathPattern=github-activity-data`.
   - Expected: the focused GitHub activity data test suite passes.
   - Expected: tests cover required top-level fields, generated timestamp, recent activity shape, active repositories shape, and absence of token-looking values.

3. Run `npm run build`.
   - Expected: the production CRA build exits 0.
   - Expected: the homepage bundle includes the GitHub activity spread integration and remains deployable.

4. Inspect the homepage in a local browser during final visual QA.
   - Expected: the page contains an editorial GitHub Activity spread, not a default GitHub green chart or card-grid dashboard.
   - Expected: the spread presents a headline activity metric, contribution-style visual rhythm, recent activity lines, active repositories, and a tally/status line in the established cream/ink/oxblood palette.
   - Expected: if fallback data is in use, the fallback state is visible as restrained editorial copy rather than hidden in console-only diagnostics.

5. Run `npm run verify:no-secrets` after the production build.
   - Expected: command exits 0.
   - Expected: source and build output are scanned for common GitHub token leakage patterns.
   - Expected: `.env` files are not read or printed, and `.gitignore` coverage for dotenv files is verified.
   - Expected: output reports no GitHub token leakage.

## Edge Cases
- Missing token: fetch should still exit safely with a fallback artifact and no secret-related log output.
- Invalid token or GitHub API error: fetch should preserve/write safe fallback data and report only a non-secret error class/reason.
- Existing production build: `verify:no-secrets` should include build output when present.
- Local `.env`: verifier should confirm it is ignored without reading or printing its values.

## Not Proven By This UAT
- Full visual taste approval across all sections; that belongs to the final polish slice.
- Browser-level accessibility checks for the entire page; those are part of S06.
- CI scheduling for nightly GitHub activity refresh; this slice provides the local/build-time command and static artifact path only.
