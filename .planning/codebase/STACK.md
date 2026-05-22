# Technology Stack

**Analysis Date:** 2026-04-24

## Languages

**Primary:**
- JavaScript (ES2020+) - All application code, components, services, hooks, utilities

**Secondary:**
- CSS - `src/index.css` (global styles and custom animations via Tailwind `@layer`)
- HTML - `public/index.html` (single-page app shell)

## Runtime

**Environment:**
- Node.js (LTS) - Development and build toolchain only; no server-side runtime at production

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 18.2.0 - UI rendering via `ReactDOM.createRoot` (`src/index.js`)
- Tailwind CSS 3.3.0 - Utility-first styling; config at `tailwind.config.js`

**Animation:**
- Framer Motion 10.16.4 - Motion primitives for `FloatingSocialButtons` and `SocialButton` components; used with spring physics and `useReducedMotion` accessibility hook

**Icons:**
- react-icons 5.5.0 - Icon pack (`FaGithub`, `FaLinkedin`, `FaFileDownload`, `FaExternalLinkAlt`) imported in `src/components/FloatingSocialButtons/socialButtonsData.js`

**Build/Dev:**
- react-scripts 5.0.1 (Create React App) - Webpack bundling, dev server, test runner
- PostCSS 8.4.24 - CSS transform pipeline; config at `postcss.config.js`
- Autoprefixer 10.4.14 - PostCSS plugin for vendor prefixes
- gh-pages 6.3.0 - Static site deployment to GitHub Pages

## Key Dependencies

**Critical:**
- `react` / `react-dom` 18.2.0 - Core UI rendering
- `framer-motion` 10.16.4 - All animation logic for social buttons; removing it breaks the `FloatingSocialButtons` subtree
- `react-icons` 5.5.0 - Social button icons; all icon references are in `socialButtonsData.js`

**Testing:**
- `@testing-library/react` 13.3.0 - Component testing utilities
- `@testing-library/jest-dom` 5.16.4 - Custom DOM matchers
- `@testing-library/user-event` 13.5.0 - User interaction simulation
- Jest (bundled with react-scripts) - Test runner

**Infrastructure:**
- `web-vitals` 2.1.4 - Core Web Vitals measurement (imported but not wired to any reporting endpoint)

## Configuration

**Environment:**
- `REACT_APP_GITHUB_USERNAME` - GitHub username override (defaults to `'aatif101'` in `src/config/githubConfig.js` and `src/config/portfolioConfig.js`)
- `REACT_APP_GITHUB_TOKEN` - Optional GitHub personal access token for higher API rate limits; read in `src/services/GitHubService.js` and `src/config/githubConfig.js`
- `PUBLIC_URL` - CRA-injected base path; used in `src/components/FloatingSocialButtons/socialButtonsData.js` for resume PDF path

**Build:**
- `tailwind.config.js` - Custom color palette (`cosmic.*`, `terminal.*`), monospace font stack (JetBrains Mono), custom `pulse-glow` keyframe animation
- `postcss.config.js` - PostCSS plugins (Tailwind + Autoprefixer)
- `package.json` `homepage` field - `https://aatif101.github.io/aatif_website` - used by CRA and gh-pages for correct asset paths

## Platform Requirements

**Development:**
- Node.js + npm
- `npm start` - CRA dev server on localhost:3000
- `npm test` - Jest test runner in watch mode

**Production:**
- Static HTML/CSS/JS bundle (no server required)
- Deployment target: GitHub Pages via `npm run deploy` (`gh-pages -d build`)
- Font loaded from Google Fonts CDN at runtime: JetBrains Mono (declared in `public/index.html`)
- Canvas API required in browser for `MatrixRain` background effect

---

*Stack analysis: 2026-04-24*
