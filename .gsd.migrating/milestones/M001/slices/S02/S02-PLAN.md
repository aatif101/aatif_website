# S02: Scroll Choreography and Reduced Motion

**Goal:** Add Lenis and GSAP ScrollTrigger choreography for novel-like scroll pacing while preserving a complete reduced-motion experience.
**Demo:** After this: opening identity, lede, selected-work placeholders, and timeline placeholders move with smooth scroll in normal mode and become static readable sections in reduced-motion mode.

## Must-Haves

- Lenis and GSAP are installed and wired in a contained motion module or hook.
- Name-to-corner transition, section reveals, and pinned spread behavior are implemented on real section containers.
- prefers-reduced-motion disables Lenis smoothing and GSAP transforms/pinning without hiding content.
- Browser verification shows no console errors during scroll.
- npm run build passes.

## Proof Level

- This slice proves: integration

## Integration Closure

Connects motion to the actual page shell so later content inherits the choreography instead of reimplementing it.

## Verification

- Motion init errors should be guarded and logged as non-secret console errors during development; reduced-motion state is inspectable via DOM classes or CSS behavior.

## Tasks

- [ ] **T01: Add contained Lenis and GSAP motion hook** `est:1h`
  Install Lenis plus gsap. Create a contained useEditorialMotion hook that registers ScrollTrigger, initializes Lenis only when reduced motion is not requested, cleans up on unmount, and exposes a data attribute or class for reduced-motion state. Do not scatter GSAP calls across every component.
  - Files: `package.json`, `package-lock.json`, `src/hooks/useEditorialMotion.js`
  - Verify: npm run build

- [ ] **T02: Wire scroll choreography to real sections** `est:1h 30m`
  Apply the motion hook to the editorial page and define data attributes or refs for the opening name, corner identity, section reveal groups, pinned selected-work spreads, and timeline year elements. Implement the name-to-corner transition and reveal choreography in a way that leaves content visible before JS runs and after JS cleanup.
  - Files: `src/components/EditorialPortfolio.jsx`, `src/hooks/useEditorialMotion.js`, `src/index.css`
  - Verify: npm run build

- [ ] **T03: Verify reduced motion fallback** `est:1h`
  Add reduced-motion guards and tests. The hook must not create Lenis or ScrollTrigger timelines when matchMedia('(prefers-reduced-motion: reduce)') matches. CSS must avoid hiding content in reduced motion. Add a focused test for hook guard behavior or a lightweight DOM smoke test for reduced-motion readable markup.
  - Files: `src/hooks/useEditorialMotion.js`, `src/__tests__/editorial-motion.test.js`, `src/index.css`
  - Verify: npm test -- --watchAll=false --testPathPattern=editorial-motion

## Files Likely Touched

- package.json
- package-lock.json
- src/hooks/useEditorialMotion.js
- src/components/EditorialPortfolio.jsx
- src/index.css
- src/__tests__/editorial-motion.test.js
