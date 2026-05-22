---
estimated_steps: 1
estimated_files: 2
skills_used: []
---

# T02: Render Things I Find Cool editorial list

Render Things I Find Cool as an editorial link list with hairline dividers, Plantin titles, muted captions, generous spacing, and no cards. Provide a quiet empty state if the list is empty. Ensure external links use target blank plus rel noopener noreferrer and have visible focus states.

## Inputs

- `src/content/coolThings.js`

## Expected Output

- `src/components/editorial/CoolThings.jsx`
- `src/components/EditorialPortfolio.jsx`

## Verification

npm run build

## Observability Impact

Empty-state rendering prevents bad data from crashing the page.
