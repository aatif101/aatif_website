# S01: Editorial Shell and Visual Language

**Goal:** Replace the active cosmic terminal app path with a live editorial shell that establishes Spectral typography, warm paper color, opening spread, lede, and named section anchors.
**Demo:** After this: npm start shows a cream editorial homepage with Aatif as the opening identity, no matrix rain or terminal visuals, and empty but correctly paced sections for the full one-page scroll.

## Must-Haves

- App.js no longer imports MatrixRain, cosmic header, old hero, old about, old projects, or old footer.
- Spectral loads as the primary serif and the root page uses warm paper, ink, muted gray, and oxblood tokens.
- Sections exist in the final order: opening, lede, work, experience, github, cool, colophon.
- Page has semantic landmarks, skip link, focus styles, and no generic card-grid shell.
- npm run build passes.

## Proof Level

- This slice proves: integration

## Integration Closure

Rewires the actual React entrypoint and establishes the design surface consumed by every later slice.

## Verification

- Build output and browser console are the diagnostic surfaces; no async runtime state yet.

## Tasks

- [x] **T01: Install editorial design tokens and font loading** `est:45m`
  Replace the old Tailwind theme and global CSS with editorial tokens. Load Spectral and a minimal sans in public/index.html or CSS, define CSS variables for paper, ink, muted, oxblood, hairline, add font smoothing, text-wrap, focus-visible, skip-link, and reduced-motion defaults. Remove cosmic and terminal utility classes from the active stylesheet rather than preserving the old visual language.
  - Files: `tailwind.config.js`, `src/index.css`, `public/index.html`
  - Verify: npm run build

- [x] **T02: Wire editorial one page shell into App** `est:1h`
  Create a new content-light editorial app shell that renders semantic sections in the agreed order with placeholder content only where later slices will fill data. App.js should import the new page shell and stop importing MatrixRain, Header, HeroSection, AboutSection, EducationExperienceSection, ProjectsSection, and Footer from the old system. Include accessible skip link, main landmark, stable section ids, and an initial header/name corner element prepared for motion.
  - Files: `src/App.js`, `src/components/EditorialPortfolio.jsx`
  - Verify: npm run build

- [x] **T03: Build visible editorial spreads and shell test** `est:1h`
  Implement the opening spread, lede spread, placeholder selected work spread, placeholder experience spread, placeholder GitHub spread, placeholder cool spread, and colophon shell using the new tokens. Keep the look book-like and spacious: no cards, no icons, no gradients, no shadows, no terminal copy. Verify the DOM has all expected sections and old visual imports are gone with a small node:test content test.
  - Files: `src/components/EditorialPortfolio.jsx`, `src/components/editorial/OpeningSpread.jsx`, `src/components/editorial/SectionShell.jsx`, `src/__tests__/editorial-shell.test.js`
  - Verify: npm test -- --watchAll=false --testPathPattern=editorial-shell

## Files Likely Touched

- tailwind.config.js
- src/index.css
- public/index.html
- src/App.js
- src/components/EditorialPortfolio.jsx
- src/components/editorial/OpeningSpread.jsx
- src/components/editorial/SectionShell.jsx
- src/__tests__/editorial-shell.test.js
