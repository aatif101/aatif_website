# Project State: aatif_website Portfolio Redesign

**Last updated:** 2026-04-24
**Session:** Initialization

---

## Project Reference

**Core value:** A visitor lands and within 10 seconds understands exactly who Aatif is and what he builds — because the design gets out of the way.

**Current focus:** Phase 1 — Design System + Page Skeleton

**Milestone:** Portfolio redesign v1 (brownfield visual overhaul)

---

## Current Position

**Phase:** 1 of 3
**Plan:** None started
**Status:** Not started

**Progress:**
```
Phase 1 [          ] 0%
Phase 2 [          ] 0%
Phase 3 [          ] 0%
Overall [          ] 0%
```

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Phases defined | 3 |
| Requirements total | 35 |
| Requirements mapped | 35 |
| Plans written | 0 |
| Plans complete | 0 |
| Phases complete | 0 |

---

## Accumulated Context

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| 3 phases (coarse) | Natural split: foundation → content → verification; coarse granularity config |
| Phase 1 includes Nav | Single-scroll shell and nav must exist before content sections can be placed |
| Phase 3 is a verification phase | Links and deploy can only be audited after content is built; keeps Phase 2 focused |
| NAV-04 (responsive) owned by Phase 1, verified in Phase 3 | Establish responsiveness in the shell; confirm it survives full content load |
| Keep framer-motion in package.json for now | FloatingSocialButtons removal in Phase 1 will eliminate framer-motion usage; can prune dependency in Phase 3 |
| Keep Tailwind in toolchain | Utility classes used in rebuilt components; remove cosmic/terminal custom theme overrides but keep base Tailwind |

### Architecture Notes

- Components to delete in Phase 1: `MatrixRain.js`, `FloatingSocialButtons/` (entire directory), `HeroSection.js` (replace with new Header), `AboutSection.js` (replace with SUMM section)
- Components to rebuild in Phase 1: `Header.js` (identity + contacts), `App.js` (new shell composition)
- Components to build in Phase 2: `SkillsSection.js`, update `ProjectsSection.js` (new list style + whitelist), update `EducationExperienceSection.js` (split into dedicated components or rewrite), `LeadershipSection.js`
- Config change in Phase 2: `portfolioConfig.js` whitelist updated to match cv.md projects (nazscan, etc.)
- Tailwind config: remove `cosmic.*` and `terminal.*` custom colors; add `#fafaf8` and `#111` tokens; swap font from JetBrains Mono to Inter/Space Grotesk
- Google Fonts: update `public/index.html` font link from JetBrains Mono to Inter or Space Grotesk

### Content Source of Truth

All text, dates, titles, and bullet points must come from:
`C:\Users\smati\VS Code Projects\career-ops\cv.md`

Do not invent or paraphrase. Copy exactly.

### Todos

- [ ] Read cv.md before writing any content in Phase 2
- [ ] Decide Inter vs Space Grotesk before Phase 1 implementation (user preference or coin-flip to Inter)
- [ ] Confirm nazscan and other CV project repo names against GitHub API during Phase 2

### Blockers

None at start.

---

## Session Continuity

**To resume:** Read `.planning/STATE.md` and `.planning/ROADMAP.md`. Check which phase and plan are active. Proceed from current position.

**CV location:** `C:\Users\smati\VS Code Projects\career-ops\cv.md`

**Deploy command:** `npm run deploy` (gh-pages to `https://aatif101.github.io/aatif_website`)

**GitHub username for API:** `aatif101`

---

*State initialized: 2026-04-24*
