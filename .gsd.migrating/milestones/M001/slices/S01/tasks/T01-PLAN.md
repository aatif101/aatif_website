---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T01: Install editorial design tokens and font loading

Replace the old Tailwind theme and global CSS with editorial tokens. Load Spectral and a minimal sans in public/index.html or CSS, define CSS variables for paper, ink, muted, oxblood, hairline, add font smoothing, text-wrap, focus-visible, skip-link, and reduced-motion defaults. Remove cosmic and terminal utility classes from the active stylesheet rather than preserving the old visual language.

## Inputs

- `tailwind.config.js`
- `src/index.css`
- `public/index.html`

## Expected Output

- `tailwind.config.js`
- `src/index.css`
- `public/index.html`

## Verification

npm run build

## Observability Impact

Build and browser console expose CSS or font-loading failures; no secret or external data involved.
