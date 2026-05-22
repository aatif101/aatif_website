---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T04: Run final integrated verification

Run final command verification: GitHub fetch, test suite, no-secret scan, and production build. If fetch cannot use the local token due to environment naming, adjust the script to support the detected key name without reading or printing token values. Summarize remaining user taste decisions such as real Plantin license swap and real Things I Find Cool entries.

## Inputs

- `package.json`

## Expected Output

- `build`
- `src/data/githubActivity.json`

## Verification

npm run build

## Observability Impact

Final output includes build, test, fetch, and secret-scan evidence for next agent or user review.
