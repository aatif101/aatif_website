---
id: S01
parent: M001
milestone: M001
provides:
  - Editorial app shell (EditorialPortfolio.jsx) with semantic section order and stable anchor IDs
  - CSS custom property token system (paper/ink/oxblood/muted/hairline palette)
  - Spectral + Inter font loading with FOIT-safe weight preloading
  - OpeningSpread.jsx and SectionShell.jsx as composable editorial primitives
  - Focus-visible, skip-link, reduced-motion, and font-smoothing accessibility defaults
  - 10-test regression suite guarding legacy import re-introduction
requires:
  []
affects:
  - S02
  - S03
  - S04
  - S05
  - S06
key_files:
  - src/App.js
  - src/components/EditorialPortfolio.jsx
  - src/components/editorial/OpeningSpread.jsx
  - src/components/editorial/SectionShell.jsx
  - src/index.css
  - tailwind.config.js
  - public/index.html
  - src/__tests__/editorial-shell.test.js
key_decisions:
  - CSS custom properties are the canonical token layer; Tailwind references them via var() to avoid JIT purge issues and enable runtime theming
  - Components use inline styles bound to token variables rather than Tailwind utility classes
  - SectionShell surface prop ('paper'|'surface') drives background alternation without introducing new colors
  - OpeningSpread extracted as standalone component so future slices can import/test it independently
  - Shell test uses fs.readFileSync source assertion to deterministically detect legacy import re-introduction without a browser
patterns_established:
  - Token-first design: all color/font/spacing values flow from CSS custom properties in index.css
  - Composable editorial primitives: OpeningSpread + SectionShell as the base layer for content slices
  - Regression guard via source-file assertion in Jest (no browser needed for legacy-import detection)
observability_surfaces:
  - npm run build output — 'Compiled successfully.' is the health signal
  - editorial-shell.test.js (10 tests) — test pass/fail is the regression signal for shell integrity
drill_down_paths:
  - milestones/M001/slices/S01/tasks/T01-SUMMARY.md
  - milestones/M001/slices/S01/tasks/T02-SUMMARY.md
  - milestones/M001/slices/S01/tasks/T03-SUMMARY.md
duration: ""
verification_result: passed
completed_at: 2026-05-22T18:34:58.164Z
blocker_discovered: false
---

# S01: Editorial Shell and Visual Language

**Replaced the cosmic terminal app with a live cream editorial shell: Spectral serif, warm paper tokens, semantic section order, and a 10-test regression suite guarding against legacy re-introduction.**

## What Happened

S01 replaced the existing matrix/cosmic/terminal React app with a fully wired editorial shell across three tasks.

**T01 — Design tokens and font loading:** The Inter-only global CSS was replaced with a dual-font system (Spectral 300/400/500/600 regular + italic, Inter as supporting sans). CSS custom properties define the entire palette: --color-paper (#f5f1eb warm cream), --color-ink, --color-surface, --color-muted, --color-oxblood (#7a1d1d), --color-hairline. Tailwind was wired to reference these via var() rather than hardcoded values. Focus-visible uses oxblood outline for on-brand accessibility. Reduced-motion, skip-link, and font-smoothing defaults were all established. Build passed with no errors; CSS bundle grew from ~3.87 kB to ~4.69 kB gzip as expected.

**T02 — App shell rewire:** App.js was stripped of all old imports (MatrixRain, Header, HeroSection, AboutSection, EducationExperienceSection, ProjectsSection, Footer) and rewired to render EditorialPortfolio.jsx only. The new shell delivers semantic sections in the agreed order (opening/#about, lede, #projects/work, #experience, #education, #skills, github, cool, colophon) with alternating --color-paper / --color-surface backgrounds for visual rhythm. A skip-link targeting #main and a stable main landmark are present. JS bundle shrank by 8.69 kB gzip (46.47 kB from 55.16 kB), confirming full elimination of old components.

**T03 — Editorial spread components and shell test:** OpeningSpread.jsx and SectionShell.jsx were extracted as standalone components. SectionShell accepts a `surface` prop ('paper' | 'surface') for the alternating background pattern. EditorialPortfolio was refactored to compose from these. A 10-test Jest suite was added in src/__tests__/editorial-shell.test.js covering: identity heading ("Aatif"), all named section anchors (#about, #experience, #projects, #education, #skills, colophon footer, skip link targeting #main, lede headline), and a source-file read assertion that detects re-introduction of legacy terminal/matrix imports. All 10 tests pass.

## Verification

1. **npm run build** (node exec, exit 0): "Compiled successfully." JS bundle 46.51 kB gzip, CSS 4.73 kB. No errors, no type failures.
2. **npx react-scripts test --watchAll=false --testPathPattern=editorial-shell --forceExit** (exit 0): 10/10 tests pass in editorial-shell.test.js in 3.003 s. Only output besides PASS lines is a known CRA/React 18 ReactDOMTestUtils.act() deprecation warning — not a test failure.

## Requirements Advanced

- R001 — Cosmic/terminal visual system fully removed from the active app path; editorial token system, Spectral typography, and warm paper palette are now the live rendering surface consumed by all subsequent slices.

## Requirements Validated

None.

## New Requirements Surfaced

None.

## Requirements Invalidated or Re-scoped

None.

## Operational Readiness

None.

## Deviations

none

## Known Limitations

CRA's pinned @testing-library/react emits a ReactDOMTestUtils.act() deprecation warning on React 18. Not a test failure; requires upgrading @testing-library/react to 14+ which needs ejecting or overriding CRA dependency resolution. Safe to ignore through S06.

## Follow-ups

none

## Files Created/Modified

- `public/index.html` — Added Spectral (300/400/500/600 normal+italic) and Inter Google Fonts preconnect and link
- `src/index.css` — Replaced Inter-only CSS with full editorial token system: CSS custom properties for palette, typography, spacing, focus-visible, skip-link, reduced-motion
- `tailwind.config.js` — Wired Tailwind color/font keys to CSS custom properties via var()
- `src/App.js` — Removed all old component imports; renders only EditorialPortfolio
- `src/components/EditorialPortfolio.jsx` — One-page editorial shell with semantic sections in agreed order, composed from OpeningSpread and SectionShell
- `src/components/editorial/OpeningSpread.jsx` — Standalone opening identity spread component (Aatif name, role, location)
- `src/components/editorial/SectionShell.jsx` — Reusable section wrapper accepting id, label, heading, surface prop for background alternation
- `src/__tests__/editorial-shell.test.js` — 10-test Jest suite verifying section anchors, identity heading, skip link, and absence of legacy imports
