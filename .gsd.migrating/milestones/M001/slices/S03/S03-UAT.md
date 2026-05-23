# S03: Curated CV Content and Editorial Sections — UAT

**Milestone:** M001
**Written:** 2026-05-23T04:02:36.362Z

# S03: Curated CV Content and Editorial Sections — UAT

**Milestone:** M001
**Written:** 2026-05-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: This slice's acceptance contract is primarily content integrity and render wiring, so deterministic source artifacts, focused Jest assertions, and a successful production build prove the slice without requiring live human taste review.

## Preconditions

- Dependencies are installed for the CRA app.
- The repository is on the S03-completed worktree state.
- No external secrets or GitHub activity data are required for this slice.

## Smoke Test

Run `npm test -- --watchAll=false --testPathPattern=portfolio-content`; the suite should pass and report checks for selected work, approved organizations, banned hallucinated companies, and no standalone Skills label.

## Test Cases

### 1. Content model contains only approved selected work

1. Open or inspect `src/content/portfolioContent.js`.
2. Check the `selectedWork` entries.
3. **Expected:** The only selected-work project names are Reliu and NazScan, with Reliu positioned around zero-to-TestFlight readiness and NazScan positioned as a one-command security scanner attempt for vibe-coded repos.

### 2. Editorial page renders trusted content sections

1. Run `npm run build`.
2. If manually testing in a browser, start the app and view the homepage.
3. **Expected:** The page includes the lede, the two selected-work spreads, a combined timeline including experience, education, and leadership, plus contact details; it does not introduce extra companies or project cards.

### 3. Unsupported companies are rejected

1. Run `npm test -- --watchAll=false --testPathPattern=portfolio-content`.
2. Review the passing assertions.
3. **Expected:** Equitar, Triedata, Fovus, and Blink are rejected from serialized portfolio content.

### 4. Skills do not appear as a standalone section

1. Run the portfolio content integrity test.
2. Inspect rendered page structure if desired.
3. **Expected:** There is no standalone section label exactly named `Skills`; skills are not rendered as a separate section or gutter marginalia.

## Edge Cases

- If future edits add a third selected-work project, the content integrity test should fail until the slice contract is intentionally revised.
- If future edits reintroduce prior hallucinated companies anywhere in serialized portfolio content, the content integrity test should fail.
- Lowercase implementation data named `skills` can exist internally, but it must not become a public standalone `Skills` section label.

## Not Proven By This UAT

- GitHub activity dashboard fetching or rendering; that is owned by S04.
- Things I Find Cool and colophon content; those are owned by S05.
- Full browser accessibility, smooth scrolling, and final visual polish; those are finalized in S06.
- The unrelated legacy `GitHubService` full-suite test expectation noted during T02 is not addressed by this content slice.
