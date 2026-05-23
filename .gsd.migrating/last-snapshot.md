# GSD context snapshot (2026-05-22T18:49:35.739Z)

## Top project memories
- [MEM003] (pattern) Editorial shell uses CSS custom properties as the canonical token layer (--color-paper, --color-ink, --color-oxblood, etc.) with Tailwind referencing them via var() — keeps runtime theming possible and avoids Tailwind JIT purge issues with dynamic class names. Components use inline styles bound to tokens rather than Tailwind utility classes.
- [MEM004] (gotcha) CRA's pinned @testing-library/react emits a ReactDOMTestUtils.act() deprecation warning on React 18 — this is a console warning, not a test failure. Resolving it would require ejecting or overriding CRA's dependency resolution to upgrade @testing-library/react to 14+. Safe to ignore for now.
- [MEM005] (convention) The editorial shell test at src/__tests__/editorial-shell.test.js includes a source-file read assertion (fs.readFileSync) to detect re-introduction of legacy imports (MatrixRain, cosmic, terminal components). This gives future agents a deterministic, browser-free signal for regression detection.
- [MEM001] (architecture) Portfolio redesign visual direction Chose: One-page editorial scroll with Spectral-first Plantin-like typography, warm cream paper background, restrained ink/oxblood palette, and long-form novel pacing.. Rationale: The user wants LaTeX/novel seriousness combined with Zara/Apple/pi.dev-level smoothness; a text-first editorial system fits that better than card grids, cosmic graphics, or terminal aesthetics..
- [MEM002] (architecture) GitHub activity data architecture Chose: Fetch GitHub activity at build time into static JSON, then render from that artifact in React.. Rationale: Build-time fetch avoids client-side token exposure, lowers rate-limit risk, keeps the static GitHub Pages deployment fast, and still supports nightly refresh via GitHub Actions later..

## Recent gsd_exec runs
- [cb7bf263-6ca2-4a66-8fa3-8e975dac5249] node exit:0 — S01 slice verification: editorial-shell tests
- [99a73414-5c16-4527-9936-4b1ec
…[truncated]
