---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T02: Polish typography motion and accessibility details

Run a focused taste and accessibility polish pass: tune type scale, section heights, line lengths, hairlines, focus states, keyboard hit areas, reduced-motion CSS, and scroll pacing. Apply make-interfaces-feel-better principles: no transition all, tabular numbers for dashboard stats, text-wrap balance or pretty, and sparing will-change only on transform or opacity.

## Inputs

- `src/index.css`

## Expected Output

- `src/index.css`
- `src/components/EditorialPortfolio.jsx`
- `src/components/editorial`

## Verification

npm run build

## Observability Impact

Browser checks and tests expose regressions in focus, motion, or section rendering.
