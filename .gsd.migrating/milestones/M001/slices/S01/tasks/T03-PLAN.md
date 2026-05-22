---
estimated_steps: 1
estimated_files: 4
skills_used: []
---

# T03: Build visible editorial spreads and shell test

Implement the opening spread, lede spread, placeholder selected work spread, placeholder experience spread, placeholder GitHub spread, placeholder cool spread, and colophon shell using the new tokens. Keep the look book-like and spacious: no cards, no icons, no gradients, no shadows, no terminal copy. Verify the DOM has all expected sections and old visual imports are gone with a small node:test content test.

## Inputs

- `src/components/EditorialPortfolio.jsx`
- `src/index.css`

## Expected Output

- `src/components/EditorialPortfolio.jsx`
- `src/components/editorial/OpeningSpread.jsx`
- `src/components/editorial/SectionShell.jsx`
- `src/__tests__/editorial-shell.test.js`

## Verification

npm test -- --watchAll=false --testPathPattern=editorial-shell

## Observability Impact

The shell test gives future agents an immediate failure when legacy imports or missing sections return.
