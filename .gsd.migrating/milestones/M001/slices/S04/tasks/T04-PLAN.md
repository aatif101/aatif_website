---
estimated_steps: 1
estimated_files: 2
skills_used: []
---

# T04: Add no secret leakage verification

Add a secret-scan verification script or test that checks source and build output for common GitHub token prefixes and ensures .env remains ignored. Run it after build as part of slice verification. Do not read or print .env values.

## Inputs

- `package.json`

## Expected Output

- `scripts/verify-no-secrets.js`
- `package.json`

## Verification

npm run verify:no-secrets

## Observability Impact

Secret scan gives a repeatable failure signal before deploy or commit.
