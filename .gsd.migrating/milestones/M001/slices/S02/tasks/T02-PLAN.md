---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T02: Wire scroll choreography to real sections

Apply the motion hook to the editorial page and define data attributes or refs for the opening name, corner identity, section reveal groups, pinned selected-work spreads, and timeline year elements. Implement the name-to-corner transition and reveal choreography in a way that leaves content visible before JS runs and after JS cleanup.

## Inputs

- `src/hooks/useEditorialMotion.js`

## Expected Output

- `src/components/EditorialPortfolio.jsx`
- `src/hooks/useEditorialMotion.js`
- `src/index.css`

## Verification

npm run build

## Observability Impact

Browser console and visible data-motion-ready state reveal whether choreography initialized.
