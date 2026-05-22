# Codebase Structure

**Analysis Date:** 2026-04-24

## Directory Layout

```
aatif_website/
├── public/                     # Static assets served as-is by CRA
│   ├── index.html              # SPA shell; loads Google Fonts, sets meta tags
│   ├── resume.pdf              # Downloadable resume file
│   └── logos/                  # SVG tech skill logos (ansible, aws, claude, docker, etc.)
├── src/                        # All application source code
│   ├── index.js                # React DOM entry point
│   ├── index.css               # Global styles, Tailwind @layer, custom animations
│   ├── App.js                  # Root component; composes full page layout
│   ├── components/             # UI components (one file per component)
│   │   ├── Header.js           # Fixed nav bar with anchor links
│   │   ├── HeroSection.js      # Typewriter name animation + FloatingSocialButtons
│   │   ├── AboutSection.js     # Static bio and interests text
│   │   ├── EducationExperienceSection.js  # Hardcoded education + timeline experience
│   │   ├── ProjectsSection.js  # GitHub-driven project cards grid
│   │   ├── ResumeSection.js    # Resume display section
│   │   ├── Footer.js           # Contact links and footer text
│   │   ├── MatrixRain.js       # Canvas-based matrix rain background effect
│   │   ├── LoadingSkeleton.js  # Skeleton, error, empty, cache, rate-limit UI components
│   │   └── FloatingSocialButtons/   # Self-contained social buttons feature module
│   │       ├── FloatingSocialButtons.jsx   # Container with staggered animation
│   │       ├── SocialButton.jsx            # Individual animated button
│   │       ├── SocialButtonDemo.jsx        # Demo component (not used in production)
│   │       ├── socialButtonsData.js        # Button config data + link click handler
│   │       ├── index.js                    # Barrel export for the module
│   │       ├── SocialButton.test.jsx       # Unit tests for SocialButton
│   │       └── SocialButtonIntegration.test.jsx  # Integration tests
│   ├── config/                 # App-level configuration (no React, pure JS)
│   │   ├── githubConfig.js     # Master GitHub integration defaults + presets
│   │   └── portfolioConfig.js  # Portfolio owner's customization overrides
│   ├── hooks/                  # Custom React hooks
│   │   └── useGitHubProjects.js   # GitHub data fetch/filter/sort/cache hook
│   ├── services/               # API communication layer
│   │   ├── index.js            # Barrel export for services
│   │   ├── GitHubService.js    # GitHub REST API static class
│   │   └── __tests__/
│   │       └── GitHubService.test.js  # Unit tests for GitHubService
│   └── utils/                  # Pure helper functions (no React)
│       ├── githubCache.js      # localStorage TTL cache + ETag utilities
│       └── githubErrorHandler.js  # Error classification + retry + message formatting
├── .kiro/specs/                # Feature specs (requirements, design, tasks docs)
│   ├── floating-social-buttons/
│   └── github-projects-integration/
├── .planning/codebase/         # GSD codebase map documents (this directory)
├── tailwind.config.js          # Custom Tailwind theme (colors, fonts, animations)
├── postcss.config.js           # PostCSS plugin config (Tailwind + Autoprefixer)
├── package.json                # Dependencies, scripts, browserslist
└── package-lock.json           # Lockfile
```

## Directory Purposes

**`src/components/`:**
- Purpose: All React UI components, one per file
- Contains: Functional components only (no class components); mix of `.js` and `.jsx` extensions
- Key files: `App.js` (root), `ProjectsSection.js` (most complex — data-driven), `LoadingSkeleton.js` (multi-export utility components)

**`src/components/FloatingSocialButtons/`:**
- Purpose: Self-contained feature module for the social link buttons rendered in `HeroSection`
- Contains: Container, individual button, data config, barrel export, and tests
- Key files: `FloatingSocialButtons.jsx` (entry), `socialButtonsData.js` (data/config), `index.js` (re-exports)

