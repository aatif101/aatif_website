# M001: Editorial Portfolio Redesign

**Vision:** Replace the existing cosmic terminal portfolio with a premium one-page editorial portfolio: Spectral now as the Plantin-like serif, warm cream paper background, restrained ink palette, smooth Lenis and GSAP scroll choreography, real content from cv.md only, and a designed GitHub activity dashboard that treats the user's public work as the centerpiece.

## Success Criteria

- Homepage no longer uses the matrix rain, cosmic gradient, terminal colors, JetBrains Mono identity, typewriter gimmick, card-grid portfolio pattern, or floating social buttons.
- The page renders as one editorial scroll with Opening, Lede, Selected Work, Experience, GitHub Activity, Things I Find Cool, and Colophon sections.
- Spectral is used as the primary Plantin-like serif; UI labels use a minimal supporting sans only where needed; colors are warm paper, warm ink, muted gray, and restrained oxblood accent.
- Lenis and GSAP ScrollTrigger provide smooth scroll and section choreography while honoring prefers-reduced-motion.
- Selected Work contains only Reliu and NazScan, using the user's exact positioning: Reliu zero to TestFlight ready, NazScan tried building a one command security scanner for vibe-coded repos.
- Personal content is traceable to career-ops/cv.md or explicit user-provided wording; no unsupported companies, roles, projects, or claims are introduced.
- GitHub activity is fetched at build time into a static artifact and rendered as a designed dashboard without exposing tokens to the client bundle.
- The redesigned site builds successfully, runs locally, has no browser console errors, and passes focused accessibility checks for landmarks, keyboard navigation, focus states, contrast, and reduced motion.

## Slices

- [x] **S01: S01** `risk:high` `depends:[]`
  > After this: After this: npm start shows a cream editorial homepage with Aatif as the opening identity, no matrix rain or terminal visuals, and empty but correctly paced sections for the full one-page scroll.

- [ ] **S02: S02** `risk:high` `depends:[]`
  > After this: After this: opening identity, lede, selected-work placeholders, and timeline placeholders move with smooth scroll in normal mode and become static readable sections in reduced-motion mode.

- [ ] **S03: Curated CV Content and Editorial Sections** `risk:medium` `depends:[S02]`
  > After this: After this: the page shows the lede, Reliu and NazScan selected work, experience timeline, education, leadership, and contact details with no unsupported companies or claims.

- [ ] **S04: Build Time GitHub Activity Dashboard** `risk:high` `depends:[S03]`
  > After this: After this: npm run fetch-github-activity writes a public static data artifact, and the homepage renders a GitHub activity spread using that data or a graceful fallback.

- [ ] **S05: Things I Find Cool and Colophon** `risk:medium` `depends:[S04]`
  > After this: After this: the page includes a Things I Find Cool editorial list with maintainable seed data and a restrained colophon with real links and font/site meta.

- [ ] **S06: Polish Verification and Old System Removal** `risk:medium` `depends:[S05]`
  > After this: After this: the fully assembled site builds, runs locally, scrolls smoothly, passes browser checks, and is ready for user taste review before deployment.

## Boundary Map

### S01 to S02
Produces:
- Editorial app shell, design tokens, font loading, and section containers in React/CSS.
Consumes:
- Existing CRA and Tailwind setup.

### S02 to S03
Produces:
- Motion orchestration utilities and reduced-motion behavior that content sections can use.
Consumes:
- S01 section containers.

### S03 to S04
Produces:
- Curated portfolio content modules and stable section structure.
Consumes:
- cv.md as source of truth plus explicit user project copy.

### S04 to S05
Produces:
- Static GitHub activity JSON artifact and React dashboard component.
Consumes:
- Local .env token if present, or fallback data.

### S05 to S06
Produces:
- Things I Find Cool and final colophon surfaces.
Consumes:
- Editorial design system, motion utilities, content modules, and GitHub dashboard.
