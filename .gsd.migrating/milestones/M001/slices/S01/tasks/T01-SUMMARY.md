---
id: T01
parent: S01
milestone: M001
key_files:
  - public/index.html
  - src/index.css
  - tailwind.config.js
key_decisions:
  - Used CSS custom properties as the canonical token layer, with Tailwind referencing them via var() — allows runtime theming and avoids Tailwind JIT purging token values
  - Loaded Spectral weights 300/400/500/600 in both normal and italic to support editorial use of italic for emphasis without FOIT
  - Set --color-paper to #f5f1eb (warm cream) rather than pure white or #fafaf8 to match the Plantin/novel warmth from MEM001
  - focus-visible uses oxblood (#7a1d1d) outline to keep accessibility markers on-brand without jarring blue
duration: 
verification_result: passed
completed_at: 2026-05-22T18:28:01.362Z
blocker_discovered: false
---

# T01: Replaced Inter-only CSS with Spectral + Inter editorial token system: CSS custom properties for paper/ink/oxblood palette, focus-visible, skip-link, reduced-motion, and Tailwind wired to variables.

**Replaced Inter-only CSS with Spectral + Inter editorial token system: CSS custom properties for paper/ink/oxblood palette, focus-visible, skip-link, reduced-motion, and Tailwind wired to variables.**

## What Happened

Read all three input files first. `tailwind.config.js` had a minimal Inter-only setup; `src/index.css` had a bare 20-line reset; `public/index.html` loaded only Inter. No cosmic or terminal residue was present in these files (that lives in component files addressed by later tasks).

**public/index.html**: Updated Google Fonts link to load Spectral (weights 300/400/500/600, both normal and italic) alongside Inter (400/500/600), with `display=swap`. Added a `.skip-link` anchor targeting `#main-content`.

**src/index.css**: Full rewrite. Defined 30+ CSS custom properties under `:root` covering the complete editorial palette (--color-paper #f5f1eb, --color-ink #1a1714, --color-oxblood #7a1d1d, --color-accent, --color-hairline, --color-muted, --color-surface, --color-faint), font stack variables, type scale (xs→5xl), leading, tracking, spacing rhythm, column widths, and easing/duration tokens. Base layer sets box-sizing, scroll-behavior, -webkit-font-smoothing, font-feature-settings (kern/liga/onum), text-wrap: pretty on body and text-wrap: balance on headings, focus-visible with oxblood outline, skip-link component class, and a `prefers-reduced-motion` block that disables all animations/transitions. Utility layer adds semantic classes for palette colors, font families, spacing, and layout.

**tailwind.config.js**: Extended theme to reference CSS variables for fontFamily (serif/sans), colors (paper/ink/muted/faint/oxblood/accent/hairline/surface), maxWidth (prose/wide), lineHeight (tight/snug/prose), letterSpacing (tight/wide/caps), and transitionTimingFunction.

## Verification

Ran `npm run build`. Build completed with exit code 0. CSS bundle grew from ~3.87 kB to ~4.69 kB gzipped (expected for added token system). No CSS errors. Two pre-existing ESLint warnings in ProjectsSection.js (unrelated to this task) were the only warnings.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `npm run build` | 0 | pass | 25000ms |

## Deviations

none

## Known Issues

none

## Files Created/Modified

- `public/index.html`
- `src/index.css`
- `tailwind.config.js`
