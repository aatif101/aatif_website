---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T04: Verify editorial links and landmarks

Add an accessibility-focused test for link attributes and section landmarks across CoolThings and Colophon. Verify external links are safe, email link is mailto, and section labels remain accessible.

## Inputs

- `src/components/editorial/CoolThings.jsx`
- `src/components/editorial/Colophon.jsx`

## Expected Output

- `src/__tests__/editorial-links.test.js`

## Verification

npm test -- --watchAll=false --testPathPattern=editorial-links

## Observability Impact

Test output catches broken contact and external-link safety regressions.
