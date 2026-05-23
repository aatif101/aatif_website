---
id: T01
parent: S02
milestone: M001
key_files:
  - src/hooks/useEditorialMotion.js
key_decisions:
  - Dynamic import of Lenis inside useEffect rather than static import — keeps bundle split-friendly and isolates init failures to a catchable async boundary
  - ScrollTrigger.scrollerProxy used to route Lenis scroll position into GSAP — required for scroll-triggered animations to respect smooth scroll position
  - data-reduced-motion attribute always set on <html> regardless of motion state — gives CSS a reliable hook without re-querying the media feature
  - console.error guarded by NODE_ENV !== production — keeps dev DX observable without leaking to production console
duration: 
verification_result: passed
completed_at: 2026-05-22T18:36:59.525Z
blocker_discovered: false
---

# T01: Added useEditorialMotion hook: Lenis + GSAP ScrollTrigger init with full reduced-motion guard and cleanup

**Added useEditorialMotion hook: Lenis + GSAP ScrollTrigger init with full reduced-motion guard and cleanup**

## What Happened

Both `lenis` (^1.3.23) and `gsap` (^3.15.0) were already present in package.json — no install step needed. Created `src/hooks/useEditorialMotion.js` as the single entry point for all scroll choreography. The hook: (1) reads `prefers-reduced-motion` at call time, (2) always stamps `data-reduced-motion="true|false"` on `<html>` so CSS and downstream components can branch without re-running the media query, (3) dynamically imports Lenis inside the effect (keeps the bundle split-friendly and lets init failures be caught), (4) wires Lenis into the GSAP ticker via `gsap.ticker.add` with `lagSmoothing(0)` so ScrollTrigger stays frame-accurate, (5) proxies scroll events from Lenis through `ScrollTrigger.scrollerProxy` so all future GSAP scroll animations work correctly, (6) cleans up on unmount by calling `lenis.destroy()`, removing the ticker function, and calling `ScrollTrigger.killAll()` + `clearScrollMemory()`, (7) catches any init failure and logs a concise non-secret `console.error` in non-production environments only. When reduced-motion is active the effect returns immediately after setting the data attribute — no Lenis or GSAP calls are made.

## Verification

Ran `npm run build` — build compiled successfully with no errors or warnings. The hook is exported as a named export `useEditorialMotion` from `src/hooks/useEditorialMotion.js` and is ready to be called at root level (e.g. in EditorialPortfolio.jsx) once content sections are added in later slices.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npm run build` | 0 | pass | 15000ms |

## Deviations

none

## Known Issues

none

## Files Created/Modified

- `src/hooks/useEditorialMotion.js`
