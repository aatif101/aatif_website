# M001: Editorial Portfolio Redesign

## User intent

The current portfolio is not acceptable to the user. It feels like generic AI slop: cosmic dark background, matrix rain, terminal colors, JetBrains Mono, typewriter effects, cards, icons, and gimmicks. The new site should feel like a premium one-page editorial scroll: LaTeX or novel seriousness combined with Zara, Apple, and pi.dev-level smoothness.

The user explicitly wants:

- Plantin feel, using Spectral now and optionally swapping to licensed Plantin later.
- One-page editorial scroll, not a routed site.
- Smooth motion as a core feature, not a tiny fade. Use Lenis plus GSAP ScrollTrigger and take time to tune it.
- Warm cream paper color, easy on the eyes.
- Minimal, but not plain. The feeling should be typographic, cinematic, and intentionally paced.
- No AI-slop visual tropes.

## Non-negotiable content source rule

Only use `C:/Users/smati/VS Code Projects/career-ops/cv.md` as the source of truth for personal and career content unless the user explicitly provides replacement wording in chat.

This rule exists because earlier planning incorrectly referenced companies not present in `cv.md`. Do not include Equitar, Triedata, Fovus, Blink, or any other unsupported role or project.

## Confirmed content

Name in corner: `Aatif`.

Lede can be changed later. Acceptable starter based on cv.md: `AI-native builder with security instincts.` Do not overwork this; user said they do not care about final line right now.

Selected Work must contain exactly two featured projects:

1. Reliu
   - Positioning: `zero to TestFlight ready`
   - Keep it short and premium. Do not turn it into a generic project card.
2. NazScan
   - Positioning from user: `tried building a one command security scanner for vibe-coded repos`
   - Do not overstate completion beyond cv.md active-development status.

Experience entries from cv.md:

- Pfizer via Externship Program, AI/ML Extern, Pharmaceutical Document Intelligence, Mar 2026 to Apr 2026.
- CacheAi, AI/ML Intern, Jul 2024 to Aug 2024.
- USF IT, AV Tech and Workflow Automation, May 2025 to Present.
- Mozilla, Open Source Contributor via Bugzilla.
- Infrastructure Docs Collective, Open Source Contributor.
- Education: University of South Florida, B.S. Computer Science, Aug 2022 to Dec 2026, GPA 3.6.
- Leadership: USF Student Government Senator, May 2024 to May 2025.

Skills should not be a standalone section and should not be gutter marginalia. Let skills surface through the experience/project prose and GitHub dashboard.

## Section order

1. Opening
2. Lede
3. Selected Work
4. Experience
5. GitHub Activity
6. Things I Find Cool
7. Colophon

## Visual direction

- Primary serif: Spectral now, Plantin later if licensed.
- Supporting sans: use only for small labels/meta if needed. Do not use Space Grotesk.
- Background: warm cream paper, around `#f5f1e8`.
- Ink: warm near-black, around `#1c1917`.
- Muted: warm gray, around `#6b645a`.
- Accent: oxblood, around `#5c1a1b`, used sparingly.
- Hairline: around `#dcd5c4`.
- No gradients, no glow, no terminal theme, no matrix rain, no card grid, no icon wall.

## Motion direction

Use Lenis for smooth scroll and GSAP ScrollTrigger for choreography.

Desired behavior:

- Opening name appears huge and quiet on cream paper.
- As the user scrolls, name moves/scales into a small corner identity.
- Lede arrives with word-level or phrase-level restraint.
- Selected Work spreads can pin briefly and transition like an editorial product page.
- Experience timeline uses marginal years/date ranges and smooth current-entry emphasis.
- Reduced-motion mode must disable Lenis smoothing and ScrollTrigger transforms/pinning while preserving all content in a readable static flow.

## GitHub dashboard direction

The user sees GitHub work as the most honest representation of their work. Build a designed activity dashboard, not a green GitHub clone and not a generic analytics card grid.

Architecture decision: fetch GitHub activity at build time into static JSON. Do not expose any token in client code. The local `.env` exists and is gitignored. Do not read, print, echo, or log token values. The fetch script should support `GITHUB_TOKEN_PORTFOLIO` and `GITHUB_TOKEN`, and may also safely parse `.env` keys without printing values.

Dashboard should include, if available from safe public REST data:

- One large headline activity metric.
- Contribution-style data print in cream and oxblood.
- Recent activity lines.
- Active repos by recent work.
- Small tally line.

Fallback behavior should keep the page beautiful if API fetch fails.

## Things I Find Cool

User will send real entries later. For now, ship a visually complete section driven by editable content with placeholder seed entries clearly marked as replaceable. This section should feel like a curated taste list, not a blog stub.

## Verification expectations

- `npm run build` must pass.
- Tests should guard content integrity and secret leakage.
- Browser verification should confirm key sections render, scrolling has no console errors, and contact links work.
- Reduced-motion behavior must be checked.
- Build/source must be checked for absence of GitHub token-looking values.
