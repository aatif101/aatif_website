---
estimated_steps: 1
estimated_files: 2
skills_used: []
---

# T03: Render editorial GitHub activity spread

Render a designed GitHub activity spread from the static artifact. Include one large headline metric, contribution-style data print in cream and oxblood, recent activity lines, active repos, and a small tally line. It should look like an editorial annual-report spread, not GitHub's default green chart and not a dashboard card grid.

## Inputs

- `src/data/githubActivity.json`

## Expected Output

- `src/components/editorial/GitHubActivity.jsx`
- `src/components/EditorialPortfolio.jsx`

## Verification

npm run build

## Observability Impact

Dashboard should render fallback labels when the artifact marks fallback mode, making stale or missing data visible without crashing.
