# Decisions Register

<!-- Append-only. Never edit or remove existing rows.
     To reverse a decision, add a new row that supersedes it.
     Read this file at the start of any planning or research phase. -->

| # | When | Scope | Decision | Choice | Rationale | Revisable? | Made By |
|---|------|-------|----------|--------|-----------|------------|---------|
| D001 | portfolio redesign planning | design | Portfolio redesign visual direction | One-page editorial scroll with Spectral-first Plantin-like typography, warm cream paper background, restrained ink/oxblood palette, and long-form novel pacing. | The user wants LaTeX/novel seriousness combined with Zara/Apple/pi.dev-level smoothness; a text-first editorial system fits that better than card grids, cosmic graphics, or terminal aesthetics. | Yes | collaborative |
| D002 | portfolio redesign planning | architecture | GitHub activity data architecture | Fetch GitHub activity at build time into static JSON, then render from that artifact in React. | Build-time fetch avoids client-side token exposure, lowers rate-limit risk, keeps the static GitHub Pages deployment fast, and still supports nightly refresh via GitHub Actions later. | Yes | agent |
