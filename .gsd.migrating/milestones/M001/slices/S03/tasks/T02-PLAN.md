---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T02: Render selected work and timeline from content

Render the content module through the editorial sections. Selected work should be two pinned spreads only. Experience should be a dense editorial timeline with marginal dates, education and leadership folded into the timeline or closing timeline rows, and no separate Skills section or skill tags. Preserve the user's ability to change the lede later by keeping it in the content module.

## Inputs

- `src/content/portfolioContent.js`

## Expected Output

- `src/components/EditorialPortfolio.jsx`
- `src/components/editorial/SelectedWork.jsx`
- `src/components/editorial/ExperienceTimeline.jsx`

## Verification

npm run build

## Observability Impact

Rendered content can be inspected in the browser and via tests without tracing scattered literals.
