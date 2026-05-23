---
id: T02
parent: S02
milestone: M001
key_files:
  - src/hooks/useEditorialMotion.js
  - src/components/EditorialPortfolio.jsx
  - src/components/editorial/SectionShell.jsx
  - src/components/editorial/OpeningSpread.jsx
  - src/index.css
key_decisions:
  - data-motion-hero used for page-load entrance (header + lede div) rather than scroll-trigger, since these elements are above the fold and need to arrive immediately
  - data-motion-reveal applied at section level (not inner div) so the entire section block animates as one unit — avoids partial-reveal jank on tall sections
  - motionReveal boolean prop on SectionShell keeps the data attribute opt-in per section rather than always-on, preserving future flexibility to skip animation on specific sections
  - clearProps: 'transform' on all GSAP animations prevents residual inline transform interfering with downstream layout or sticky positioning
  - will-change scoped to html[data-motion-ready] so the browser hint is only active during animation, not on initial paint or in reduced-motion mode
duration: 
verification_result: passed
completed_at: 2026-05-22T18:40:05.577Z
blocker_discovered: false
---

# T02: Wired useEditorialMotion hook to EditorialPortfolio: hero entrance + scroll-reveal choreography on real sections via data-motion-* attributes

**Wired useEditorialMotion hook to EditorialPortfolio: hero entrance + scroll-reveal choreography on real sections via data-motion-* attributes**

## What Happened


Applied the motion hook to the editorial page and defined a data-attribute contract for choreography targets:

- `data-motion-hero`: stamped on the site header and the OpeningSpread inner container. These elements get a page-load `fromTo(opacity:0→1, y:28→0)` entrance with 0.12s stagger, so the name/lede arrives before the user scrolls.
- `data-motion-reveal`: stamped on each SectionShell (Experience, Work, Projects, Formation, Skills) and the footer via a new `motionReveal` boolean prop. Each receives a ScrollTrigger-bound `fromTo(opacity:0→1, y:40→0)` that fires once as the element enters 82% from the top.
- `data-motion-ready`: stamped on `<html>` once Lenis + GSAP are initialised; CSS uses this to apply `will-change` only after motion is live — no flash-of-hidden-content before JS runs.

Hook improvements:
- Fixed the `gsap.ticker.remove()` call to pass the named `tickerFn` reference (previously called with no args which would remove all ticker functions).
- Added `.catch()` on the dynamic Lenis import promise (previously only wrapped in try/catch which doesn't catch async rejection).
- Added `process.env.NODE_ENV !== 'production'` debug log on successful init showing element counts.
- `clearProps: 'transform'` on both animations prevents GSAP inline transform from interfering with sticky/position layout after animation completes.

SectionShell updated to accept `motionReveal` boolean prop and forward it as `data-motion-reveal` attribute. OpeningSpread inner `div` gets `data-motion-hero` for the staggered hero entrance.

CSS: added progressive-enhancement block scoped to `html[data-motion-ready='true']` that sets `will-change: opacity, transform` only when JS motion is live. Reduced-motion override resets it to `auto`. Fixed a stale `--transition-base` token reference in nav links to use the actual tokens `--duration-base` + `--ease-out`.


## Verification

npm run build — compiled successfully with no errors or warnings. Bundle grew by expected ~45 kB (lenis + gsap already in tree). CSS output confirmed at 4.79 kB.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npm run build` | 0 | pass | 18000ms |

## Deviations

OpeningSpread did not get data-motion-hero on the outer section element (which would conflict with section padding layout) — instead the inner content div received it, and the header element in EditorialPortfolio already receives data-motion-hero as a sibling hero target. This gives two staggered heroes: header arrives first, lede content follows 0.12s later.

## Known Issues

none

## Files Created/Modified

- `src/hooks/useEditorialMotion.js`
- `src/components/EditorialPortfolio.jsx`
- `src/components/editorial/SectionShell.jsx`
- `src/components/editorial/OpeningSpread.jsx`
- `src/index.css`
