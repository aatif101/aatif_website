---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T03: Verify reduced motion fallback

Add reduced-motion guards and tests. The hook must not create Lenis or ScrollTrigger timelines when matchMedia('(prefers-reduced-motion: reduce)') matches. CSS must avoid hiding content in reduced motion. Add a focused test for hook guard behavior or a lightweight DOM smoke test for reduced-motion readable markup.

## Inputs

- `src/hooks/useEditorialMotion.js`

## Expected Output

- `src/hooks/useEditorialMotion.js`
- `src/__tests__/editorial-motion.test.js`
- `src/index.css`

## Verification

npm test -- --watchAll=false --testPathPattern=editorial-motion

## Observability Impact

Test failure identifies motion accessibility regressions before browser review.
