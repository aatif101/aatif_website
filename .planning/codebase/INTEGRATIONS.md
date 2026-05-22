# External Integrations

**Analysis Date:** 2026-04-24

## APIs & External Services

**GitHub REST API v3:**
- Purpose: Fetch public repository list and per-repo language statistics to auto-populate the Projects section
- Base URL: `https://api.github.com`
- Endpoints used:
  - `GET /users/{username}/repos` - Repository list
  - `GET /repos/{username}/{repoName}/languages` - Per-repo language breakdown
- SDK/Client: Native `fetch` API (no SDK); encapsulated in `src/services/GitHubService.js`
- Auth: Optional Bearer token via `REACT_APP_GITHUB_TOKEN` env var; unauthenticated when absent (60 req/hr rate limit)
- Rate limit handling: Reads `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `X-RateLimit-Limit` response headers; warns at ≤10 remaining; blocks language fetching when remaining requests are insufficient
- Conditional requests: Sends `If-None-Match` / ETag headers to avoid redundant data transfer (`src/utils/githubCache.js`)

## Data Storage

**Databases:**
- None - no server-side database

**File Storage:**
- Local filesystem only: `public/resume.pdf` served as a static asset

**Caching:**
- Browser `localStorage` - GitHub API response cache with 1-hour TTL; implemented in `src/utils/githubCache.js`
  - Cache key format: `github_projects_{username}_{configHash8chars}`
  - Max 5 most recent entries kept; older entries evicted on `QuotaExceededError`
  - ETag stored alongside data for conditional requests on next load

## Authentication & Identity

**Auth Provider:**
- None - this is a public-facing read-only portfolio site; no user authentication

**GitHub Token (optional):**
- Personal access token for elevated API rate limits (5000 req/hr vs 60)
- Configured via `REACT_APP_GITHUB_TOKEN` environment variable
- Never exposed in UI; read only in `src/services/GitHubService.js` and `src/config/githubConfig.js`

## Monitoring & Observability

**Error Tracking:**
- None - no external error tracking service integrated

**Logs:**
- `console.log` / `console.warn` / `console.error` in `src/services/GitHubService.js` and `src/hooks/useGitHubProjects.js`
- Structured error classification in `src/utils/githubErrorHandler.js` (rate limit, 404, network, 401, 5xx, unknown)

**Web Vitals:**
- `web-vitals` package is installed but not wired to any reporting endpoint (no analytics service configured)

## CI/CD & Deployment

**Hosting:**
- GitHub Pages at `https://aatif101.github.io/aatif_website`
- Configured via `homepage` field in `package.json`

**Deploy Command:**
```bash
npm run deploy   # runs: react-scripts build && gh-pages -d build
```

**CI Pipeline:**
- None - no automated CI workflow detected (no `.github/workflows/` directory)

## Environment Configuration

**Required env vars:**
- None strictly required - the app runs without any env vars using hardcoded defaults

**Optional env vars:**
- `REACT_APP_GITHUB_USERNAME` - GitHub username (default: `'aatif101'`)
- `REACT_APP_GITHUB_TOKEN` - GitHub PAT for higher API rate limits (default: none)

**Secrets location:**
- `.env` file (not committed; listed in `.gitignore`) — note: env file was not read, existence only noted

## External Fonts

**Google Fonts CDN:**
- JetBrains Mono (weights 300–700) loaded at runtime via `<link>` tags in `public/index.html`
- Fallback stack in `tailwind.config.js`: `['JetBrains Mono', 'Monaco', 'Consolas', 'monospace']`
- No self-hosted font files present

## External Links (Hardcoded)

The following external URLs are hardcoded in component data files and the Footer:
- `https://github.com/aatif101` - GitHub profile (`src/components/FloatingSocialButtons/socialButtonsData.js`, `src/components/Footer.js`)
- `https://linkedin.com/in/shaikhaatif` - LinkedIn profile (`src/components/FloatingSocialButtons/socialButtonsData.js`, `src/components/Footer.js`)
- Email: `smatif.t@gmail.com` and `mohammadaatif@usf.edu` (`src/components/Footer.js`)

## Webhooks & Callbacks

**Incoming:** None

**Outgoing:** None

---

*Integration audit: 2026-04-24*
