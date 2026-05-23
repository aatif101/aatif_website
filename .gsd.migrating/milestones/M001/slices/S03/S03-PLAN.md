# S03: Curated CV Content and Editorial Sections

**Goal:** Replace placeholders with trustworthy content drawn only from career-ops/cv.md and explicit user-provided wording.
**Demo:** After this: the page shows the lede, Reliu and NazScan selected work, experience timeline, education, leadership, and contact details with no unsupported companies or claims.

## Must-Haves

- A content module or JSON file contains curated data traceable to cv.md and explicit user text.
- Selected Work contains only Reliu and NazScan with the agreed short positioning.
- Experience timeline includes Pfizer, CacheAi, USF IT, Mozilla, Infrastructure Docs Collective, USF education, and USF Student Government leadership as appropriate.
- Skills are not rendered as a standalone section or gutter marginalia.
- Content integrity test or script guards against banned hallucinated company names.
- npm run build passes.

## Proof Level

- This slice proves: contract

## Integration Closure

Provides the stable content data consumed by the final visual components and GitHub dashboard context.

## Verification

- Content integrity test output gives future agents a failure surface for accidental unsupported claims.

## Tasks

- [x] **T01: Create trustworthy portfolio content module** `est:1h`
  Create a portfolio content module with structured data for identity, lede, selected work, experience, education, leadership, and links. Source only from C:/Users/smati/VS Code Projects/career-ops/cv.md plus explicit user copy from this discussion. Selected Work must only contain Reliu and NazScan, with Reliu positioned as zero to TestFlight ready and NazScan positioned as tried building a one command security scanner for vibe-coded repos.
  - Files: `src/content/portfolioContent.js`
  - Verify: npm run build

- [x] **T02: Render selected work and timeline from content** `est:1h 30m`
  Render the content module through the editorial sections. Selected work should be two pinned spreads only. Experience should be a dense editorial timeline with marginal dates, education and leadership folded into the timeline or closing timeline rows, and no separate Skills section or skill tags. Preserve the user's ability to change the lede later by keeping it in the content module.
  - Files: `src/components/EditorialPortfolio.jsx`, `src/components/editorial/SelectedWork.jsx`, `src/components/editorial/ExperienceTimeline.jsx`
  - Verify: npm run build

- [x] **T03: Guard against unsupported personal content** `est:45m`
  Add a content integrity test that imports portfolioContent and verifies the allowed project and experience names while rejecting known hallucinated companies from prior discussion: Equitar, Triedata, Fovus, and Blink. Also verify there is no standalone Skills section label in the content model.
  - Files: `src/__tests__/portfolio-content.test.js`
  - Verify: npm test -- --watchAll=false --testPathPattern=portfolio-content

## Files Likely Touched

- src/content/portfolioContent.js
- src/components/EditorialPortfolio.jsx
- src/components/editorial/SelectedWork.jsx
- src/components/editorial/ExperienceTimeline.jsx
- src/__tests__/portfolio-content.test.js
