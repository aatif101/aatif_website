# Requirements: aatif_website Portfolio Redesign

**Defined:** 2026-04-24
**Core Value:** A visitor lands and within 10 seconds understands exactly who Aatif is and what he builds — because the design gets out of the way.

## v1 Requirements

### Design System

- [x] **DS-01**: Apply Inter or Space Grotesk (Google Fonts) as the sole typeface across the site
- [x] **DS-02**: Off-white (#fafaf8) background with near-black (#111) text throughout
- [x] **DS-03**: Remove all decorative visual effects (Matrix rain, gradient animations, glow effects)
- [x] **DS-04**: Remove floating social buttons component
- [x] **DS-05**: Establish consistent type scale and whitespace rhythm (line-height, letter-spacing, margins)

### Header / Identity

- [x] **HDR-01**: Display full name ("Mohammad Aatif Shaikh") as the dominant typographic element
- [x] **HDR-02**: Display one-liner tagline derived from CV summary
- [x] **HDR-03**: Display a clean horizontal contact link row: location, email, LinkedIn, GitHub
- [x] **HDR-04**: Work authorization note visible (US F1 OPT, UAE, India)

### Summary

- [x] **SUMM-01**: Render the full CV summary paragraph as a prose section below the header
- [x] **SUMM-02**: Section flows naturally into the rest of the page — no card/box wrapper

### Skills

- [ ] **SKILL-01**: Display all skill categories from CV (AI/Agentic, LLM/VLM, RAG, Observability, Document AI, Security, Cloud, Languages, Backend/UI)
- [ ] **SKILL-02**: Skills rendered as plain text groups — no badges, chips, or icons
- [ ] **SKILL-03**: Category labels are visually distinct from skill lists (weight or size, not color)

### Projects

- [ ] **PROJ-01**: Fetch live project data from GitHub API (stars, description, homepage URL)
- [ ] **PROJ-02**: Update GitHub whitelist to include CV projects (nazscan and others from cv.md)
- [ ] **PROJ-03**: Each project shows: name, tech tags from CV, description, GitHub link, live link if applicable
- [ ] **PROJ-04**: Projects rendered as a clean list — no cards with borders/shadows
- [ ] **PROJ-05**: "In active development" status shown for NazScan

### Experience

- [ ] **EXP-01**: Render all 5 experience entries from CV: Pfizer, CacheAi, USF IT, Mozilla, Infrastructure Docs Collective
- [ ] **EXP-02**: Each entry: title, org, date range, bullet points — exactly as in cv.md
- [ ] **EXP-03**: Entries in reverse chronological order
- [ ] **EXP-04**: No card/box wrappers — clean typographic list

### Education

- [ ] **EDU-01**: Render USF B.S. CS entry with GPA, dates, scholarship, coursework from cv.md
- [ ] **EDU-02**: Same typographic style as Experience entries

### Leadership

- [ ] **LEAD-01**: Render USF Student Government Senator entry from cv.md
- [ ] **LEAD-02**: Same typographic style as other sections

### Layout & Navigation

- [x] **NAV-01**: Single-scroll layout — all sections on one page
- [x] **NAV-02**: Minimal sticky/fixed navigation with section anchors (optional, unobtrusive)
- [x] **NAV-03**: Smooth scroll behavior between sections
- [x] **NAV-04**: Site is responsive — readable on mobile without breaking the typographic rhythm

### Live Links

- [ ] **LINK-01**: All GitHub repo links are live and correct
- [ ] **LINK-02**: LinkedIn URL links to correct profile
- [ ] **LINK-03**: Email link uses mailto: with correct address
- [ ] **LINK-04**: Any project homepage/live links preserved

## v2 Requirements

### Enhancements

- **V2-01**: Dark mode toggle — off-white/black switch
- **V2-02**: Resume PDF download button
- **V2-03**: Subtle scroll-triggered section fade-in (very minimal, not distracting)
- **V2-04**: Writing/blog section if content exists

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form | Just links needed; forms add complexity without value |
| Matrix rain animation | Explicitly removed — against minimalist brief |
| Floating social buttons | Integrated into header cleanly |
| Multi-page routing | Single scroll is the design intent |
| Loading skeleton animations | Remove or make imperceptible |
| Dark mode | Deferred to v2 |
| Blog / writing section | No content exists |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | Phase 1 | Done |
| DS-02 | Phase 1 | Done |
| DS-03 | Phase 1 | Done |
| DS-04 | Phase 1 | Done |
| DS-05 | Phase 1 | Done |
| HDR-01 | Phase 1 | Done |
| HDR-02 | Phase 1 | Done |
| HDR-03 | Phase 1 | Done |
| HDR-04 | Phase 1 | Done |
| SUMM-01 | Phase 1 | Done |
| SUMM-02 | Phase 1 | Done |
| NAV-01 | Phase 1 | Done |
| NAV-02 | Phase 1 | Done |
| NAV-03 | Phase 1 | Done |
| NAV-04 | Phase 1 (established) / Phase 3 (verified) | Done (Phase 1) |
| SKILL-01 | Phase 2 | Pending |
| SKILL-02 | Phase 2 | Pending |
| SKILL-03 | Phase 2 | Pending |
| PROJ-01 | Phase 2 | Pending |
| PROJ-02 | Phase 2 | Pending |
| PROJ-03 | Phase 2 | Pending |
| PROJ-04 | Phase 2 | Pending |
| PROJ-05 | Phase 2 | Pending |
| EXP-01 | Phase 2 | Pending |
| EXP-02 | Phase 2 | Pending |
| EXP-03 | Phase 2 | Pending |
| EXP-04 | Phase 2 | Pending |
| EDU-01 | Phase 2 | Pending |
| EDU-02 | Phase 2 | Pending |
| LEAD-01 | Phase 2 | Pending |
| LEAD-02 | Phase 2 | Pending |
| LINK-01 | Phase 3 | Pending |
| LINK-02 | Phase 3 | Pending |
| LINK-03 | Phase 3 | Pending |
| LINK-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 35 total (note: original header stated 29 — actual count across all 10 categories is 35)
- Mapped to phases: 35
- Unmapped: 0

---
*Requirements defined: 2026-04-24*
*Last updated: 2026-05-21 — Phase 1 requirements marked Done*
