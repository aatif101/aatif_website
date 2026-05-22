---
estimated_steps: 1
estimated_files: 2
skills_used: []
---

# T02: Wire editorial one page shell into App

Create a new content-light editorial app shell that renders semantic sections in the agreed order with placeholder content only where later slices will fill data. App.js should import the new page shell and stop importing MatrixRain, Header, HeroSection, AboutSection, EducationExperienceSection, ProjectsSection, and Footer from the old system. Include accessible skip link, main landmark, stable section ids, and an initial header/name corner element prepared for motion.

## Inputs

- `src/App.js`

## Expected Output

- `src/App.js`
- `src/components/EditorialPortfolio.jsx`

## Verification

npm run build

## Observability Impact

Browser console and React render failures reveal shell integration issues.
