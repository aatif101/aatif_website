# Architecture

**Analysis Date:** 2026-04-24

## Pattern Overview

**Overall:** Single-Page Application (SPA) — flat component hierarchy with a dedicated service layer for GitHub data fetching

**Key Characteristics:**
- All sections rendered as a single scrollable page with anchor navigation; no client-side routing library
- GitHub data fetching is fully encapsulated: Config → Service → Cache/ErrorHandler → Hook → Component
- Static content (About, Education, Experience) is hardcoded directly in component JSX; only Projects section is data-driven
- No global state manager (Redux, Zustand, etc.); state lives in the `useGitHubProjects` hook via `useState`

## Layers

**Presentation Layer (Components):**
- Purpose: Render UI sections; consume hook-provided data
- Location: `src/components/`
- Contains: Section components, layout components, skeleton/error/empty states
- Depends on: Hooks, Config
- Used by: `src/App.js`

**Data Hook Layer:**
- Purpose: Orchestrate fetch lifecycle, filtering, sorting, retry, and auto-refresh
- Location: `src/hooks/useGitHubProjects.js`
- Contains: `useState`, `useEffect`, `useCallback`, `useRef`, `useMemo` managing loading/error/data state
- Depends on: `GitHubService`, `githubErrorHandler`, `githubConfig`
- Used by: `src/components/ProjectsSection.js`

**Service Layer:**
- Purpose: All GitHub REST API communication; data transformation; filter/sort logic
- Location: `src/services/GitHubService.js`
- Contains: Static class with `fetchUserRepositories`, `fetchRepositoryLanguages`, `transformRepositoryData`, `filterRepositories`, `sortRepositories`
- Depends on: `githubCache` utilities
- Used by: `src/hooks/useGitHubProjects.js`

**Utility Layer:**
- Purpose: Reusable helpers decoupled from React lifecycle
- Location: `src/utils/`
- Contains:
  - `githubCache.js` — `localStorage` TTL cache, ETag conditional request helpers
  - `githubErrorHandler.js` — Error classification, retry decisions, user-facing message formatting
- Depends on: `githubConfig` (for defaults)
- Used by: `GitHubService`, `useGitHubProjects`

**Configuration Layer:**
- Purpose: Centralized, validated settings for GitHub integration
- Location: `src/config/`
- Contains:
  - `githubConfig.js` — Master defaults with `validateConfig` and `createConfigPreset` exports
  - `portfolioConfig.js` — Portfolio-specific overrides (username, preset, custom filter whitelist)
- Depends on: Nothing (reads `process.env` only)
- Used by: All layers above

## Data Flow

**GitHub Projects Fetch:**

1. `ProjectsSection` renders → `useMemo` builds `finalConfig` by merging `githubConfig` defaults + `portfolioConfig` overrides + any prop-level config
2. `useGitHubProjects(username, finalConfig)` is called → `fetchProjects()` triggered via `useEffect` on mount
3. `getCachedData(username, config)` checked in `githubCache.js` → returns early with cached data if TTL valid and config hash matches
4. If no valid cache: `GitHubService.fetchUserRepositories` calls `GET /users/{username}/repos` with optional ETag header
5. On 200 response: `_fetchLanguagesForRepositories` fires parallel `Promise.all` calls to `GET /repos/{username}/{name}/languages`
6. `transformRepositoryData` maps raw API shape → internal `{ id, name, description, link, homepage, tech, stats, metadata }` shape
7. `setCachedData` writes to `localStorage` with new ETag
8. Hook applies `filterRepositories` → `sortRepositories` → slices to `display.maxProjects`
9. `projects` state update triggers `ProjectsSection` re-render → project cards displayed

**Error / Retry Flow:**

