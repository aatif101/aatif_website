---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T02: Verify GitHub data artifact safety

Add tests for the GitHub activity artifact shape and secret redaction constraints. Tests should verify required top-level fields, recent activity array shape, active repos shape, generated timestamp, and absence of token-looking values in the JSON artifact.

## Inputs

- `src/data/githubActivity.json`

## Expected Output

- `src/__tests__/github-activity-data.test.js`

## Verification

npm test -- --watchAll=false --testPathPattern=github-activity-data

## Observability Impact

Test output isolates data-shape and secret-leak regressions.
