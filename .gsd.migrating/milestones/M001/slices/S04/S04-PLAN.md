# S04: Build Time GitHub Activity Dashboard

**Goal:** Create a safe build-time GitHub activity fetch and render a designed editorial dashboard from static JSON.
**Demo:** After this: npm run fetch-github-activity writes a public static data artifact, and the homepage renders a GitHub activity spread using that data or a graceful fallback.

## Must-Haves

- Node script reads token from .env without printing it and supports GITHUB_TOKEN_PORTFOLIO or GITHUB_TOKEN.
- Script fetches public user, repo, event, and contribution-like signals that GitHub REST can support safely.
- Script writes a sanitized static JSON artifact under src or public with no secrets.
- React dashboard renders headline stats, recent activity, active repos, and contribution-style visual rhythm in the editorial palette.
- Failure path writes or preserves a safe fallback and clearly reports a non-secret error.
- npm run build passes and built files do not contain token values.

## Proof Level

- This slice proves: operational

## Integration Closure

Crosses local secrets, GitHub API, build artifacts, and React rendering; it must prove safe end-to-end behavior.

## Verification

- Fetch script should report phase, API endpoint class, and fallback usage without logging Authorization headers or token values.

## Tasks

- [ ] **T01: Build safe GitHub activity fetch script** `est:1h 30m`
  Add a Node build-time script that reads .env safely without printing values, accepts GITHUB_TOKEN_PORTFOLIO or GITHUB_TOKEN, queries GitHub REST for aatif101 public profile, repos, events, and aggregate signals, and writes sanitized JSON to src/data/githubActivity.json. Include fallback behavior when token is missing or the API fails. Never log Authorization headers or token substrings.
  - Files: `scripts/fetch-github-activity.js`, `src/data/githubActivity.json`, `package.json`
  - Verify: npm run fetch-github-activity

- [ ] **T02: Verify GitHub data artifact safety** `est:1h`
  Add tests for the GitHub activity artifact shape and secret redaction constraints. Tests should verify required top-level fields, recent activity array shape, active repos shape, generated timestamp, and absence of token-looking values in the JSON artifact.
  - Files: `src/__tests__/github-activity-data.test.js`
  - Verify: npm test -- --watchAll=false --testPathPattern=github-activity-data

- [ ] **T03: Render editorial GitHub activity spread** `est:1h 30m`
  Render a designed GitHub activity spread from the static artifact. Include one large headline metric, contribution-style data print in cream and oxblood, recent activity lines, active repos, and a small tally line. It should look like an editorial annual-report spread, not GitHub's default green chart and not a dashboard card grid.
  - Files: `src/components/editorial/GitHubActivity.jsx`, `src/components/EditorialPortfolio.jsx`
  - Verify: npm run build

- [ ] **T04: Add no secret leakage verification** `est:45m`
  Add a secret-scan verification script or test that checks source and build output for common GitHub token prefixes and ensures .env remains ignored. Run it after build as part of slice verification. Do not read or print .env values.
  - Files: `scripts/verify-no-secrets.js`, `package.json`
  - Verify: npm run verify:no-secrets

## Files Likely Touched

- scripts/fetch-github-activity.js
- src/data/githubActivity.json
- package.json
- src/__tests__/github-activity-data.test.js
- src/components/editorial/GitHubActivity.jsx
- src/components/EditorialPortfolio.jsx
- scripts/verify-no-secrets.js
