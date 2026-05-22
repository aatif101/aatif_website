# S06: Polish Verification and Old System Removal

**Goal:** Tune the full redesign for taste, accessibility, performance, and maintainability, then remove dead legacy paths from the active app.
**Demo:** After this: the fully assembled site builds, runs locally, scrolls smoothly, passes browser checks, and is ready for user taste review before deployment.

## Must-Haves

- Dead active imports and unused legacy visual components are removed or quarantined without breaking tests.
- package.json dependencies reflect the new motion stack and remove unused old motion libraries if safe.
- Browser verification checks section text, no console errors, no failed network requests, and usable keyboard focus.
- Reduced-motion mode is explicitly verified.
- Build output and source are checked for absence of secret token values.
- npm run build passes.

## Proof Level

- This slice proves: final-assembly

## Integration Closure

Exercises the real entrypoint and verifies all prior slices as one assembled portfolio.

## Verification

- Final verification evidence records build output, browser console/network status, reduced-motion behavior, and secret-scan result.

## Tasks

- [ ] **T01: Remove inactive legacy visual system from active path** `est:1h`
  Remove or quarantine old active visual-system components and dependencies that are no longer used by App.js, including MatrixRain, cosmic Header/Hero/About/Projects/Footer imports, FloatingSocialButtons active path, and framer-motion if no remaining code imports it. Use search to confirm no active imports before deleting or leaving legacy files inert.
  - Files: `src/App.js`, `package.json`, `package-lock.json`, `src/components`
  - Verify: npm run build

- [ ] **T02: Polish typography motion and accessibility details** `est:1h 30m`
  Run a focused taste and accessibility polish pass: tune type scale, section heights, line lengths, hairlines, focus states, keyboard hit areas, reduced-motion CSS, and scroll pacing. Apply make-interfaces-feel-better principles: no transition all, tabular numbers for dashboard stats, text-wrap balance or pretty, and sparing will-change only on transform or opacity.
  - Files: `src/index.css`, `src/components/EditorialPortfolio.jsx`, `src/components/editorial`
  - Verify: npm run build

- [ ] **T03: Perform live browser verification** `est:1h`
  Start the local dev server with bg_shell, verify the page in browser tools, and record explicit browser assertions: key section text visible, no console errors, no failed network requests, contact links present, and keyboard focus visible. Use browser_assert and logs rather than prose-only inspection.
  - Files: `.gsd/runtime`
  - Verify: npm run build

- [ ] **T04: Run final integrated verification** `est:1h`
  Run final command verification: GitHub fetch, test suite, no-secret scan, and production build. If fetch cannot use the local token due to environment naming, adjust the script to support the detected key name without reading or printing token values. Summarize remaining user taste decisions such as real Plantin license swap and real Things I Find Cool entries.
  - Files: `build`, `src/data/githubActivity.json`, `package.json`
  - Verify: npm run build

## Files Likely Touched

- src/App.js
- package.json
- package-lock.json
- src/components
- src/index.css
- src/components/EditorialPortfolio.jsx
- src/components/editorial
- .gsd/runtime
- build
- src/data/githubActivity.json
