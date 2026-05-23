# S01: Editorial Shell and Visual Language — UAT

**Milestone:** M001
**Written:** 2026-05-22T18:34:58.167Z

# S01 UAT: Editorial Shell and Visual Language

**UAT Type:** Integration — verifies the live editorial shell renders correctly in a browser and the build pipeline is clean.

## Preconditions

- Node.js and npm are installed.
- Working directory is `C:/Users/smati/VS Code Projects/aatif_website`.
- Dependencies are installed (`npm install` has been run).

## Steps and Expected Outcomes

1. **Run the build**
   ```
   npm run build
   ```
   **Expected:** Terminal prints "Compiled successfully." with no errors. JS bundle is ~46–47 kB gzip; CSS bundle is ~4–5 kB gzip.

2. **Run the test suite**
   ```
   npx react-scripts test --watchAll=false --testPathPattern=editorial-shell --forceExit
   ```
   **Expected:** "Tests: 10 passed, 10 total" with exit code 0. The only console output besides PASS lines is a React 18 act() deprecation warning (known, non-blocking).

3. **Start the dev server**
   ```
   npm start
   ```
   **Expected:** Browser opens at localhost:3000. Page background is warm cream (not black/dark). No matrix rain, no terminal colors, no cosmic gradient, no typewriter animation.

4. **Inspect typography**
   Open DevTools → Elements. Verify `body` or `:root` uses `--font-serif: 'Spectral', serif` and the page headings render in Spectral (not JetBrains Mono or system sans-serif).

5. **Inspect color tokens**
   In DevTools → Computed styles on `<html>` or `:root`, verify CSS custom properties: `--color-paper`, `--color-ink`, `--color-oxblood`, `--color-muted`, `--color-hairline` are defined with warm values (paper ≈ #f5f1eb, oxblood ≈ #7a1d1d).

6. **Verify section order in DOM**
   In DevTools → Elements, confirm the following section IDs exist in order: `#about`, `#experience`, `#projects`, `#education`, `#skills`. A colophon footer element is also present.

7. **Verify skip link**
   Tab once from the top of the page. A "Skip to content" link should become visible (focus-visible style) and target `#main`.

8. **Verify no legacy components**
   In DevTools → Sources, confirm `MatrixRain`, `Header`, `HeroSection`, `AboutSection`, `EducationExperienceSection`, `ProjectsSection`, and `Footer` are not loaded in the JS bundle.

9. **Verify focus styles**
   Tab through interactive elements. Each focused element shows an oxblood (#7a1d1d) outline, not the browser default blue ring.

10. **Check browser console**
    DevTools → Console should show zero errors. No "Cannot find module", no React render errors, no network 404s for fonts.

## Edge Cases

- **Reduced motion:** With `prefers-reduced-motion: reduce` set in OS/browser, page should still render correctly (no invisible or missing content — motion suppression is a CSS-only default at this stage, active animation is S02 scope).
- **Narrow viewport (375px):** Page text should wrap gracefully with no horizontal scroll; sections stack vertically.

## Not Proven By This UAT

- Smooth scroll / GSAP choreography (S02 scope).
- Real CV content in sections (S03 scope).
- GitHub activity dashboard (S04 scope).
- Things I Find Cool and Colophon final content (S05 scope).
- Full accessibility audit including screen reader landmark traversal (S06 scope).