1. Caught error → `analyzeGitHubError` classifies into `RATE_LIMIT | NOT_FOUND | NETWORK | UNAUTHORIZED | SERVER_ERROR | UNKNOWN`
2. `shouldRetry(errorInfo)` returns false for rate limit, 404, 401; true for network and server errors
3. Retryable errors: exponential backoff via `getRetryDelay` (2× for network, 3× for server), up to `config.api.maxRetries` (default 3)
4. On exhausted retries: `formatErrorMessage` sets human-readable error string in state → `ProjectsError` component renders with optional retry button
5. Fallback: if `projects.length === 0` and error exists, `ProjectsSection` displays hardcoded `fallbackProjects` array

**State Management:**
- All GitHub data state lives in `useGitHubProjects` hook: `{ projects, loading, error, fromCache, lastUpdated, rateLimitInfo }`
- No prop drilling beyond the hook return value passed to the single consuming component
- Animation/UI state (typewriter effect, social button visibility) managed locally in each component via `useState`

## Key Abstractions

**GitHubService (static class):**
- Purpose: Isolates all API concerns; transform raw API data into a normalized shape used everywhere
- Location: `src/services/GitHubService.js`
- Pattern: Static method class — no instantiation required; all methods called as `GitHubService.fetchUserRepositories()`

**useGitHubProjects (custom hook):**
- Purpose: React integration point for the service layer; provides clean `{ projects, loading, error, refetch }` interface
- Location: `src/hooks/useGitHubProjects.js`
- Pattern: Stateful hook with abort controller cleanup and optional auto-refresh timer

**githubConfig + portfolioConfig (two-tier config):**
- Purpose: Separate concerns between library-level defaults (`githubConfig`) and portfolio-owner customization (`portfolioConfig`)
- Pattern: `portfolioConfig` calls `createConfigPreset()` then merges overrides; `ProjectsSection` does a final merge of any prop-level config on top
- Config presets available: `'portfolio'`, `'starred-only'`, `'recent-activity'`, `'major-projects'`, `'show-all'`

**LoadingSkeleton exports:**
- Purpose: Consistent loading/error/empty/cache-indicator UI decoupled from data logic
- Location: `src/components/LoadingSkeleton.js`
- Pattern: Named exports — `ProjectsGridSkeleton`, `ProjectsError`, `ProjectsEmpty`, `CacheIndicator`, `RateLimitWarning`

## Entry Points

**Application Root:**
- Location: `src/index.js`
- Triggers: Browser loads `public/index.html` → CRA bundle hydrates `<div id="root">`
- Responsibilities: Creates React root, wraps `<App>` in `<React.StrictMode>`

**App Shell:**
- Location: `src/App.js`
- Responsibilities: Composes full page layout — `MatrixRain` (background) + `Header` (fixed nav) + section sequence + `Footer`

## Error Handling

**Strategy:** Catch at the hook boundary; classify errors; retry transient failures; degrade gracefully to fallback content

**Patterns:**
- `try/catch` in `GitHubService._makeRequestWithRetry` with exponential backoff (up to `MAX_RETRIES = 3`)
- Stale cache returned on any error if cached data exists (even if TTL expired)
- `useGitHubProjects` catches hook-level errors and sets `error` state; never throws to the component tree
- `ProjectsSection` renders hardcoded `fallbackProjects` when live fetch fails and cache is empty
- URL validation via `validateUrl()` in `socialButtonsData.js` before opening external links

## Cross-Cutting Concerns

**Logging:** `console.log/warn/error` — scattered across `GitHubService.js` and `useGitHubProjects.js`; no structured logging or log levels

**Validation:** Config validated in `validateConfig()` in `src/config/githubConfig.js` (numeric bounds on all numeric fields); no runtime validation of API response shape beyond `Array.isArray` check in cache

**Authentication:** Not applicable for user auth; GitHub token optionally injected from env vars into request headers

**Accessibility:** `useReducedMotion` hook from Framer Motion respected in `FloatingSocialButtons` and `SocialButton`; `aria-label`, `role="link"`, `tabIndex`, `aria-describedby` present on social buttons; `role="navigation"` on social button container

**Responsive Design:** Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) used throughout all components; projects grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

*Architecture analysis: 2026-04-24*
