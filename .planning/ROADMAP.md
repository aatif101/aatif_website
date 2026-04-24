# Roadmap: aatif_website Portfolio Redesign

**Created:** 2026-04-24
**Granularity:** Coarse (3 phases)
**Coverage:** 35/35 v1 requirements mapped

---

## Phases

- [ ] **Phase 1: Design System + Page Skeleton** - Gut old visual layer; establish font, palette, spacing; rebuild Header and page shell
- [ ] **Phase 2: Content Sections** - Build Projects, Experience, Education, Leadership, Skills into the established skeleton
- [ ] **Phase 3: Links, Responsive, Deploy Verification** - Audit all live links, verify mobile layout, confirm GitHub Pages deploy

---

## Phase Details

### Phase 1: Design System + Page Skeleton

**Goal**: The site has a clean Swiss/Bauhaus foundation — old decorative components removed, new typeface and palette applied, header with identity and contacts rendered, single-scroll shell established

**Depends on**: Nothing (first phase)

**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05, HDR-01, HDR-02, HDR-03, HDR-04, SUMM-01, SUMM-02, NAV-01, NAV-02, NAV-03, NAV-04

**Success Criteria** (what must be TRUE):
  1. A visitor sees Inter or Space Grotesk rendered as the typeface everywhere — no fallback monospace or system fonts visible
  2. The background is #fafaf8 and body text is #111 — no dark/cosmic color scheme, no glow, no Matrix rain canvas element in the DOM
  3. The header shows "Mohammad Aatif Shaikh" as the dominant element, followed by the one-liner tagline and a horizontal row of contact links (email, LinkedIn, GitHub, location, work auth note)
  4. The CV summary paragraph renders as flowing prose immediately below the header with no card or box border around it
  5. Scrolling down reveals all section anchors in sequence — smooth scroll works and nav (if present) is unobtrusive

**Plans**: TBD

**UI hint**: yes

---

### Phase 2: Content Sections

**Goal**: Every content section from the CV is populated — Projects (live GitHub API data), Experience (all 5 entries), Education, Leadership, and Skills — all rendered as clean typographic lists with no cards or decorative wrappers

**Depends on**: Phase 1

**Requirements**: SKILL-01, SKILL-02, SKILL-03, PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05, EXP-01, EXP-02, EXP-03, EXP-04, EDU-01, EDU-02, LEAD-01, LEAD-02

**Success Criteria** (what must be TRUE):
  1. The Skills section shows all CV skill categories as plain text labels with comma-separated skill lists — no badge elements, chip components, or SVG icons anywhere in that section
  2. The Projects section displays live star counts and descriptions fetched from GitHub; the whitelist includes nazscan and all other CV projects; NazScan shows an "In active development" status marker
  3. Experience shows all five entries (Pfizer, CacheAi, USF IT, Mozilla, Infrastructure Docs Collective) in reverse chronological order with title, org, date range, and bullet points matching cv.md exactly — no card borders or box shadows
  4. Education shows the USF B.S. CS entry with GPA, dates, scholarship, and relevant coursework matching cv.md; Leadership shows the USF Student Government Senator entry — both in the same typographic style as Experience

**Plans**: TBD

**UI hint**: yes

---

### Phase 3: Links, Responsive, Deploy Verification

**Goal**: Every external link is verified live, the layout holds on mobile without breaking typographic rhythm, and the site deploys successfully to GitHub Pages

**Depends on**: Phase 2

**Requirements**: LINK-01, LINK-02, LINK-03, LINK-04, NAV-04

**Success Criteria** (what must be TRUE):
  1. Clicking every GitHub repo link in the Projects section opens the correct live repository; clicking the LinkedIn link opens the correct profile; clicking the email link opens a mailto: draft with the correct address
  2. On a 375px-wide mobile viewport the header, all content sections, and nav remain readable without horizontal overflow or overlapping text
  3. Running `npm run deploy` completes without error and the live GitHub Pages URL renders the redesigned site correctly

**Plans**: TBD

---

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System + Page Skeleton | 0/? | Not started | - |
| 2. Content Sections | 0/? | Not started | - |
| 3. Links, Responsive, Deploy Verification | 0/? | Not started | - |

---

## Coverage Map

| Requirement | Phase |
|-------------|-------|
| DS-01 | Phase 1 |
| DS-02 | Phase 1 |
| DS-03 | Phase 1 |
| DS-04 | Phase 1 |
| DS-05 | Phase 1 |
| HDR-01 | Phase 1 |
| HDR-02 | Phase 1 |
| HDR-03 | Phase 1 |
| HDR-04 | Phase 1 |
| SUMM-01 | Phase 1 |
| SUMM-02 | Phase 1 |
| NAV-01 | Phase 1 |
| NAV-02 | Phase 1 |
| NAV-03 | Phase 1 |
| NAV-04 | Phase 1 + Phase 3 |
| SKILL-01 | Phase 2 |
| SKILL-02 | Phase 2 |
| SKILL-03 | Phase 2 |
| PROJ-01 | Phase 2 |
| PROJ-02 | Phase 2 |
| PROJ-03 | Phase 2 |
| PROJ-04 | Phase 2 |
| PROJ-05 | Phase 2 |
| EXP-01 | Phase 2 |
| EXP-02 | Phase 2 |
| EXP-03 | Phase 2 |
| EXP-04 | Phase 2 |
| EDU-01 | Phase 2 |
| EDU-02 | Phase 2 |
| LEAD-01 | Phase 2 |
| LEAD-02 | Phase 2 |
| LINK-01 | Phase 3 |
| LINK-02 | Phase 3 |
| LINK-03 | Phase 3 |
| LINK-04 | Phase 3 |

**Coverage note:** NAV-04 (responsive layout) appears in both Phase 1 (establish responsive single-scroll shell) and Phase 3 (verify mobile on final build). Primary ownership is Phase 1; Phase 3 verifies it survives the full content build. All 35 requirement IDs are accounted for. The REQUIREMENTS.md header stated 29 requirements — the actual count across all categories is 35. The traceability table below reflects the true count.

---

*Roadmap created: 2026-04-24*
