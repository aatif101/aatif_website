---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T01: Add contained Lenis and GSAP motion hook

Install Lenis plus gsap. Create a contained useEditorialMotion hook that registers ScrollTrigger, initializes Lenis only when reduced motion is not requested, cleans up on unmount, and exposes a data attribute or class for reduced-motion state. Do not scatter GSAP calls across every component.

## Inputs

- `package.json`

## Expected Output

- `package.json`
- `package-lock.json`
- `src/hooks/useEditorialMotion.js`

## Verification

npm run build

## Observability Impact

The hook should catch initialization failures and console.error a concise non-secret message in development.
