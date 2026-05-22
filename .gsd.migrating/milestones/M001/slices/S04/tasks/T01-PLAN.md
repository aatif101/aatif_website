---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T01: Build safe GitHub activity fetch script

Add a Node build-time script that reads .env safely without printing values, accepts GITHUB_TOKEN_PORTFOLIO or GITHUB_TOKEN, queries GitHub REST for aatif101 public profile, repos, events, and aggregate signals, and writes sanitized JSON to src/data/githubActivity.json. Include fallback behavior when token is missing or the API fails. Never log Authorization headers or token substrings.

## Inputs

- `package.json`

## Expected Output

- `scripts/fetch-github-activity.js`
- `src/data/githubActivity.json`
- `package.json`

## Verification

npm run fetch-github-activity

## Observability Impact

Script logs non-secret phases, endpoint classes, fallback state, and output path for debugging.
