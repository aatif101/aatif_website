# aatif_website — Portfolio Redesign

## What This Is

A personal portfolio website for Mohammad Aatif Shaikh — an AI/ML engineer and CS senior at USF. The site presents his work, experience, and identity as an AI-native builder with security instincts. The current version is a React/Tailwind site with GitHub API integration; this project replaces the visual design entirely with a minimalist, Swiss/Bauhaus aesthetic — text-first, scholarly but modern, no visual gimmicks.

## Core Value

A visitor lands on the page and within 10 seconds understands exactly who Aatif is and what he builds — because the design gets out of the way and lets the content speak.

## Requirements

### Validated

- ✓ React-based SPA — existing
- ✓ GitHub API integration for live project data (stars, descriptions) — existing
- ✓ Deployed to GitHub Pages — existing
- ✓ Responsive layout — existing

### Active

- [ ] Complete visual redesign to minimalist Swiss/Bauhaus aesthetic
- [ ] Typography: Inter or Space Grotesk (modern sans-serif, Google Fonts)
- [ ] Color palette: off-white (#fafaf8) background, near-black (#111) text
- [ ] Single-scroll layout — no heavy nav, sections flow naturally
- [ ] Header: large name + one-liner tagline + clean contact link row (email, LinkedIn, GitHub, location)
- [ ] Summary section from CV ("AI-native builder with security instincts...")
- [ ] Skills section — grouped by category, text-only, no badges/icons
- [ ] Projects section — CV projects + GitHub API live data (stars, links)
- [ ] Experience section — Pfizer, CacheAi, USF IT, Mozilla, Infra Docs
- [ ] Education section — USF B.S. CS
- [ ] Leadership section — USF Student Government Senator
- [ ] All live links preserved (GitHub repos, LinkedIn, email)
- [ ] Remove Matrix rain animation and all decorative visual effects
- [ ] Remove floating social buttons (integrate contacts into header cleanly)

### Out of Scope

- Dark mode — not requested; off-white only for v1
- Multi-page routing — single scroll is the design intent
- Blog / writing section — no content exists for it
- Loading skeleton animations — either remove or make invisible-simple
- Resume PDF download button — not mentioned, defer to v2
- Contact form — just links, no form

## Context

**Current stack:** React 18, Tailwind CSS, GitHub Pages (gh-pages), GitHub REST API via Axios. Components: Header, HeroSection, AboutSection, ProjectsSection, EducationExperienceSection, FloatingSocialButtons, MatrixRain.

**Codebase already mapped** at `.planning/codebase/` — STACK.md, ARCHITECTURE.md, STRUCTURE.md, INTEGRATIONS.md available.

**CV source of truth:** `C:\Users\smati\VS Code Projects\career-ops\cv.md` — all content (sections, titles, dates, descriptions) must match this document exactly.

**GitHub username:** `aatif101` — API integration fetches from this account. The projects whitelist in `portfolioConfig.js` needs updating to match CV projects (nazscan, etc.).

**Design reference:** Think Gwern.net, academic homepages of top researchers, or the Dan Luu style — but with modern fonts and tighter spacing. Text is the UI.

## Constraints

- **Tech stack:** Keep React — not rebuilding from scratch
- **Deployment:** Must continue to work with GitHub Pages (`gh-pages` deploy)
- **Content fidelity:** All text, dates, and descriptions must come from cv.md — no invention
- **Performance:** No heavy animations; page should feel instant
- **Fonts:** Google Fonts only (free, no licensing issues)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep React, redesign components | Existing infrastructure (API, deploy pipeline) works; only the visual layer changes | — Pending |
| Remove Tailwind utility classes from components | Design needs precise control over whitespace and type scale; Tailwind's defaults fight minimalism | — Pending |
| Swiss/Bauhaus sans-serif (Inter/Space Grotesk) | User explicitly chose this over serif or mono; matches the "cool scholar" brief | — Pending |
| Off-white background (#fafaf8) | Warm paper feel, easier on the eyes than pure white, classic for long-form reading | — Pending |
| Projects pull from GitHub API + CV data | Keep live data (stars) but update whitelist to match CV's actual project repos | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-24 after initialization*