**`src/config/`:**
- Purpose: Configuration objects only — no React, no side effects
- Contains: Two files with complementary scopes (library defaults vs. portfolio owner's choices)
- Key files: `githubConfig.js` exports default config + `validateConfig` + `createConfigPreset`; `portfolioConfig.js` exports `portfolioConfig` + `getGitHubConfig()`

**`src/hooks/`:**
- Purpose: Custom React hooks — React-aware orchestration layer
- Contains: One hook: `useGitHubProjects`

**`src/services/`:**
- Purpose: External API communication; pure JavaScript class, no React imports
- Contains: `GitHubService.js` (static class), `index.js` barrel, `__tests__/` subdirectory

**`src/utils/`:**
- Purpose: Pure utility functions; no React, no API calls
- Contains: Cache management and error handling utilities

**`public/logos/`:**
- Purpose: SVG tech skill logos used in skills display
- Generated: No (manually added)
- Committed: Yes

## Key File Locations

**Entry Points:**
- `src/index.js`: React DOM root creation and initial render
- `public/index.html`: HTML shell, Google Fonts link, viewport meta

**Configuration:**
- `src/config/githubConfig.js`: All GitHub integration defaults and preset definitions
- `src/config/portfolioConfig.js`: Owner's customization; `getGitHubConfig()` is the single function consumed by `ProjectsSection`
- `tailwind.config.js`: Custom colors (`cosmic.*`, `terminal.*`) and font family

**Core Logic:**
- `src/services/GitHubService.js`: All GitHub API fetch, transform, filter, sort logic
- `src/utils/githubCache.js`: Cache read/write/invalidate/ETag utilities
- `src/utils/githubErrorHandler.js`: Error type enum, analyzer, retry decider, message formatter
- `src/hooks/useGitHubProjects.js`: React hook wiring the service layer to component state

**Testing:**
- `src/services/__tests__/GitHubService.test.js`: Service unit tests
- `src/components/FloatingSocialButtons/SocialButton.test.jsx`: Button component unit tests
- `src/components/FloatingSocialButtons/SocialButtonIntegration.test.jsx`: Integration tests

## Naming Conventions

**Files:**
- Section components: PascalCase with `Section` suffix — `HeroSection.js`, `AboutSection.js`
- Non-section components: PascalCase — `Header.js`, `Footer.js`, `MatrixRain.js`
- Feature subdirectory components: `.jsx` extension — `FloatingSocialButtons.jsx`, `SocialButton.jsx`
- Hooks: camelCase with `use` prefix — `useGitHubProjects.js`
- Services: PascalCase matching the class name — `GitHubService.js`
- Utils: camelCase descriptive — `githubCache.js`, `githubErrorHandler.js`
- Config: camelCase descriptive — `githubConfig.js`, `portfolioConfig.js`
- Tests: Same name as subject + `.test.` — `GitHubService.test.js`, `SocialButton.test.jsx`

**Directories:**
- Feature modules: PascalCase matching the primary component — `FloatingSocialButtons/`
- Test directories: `__tests__/` (Jest convention) for service tests

## Where to Add New Code

**New page section:**
- Implementation: `src/components/{SectionName}Section.js`
- Register in: `src/App.js` (add `<SectionName Section />` inside `<main>`)
- Add nav link in: `src/components/Header.js`

**New custom hook:**
- Location: `src/hooks/use{FeatureName}.js`

**New external API integration:**
- Service class: `src/services/{ServiceName}Service.js`
- Export from barrel: add to `src/services/index.js`
- Config: `src/config/{featureName}Config.js`
- Error utilities: `src/utils/{featureName}ErrorHandler.js`

**New utility function:**
- Location: `src/utils/{descriptiveName}.js` (camelCase, grouped by domain)

**New self-contained feature UI:**
- Create a subdirectory: `src/components/{FeatureName}/`
- Include: main component, sub-components, data/config file, `index.js` barrel, test files

**New static asset:**
- Images/SVGs: `public/logos/` (for skill logos) or `public/` root for top-level assets
- Downloadable files (e.g., updated resume): replace `public/resume.pdf`

## Special Directories

**`.kiro/specs/`:**
- Purpose: Feature specification documents (requirements, design, tasks) for features developed with the Kiro IDE
- Generated: No (manually authored specs)
- Committed: Yes

**`.planning/codebase/`:**
- Purpose: GSD codebase map documents (STACK.md, INTEGRATIONS.md, ARCHITECTURE.md, STRUCTURE.md)
- Generated: Yes (by GSD mapper agent)
- Committed: Yes (serve as persistent context for GSD planning/execution)

**`build/`** (not present in repo):
- Purpose: CRA production build output
- Generated: Yes (`npm run build`)
- Committed: No (in `.gitignore`); deployed to `gh-pages` branch by `npm run deploy`

---

*Structure analysis: 2026-04-24*
