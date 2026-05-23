# S02: Scroll Choreography and Reduced Motion — UAT

**Milestone:** M001
**Written:** 2026-05-23T03:53:06.563Z

# S02 UAT: Scroll Choreography and Reduced Motion

## UAT Type
Manual browser acceptance with automated build/test evidence.

## Preconditions
- Dependencies are installed with `npm install`.
- The app can run locally with `npm start`.
- Use a modern browser such as Edge or Chrome.

## Steps
1. Start the site with `npm start` and open `http://localhost:3000`.
2. Confirm the page opens on the warm cream editorial homepage and the opening identity is visible without waiting for user interaction.
3. Scroll down through the opening, lede, selected-work placeholder, experience/timeline placeholder, and later editorial sections.
4. Confirm sections remain readable while moving with smooth scroll pacing and reveal choreography; content should not flicker, disappear permanently, or require a refresh to appear.
5. Open browser developer tools and confirm no console errors appear during initial load or while scrolling.
6. Enable OS/browser reduced-motion preference (`prefers-reduced-motion: reduce`) and reload the page.
7. Confirm scrolling becomes static/native, pinned or transformed choreography is disabled, and the same content remains readable in normal document flow.
8. Inspect the `<html>` element and confirm the reduced-motion state is reflected through the motion state attribute when reduced motion is active.

## Expected Outcomes
- Normal mode uses Lenis/GSAP choreography on the actual editorial shell sections.
- Reduced-motion mode does not initialize smooth-scroll or scroll-trigger animation behavior.
- All major sections remain visible before JS animation runs and after cleanup/reload.
- The browser console has no app errors during scroll.
- `npm run build` passes.
- The focused editorial motion test suite passes.

## Edge Cases
- If JavaScript loads slowly, content should still be visible rather than hidden by initial animation CSS.
- If reduced-motion preference is toggled before load, the hook should skip Lenis and ScrollTrigger timelines.
- If motion initialization fails in development, the failure should surface as a non-secret console error rather than silently breaking the page.

## Not Proven By This UAT
- Final production copy and CV traceability; those are covered by S03.
- Build-time GitHub activity fetching and dashboard rendering; those are covered by S04.
- Full-site final polish and deployment readiness; those are covered by S06.
