---
phase: 01
plan: 03
type: execute
wave: 3
depends_on:
  - 01-PLAN-01-cleanup-config
  - 01-PLAN-02-header
files_modified:
  - src/components/SummarySection.js
  - src/App.js
  - src/components/Footer.js
autonomous: true
requirements:
  - SUMM-01
  - SUMM-02
  - NAV-01
  - NAV-03
  - NAV-04
  - DS-05

must_haves:
  truths:
    - "The full CV summary paragraph renders as a prose <p> element with no border, box-shadow, or background-color wrapper"
    - "SummarySection.js exists as a standalone component exporting a <section id='summary'> element"
    - "App.js renders: Header, SummarySection, then a <main id='main'> with 5 placeholder sections (#experience, #projects, #education, #skills, #leadership)"
    - "App.js has no imports of MatrixRain, HeroSection, AboutSection, FloatingSocialButtons"
    - "The root div in App.js has classes: bg-[#fafaf8] text-[#111] font-sans antialiased min-h-screen"
    - "Footer.js has no cosmic/terminal CSS — plain text copyright, no decorative elements"
    - "npm run build exits 0 — no broken imports"
  artifacts:
    - path: "src/components/SummarySection.js"
      provides: "Full CV summary as prose section"
      exports: ["SummarySection (default export)"]
      contains: "AI-native builder with security instincts"
    - path: "src/App.js"
      provides: "Single-scroll shell composition"
      contains: "id=\"main\""
    - path: "src/components/Footer.js"
      provides: "Minimal footer without decorative CSS"
      contains: "#fafaf8"
  key_links:
    - from: "src/App.js"
      to: "src/components/Header.js"
      via: "import Header"
      pattern: "import Header from"
    - from: "src/App.js"
      to: "src/components/SummarySection.js"
      via: "import SummarySection"
      pattern: "import SummarySection from"
    - from: "src/App.js (<main id='main'>)"
      to: "src/components/Header.js (skip link href='#main')"
      via: "id anchor"
      pattern: "id=\"main\""
---

<objective>
Build SummarySection.js, rebuild App.js shell, and clean up Footer.js to complete the single-scroll page skeleton.

Purpose: Plan 01 deleted old components; Plan 02 rebuilt Header. Now App.js must be rewired to:
(a) remove dead imports, (b) compose the new shell with Header + SummarySection + placeholder sections,
and (c) establish the single-scroll id-anchor structure that nav links target.
SummarySection contains the full CV summary paragraph — verbatim prose, no wrapper card.
Footer is cleaned of all cosmic/terminal CSS.

Output:
- src/components/SummarySection.js — new component, CV summary prose with no decorative wrapper
- src/App.js — rewritten shell: Header → SummarySection → main (5 placeholder sections) → Footer
- src/components/Footer.js — cleaned of cosmic/terminal CSS; minimal plain text copyright
- npm run build passes with zero errors
</objective>

<execution_context>
@/home/.claude/get-shit-done/workflows/execute-plan.md
@/home/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phase-01-design-system-page-skeleton/01-UI-SPEC.md

<interfaces>
<!-- Content verbatim from C:\Users\smati\VS Code Projects\career-ops\cv.md lines 8-16 -->
<!-- DO NOT paraphrase, summarize, or modify this text -->

Full CV summary paragraph (copy verbatim):
  "AI-native builder with security instincts. CS senior (graduating May 2026) who has shipped real
  agentic systems: a LangGraph/ColPali/Qdrant document intelligence pipeline for Pfizer, LLM eval
  harnesses at an AI startup (CacheAi), a web vulnerability scanner with AI triage (NazScan), and
  MCP tooling most engineers haven't touched yet. I use Claude Code and Cursor daily as force
  multipliers — I build at a level that doesn't match my experience on paper.
  Targeting applied AI, LLMOps, and AI security roles at early-stage companies."

App.js shell structure (from 01-UI-SPEC.md App.js section):
  1. <Header> — identity + contacts (imported from ./components/Header)
  2. Summary prose — <SummarySection> (imported from ./components/SummarySection)
  3. <main id="main"> — placeholder <section> elements with id anchors:
     - <section id="experience">
     - <section id="projects">
     - <section id="education">
     - <section id="skills">
     - <section id="leadership">
  4. <Footer> (imported from ./components/Footer)

Page-level classes on root div (from 01-UI-SPEC.md):
  className="bg-[#fafaf8] text-[#111] font-sans antialiased min-h-screen"

SummarySection structure (from 01-UI-SPEC.md Summary prose section):
  <section id="summary">
    <div>  max-w-3xl mx-auto px-6 py-8
      <p>  text-base font-normal leading-relaxed text-[#111]
           — full CV summary paragraph, no truncation

Rules:
  - No <div> with border, background-color, border-radius, or box-shadow around the paragraph
  - No section heading label above summary (prose begins immediately — no "About" or "Summary" heading)

Spacing between sections (from 01-UI-SPEC.md Spacing Scale):
  xl (32px / p-8 / gap-8): Space between header block and summary prose
  2xl (48px / p-12): Space between summary prose and first content section

Footer minimal structure:
  - Plain copyright text only: "© 2025 Mohammad Aatif Shaikh"
  - No terminal/cosmic classes, no decorative elements
  - bg-[#fafaf8] or no background (inherits)
  - text-sm text-[#555] centered

Current Footer.js imports and what to remove:
  - Remove all terminal-green, cosmic-purple, cosmic-darker class references
  - Remove font-mono references
  - Remove "sudo hire aatif" and terminal-style decorative content
  - Keep only the copyright line
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create SummarySection.js — CV summary prose, no card wrapper</name>
  <read_first>
    - C:/Users/smati/VS Code Projects/career-ops/cv.md (lines 8-16 — the Summary section; copy the full paragraph verbatim)
    - .planning/phase-01-design-system-page-skeleton/01-UI-SPEC.md (Component Inventory: Summary prose section)
  </read_first>
  <files>src/components/SummarySection.js</files>
  <action>
Create src/components/SummarySection.js. This file does not exist yet. Write it as:

```jsx
import React from 'react';

const SummarySection = () => {
  return (
    <section id="summary">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <p className="text-base font-normal leading-relaxed text-[#111]">
          AI-native builder with security instincts. CS senior (graduating May 2026) who has shipped real
          agentic systems: a LangGraph/ColPali/Qdrant document intelligence pipeline for Pfizer, LLM eval
          harnesses at an AI startup (CacheAi), a web vulnerability scanner with AI triage (NazScan), and
          MCP tooling most engineers haven't touched yet. I use Claude Code and Cursor daily as force
          multipliers — I build at a level that doesn&apos;t match my experience on paper.
          Targeting applied AI, LLMOps, and AI security roles at early-stage companies.
        </p>
      </div>
    </section>
  );
};

export default SummarySection;
```

Implementation notes:
- The apostrophe in "doesn't" is written as `&apos;` to avoid JSX lint warnings — or use the Unicode character directly (') — either is acceptable.
- `id="summary"` on <section> makes this linkable if needed; nav does not link to it (nav links to experience, projects, education, skills, leadership).
- No <h2> or label above the prose — the UI spec explicitly says "No section heading label above summary — prose begins immediately."
- No border, background-color, border-radius, or box-shadow on any wrapping div.
- `py-8` provides 32px (xl spacing) above and below — the header's `py-12` plus this `py-8` creates natural visual separation.
  </action>
  <verify>
    <automated>
      node -e "const fs = require('fs'); const s = fs.readFileSync('src/components/SummarySection.js', 'utf8'); const checks = [['id=\"summary\"', 'section id'], ['AI-native builder with security instincts', 'summary text start'], ['early-stage companies', 'summary text end'], ['max-w-3xl mx-auto', 'container class'], ['leading-relaxed', 'line height class'], ['export default SummarySection', 'default export']]; const banned = ['border', 'shadow', 'bg-', 'rounded', 'terminal', 'cosmic', 'font-mono']; let pass = true; checks.forEach(([str, name]) => { if (!s.includes(str)) { console.error('FAIL missing: ' + name); pass = false; } }); banned.forEach(b => { if (s.includes(b)) { console.error('FAIL banned: ' + b); pass = false; } }); if (pass) console.log('PASS');"
    </automated>
  </verify>
  <acceptance_criteria>
    - `src/components/SummarySection.js` exists
    - Contains `id="summary"` on the section element
    - Contains `AI-native builder with security instincts.`
    - Contains `early-stage companies.`
    - Contains `max-w-3xl mx-auto px-6 py-8`
    - Contains `leading-relaxed`
    - Contains `export default SummarySection`
    - Does NOT contain `border` (no border on wrapper)
    - Does NOT contain `shadow` (no box-shadow)
    - Does NOT contain `rounded` (no border-radius)
    - Does NOT contain `terminal` or `cosmic` or `font-mono`
  </acceptance_criteria>
  <done>SummarySection.js exists and renders the full CV summary paragraph as flowing prose inside a max-w-3xl centered container. No decorative wrapper. No heading label. No card.</done>
</task>

<task type="auto">
  <name>Task 2: Rewrite App.js — single-scroll shell with Header, SummarySection, placeholder sections, Footer</name>
  <read_first>
    - src/App.js (current state — 28 lines; read it to see all current imports before rewriting)
    - src/components/Header.js (confirm it exists and exports default — created in Plan 02)
    - src/components/Footer.js (current state — read before deciding what stays vs. what gets cleaned in Task 3)
  </read_first>
  <files>src/App.js</files>
  <action>
Rewrite src/App.js completely. The new file must be:

```jsx
import React from 'react';
import './index.css';
import Header from './components/Header';
import SummarySection from './components/SummarySection';
import EducationExperienceSection from './components/EducationExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#fafaf8] text-[#111] font-sans antialiased min-h-screen">
      <Header />
      <SummarySection />
      <main id="main">
        {/* Placeholder sections — content built in Phase 2 */}
        <section id="experience" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Experience</h2>
          {/* EducationExperienceSection renders here in Phase 2 */}
          <EducationExperienceSection />
        </section>
        <section id="projects" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Projects</h2>
          <ProjectsSection />
        </section>
        <section id="education" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Education</h2>
          {/* Content added in Phase 2 */}
        </section>
        <section id="skills" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Skills</h2>
          {/* Content added in Phase 2 */}
        </section>
        <section id="leadership" className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-xl font-semibold text-[#111] mb-4">Leadership</h2>
          {/* Content added in Phase 2 */}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

Key implementation notes:
- `id="main"` on <main> satisfies the skip link `href="#main"` in Header.js (Plan 02, Task 1)
- EducationExperienceSection and ProjectsSection are kept imported because they exist in the codebase and will be refactored in Phase 2. Their existing render output will be visually wrong (cosmic colors) but the shell structure is correct. Phase 2 rebuilds these components.
- MatrixRain, HeroSection, AboutSection, FloatingSocialButtons are NOT imported — they were deleted in Plan 01
- Root div has: `bg-[#fafaf8] text-[#111] font-sans antialiased min-h-screen`
- No `relative` class (MatrixRain needed relative positioning — no longer needed)
- Section headings use `text-xl font-semibold text-[#111]` (from UI-SPEC Typography: Heading role)
- Each section has `max-w-3xl mx-auto px-6 py-12` for consistent content width and spacing
  </action>
  <verify>
    <automated>
      node -e "const fs = require('fs'); const a = fs.readFileSync('src/App.js', 'utf8'); const required = ['import Header', 'import SummarySection', 'id=\"main\"', 'id=\"experience\"', 'id=\"projects\"', 'id=\"education\"', 'id=\"skills\"', 'id=\"leadership\"', 'bg-[#fafaf8]', 'font-sans antialiased', 'export default App']; const banned = ['MatrixRain', 'HeroSection', 'AboutSection', 'FloatingSocialButtons', 'bg-cosmic']; let pass = true; required.forEach(s => { if (!a.includes(s)) { console.error('FAIL missing: ' + s); pass = false; } }); banned.forEach(b => { if (a.includes(b)) { console.error('FAIL banned: ' + b); pass = false; } }); if (pass) console.log('PASS');"
    </automated>
  </verify>
  <acceptance_criteria>
    - `src/App.js` imports `Header` from `./components/Header`
    - `src/App.js` imports `SummarySection` from `./components/SummarySection`
    - `src/App.js` contains `id="main"` on the main element
    - `src/App.js` contains `id="experience"`
    - `src/App.js` contains `id="projects"`
    - `src/App.js` contains `id="education"`
    - `src/App.js` contains `id="skills"`
    - `src/App.js` contains `id="leadership"`
    - `src/App.js` contains `bg-[#fafaf8] text-[#111] font-sans antialiased`
    - `src/App.js` does NOT contain `MatrixRain`
    - `src/App.js` does NOT contain `HeroSection`
    - `src/App.js` does NOT contain `AboutSection`
    - `src/App.js` does NOT contain `FloatingSocialButtons`
    - `src/App.js` does NOT contain `bg-cosmic`
  </acceptance_criteria>
  <done>App.js is a clean single-scroll shell. Header and SummarySection are composed correctly. Five section anchors exist for nav link targeting. id="main" is present for skip link. All deleted components are no longer imported.</done>
</task>

<task type="auto">
  <name>Task 3: Clean Footer.js — remove all cosmic/terminal decorative CSS, plain copyright only</name>
  <read_first>
    - src/components/Footer.js (current state — 65 lines; read entire file to identify all cosmic/terminal references)
  </read_first>
  <files>src/components/Footer.js</files>
  <action>
Rewrite src/components/Footer.js completely. Remove all terminal/cosmic decorative elements.
The new file must be:

```jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="max-w-3xl mx-auto px-6 py-8 mt-12">
      <p className="text-sm text-[#555] text-center">
        © 2025 Mohammad Aatif Shaikh
      </p>
    </footer>
  );
};

export default Footer;
```

What is removed:
- `bg-cosmic-darker` background
- `border-t border-cosmic-purple/30` top border with cosmic color
- Terminal-style decorative divs (`$ echo "Let's connect!"`, `$ sudo hire aatif`)
- `font-mono` class usage
- `text-terminal-green` color references
- GitHub and LinkedIn links (they already appear in Header contact row — duplicating them in Footer adds noise)
- The `space-y-8` and nested layout — replaced with a single copyright line

What is kept:
- `<footer>` semantic element
- Copyright text — updated to 2025, full name "Mohammad Aatif Shaikh"
- Consistent `max-w-3xl mx-auto px-6` content width (matches header and sections)
- `text-sm text-[#555]` (Label size, muted color — from UI-SPEC)
  </action>
  <verify>
    <automated>
      node -e "const fs = require('fs'); const f = fs.readFileSync('src/components/Footer.js', 'utf8'); const banned = ['cosmic', 'terminal', 'font-mono', 'text-gray', 'border-cosmic', 'bg-cosmic', 'sudo hire', 'echo']; const required = ['Mohammad Aatif Shaikh', 'text-[#555]', 'export default Footer']; let pass = true; banned.forEach(b => { if (f.includes(b)) { console.error('FAIL banned: ' + b); pass = false; } }); required.forEach(s => { if (!f.includes(s)) { console.error('FAIL missing: ' + s); pass = false; } }); if (pass) console.log('PASS');"
    </automated>
  </verify>
  <acceptance_criteria>
    - `src/components/Footer.js` does NOT contain `cosmic`
    - `src/components/Footer.js` does NOT contain `terminal`
    - `src/components/Footer.js` does NOT contain `font-mono`
    - `src/components/Footer.js` does NOT contain `text-gray`
    - `src/components/Footer.js` does NOT contain `sudo`
    - `src/components/Footer.js` contains `Mohammad Aatif Shaikh`
    - `src/components/Footer.js` contains `text-[#555]`
    - `src/components/Footer.js` contains `export default Footer`
  </acceptance_criteria>
  <done>Footer.js is a minimal plain-text copyright footer. No cosmic, terminal, or font-mono references. Matches the Swiss/Bauhaus design system.</done>
</task>

<task type="auto">
  <name>Task 4: Verify build — npm run build exits 0 with no broken imports</name>
  <read_first>
    - src/App.js (current state after Task 2 — confirm imports match existing component files)
    - src/components/ directory listing — confirm Header.js, SummarySection.js, Footer.js, EducationExperienceSection.js, ProjectsSection.js all exist
  </read_first>
  <files></files>
  <action>
Run the production build to confirm zero broken imports and no compilation errors:

```bash
npm run build
```

Expected outcome: Build completes with "Compiled successfully" or "webpack compiled with 0 errors". 

If the build fails due to EducationExperienceSection or ProjectsSection still referencing cosmic/terminal Tailwind classes that no longer exist in tailwind.config.js: this is NOT a build error — Tailwind silently ignores unknown utility classes. The build will still succeed.

If the build fails due to a missing file import (e.g., a component imported in App.js that doesn't exist), identify which import is broken and either:
(a) Remove that import from App.js if the component was deleted in Plan 01
(b) Create a minimal stub component if it's a component that will exist in Phase 2

Do NOT modify EducationExperienceSection.js or ProjectsSection.js in this plan — those are Phase 2 scope. They may render with broken visual styles (cosmic classes that no longer resolve) but they will not break the build.
  </action>
  <verify>
    <automated>
      npm run build 2>&1 | tail -5
    </automated>
  </verify>
  <acceptance_criteria>
    - `npm run build` exits with code 0
    - Build output contains `Compiled successfully` or `webpack compiled` without `errors`
    - No `Module not found` errors in build output
    - The `build/` directory is created or updated
  </acceptance_criteria>
  <done>The app builds successfully with zero module-not-found or compilation errors. All three phases of Phase 1 changes (config cleanup, Header rebuild, shell composition) compile correctly together.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| App.js → Existing Phase 2 components | EducationExperienceSection and ProjectsSection may fetch external data (GitHub API) — they cross the network boundary |
| Summary text → DOM | Static hardcoded string — no user input, no XSS surface |
| #main skip target | Skip link in Header resolves to id="main" in App.js — DOM anchor |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-08 | Information Disclosure | CV summary paragraph in static DOM | accept | Summary text is intentionally public portfolio content — verbatim from cv.md by design. No PII beyond what the portfolio owner chose to publish. |
| T-01-09 | Tampering | ProjectsSection GitHub API fetch (carried over from Phase 1 shell) | accept | ProjectsSection is a pre-existing component; its API fetch behavior is unchanged in Phase 1. Phase 2 will audit and control the whitelist. No new attack surface introduced by App.js shell wiring. |
| T-01-10 | Denial of Service | EducationExperienceSection / ProjectsSection render errors crashing App | accept | React error boundaries are out of Phase 1 scope. If a Phase-2 component throws, it crashes the page — acceptable risk in development. Phase 3 verifies stability on the deployed build. |
</threat_model>

<verification>
After all four tasks complete:

```bash
# Full build check
npm run build 2>&1 | grep -E "error|success|compiled" | tail -5

# Verify SummarySection has no wrapper card
grep -n "border\|shadow\|rounded\|bg-" src/components/SummarySection.js

# Verify App.js has all 5 section anchors
grep -n "id=" src/App.js

# Verify Footer has no cosmic/terminal
grep -c "cosmic\|terminal\|font-mono" src/components/Footer.js && echo "FAIL" || echo "PASS"
```
</verification>

<success_criteria>
1. SummarySection.js exists, contains verbatim CV summary paragraph, no border/shadow/bg wrapper
2. App.js shell composes Header → SummarySection → main (5 sections) → Footer; no dead imports
3. id="main" on main element satisfies Header.js skip link
4. All 5 section anchors present: #experience, #projects, #education, #skills, #leadership
5. Footer.js is clean — plain copyright, no cosmic/terminal CSS
6. npm run build exits 0 — no compilation errors
7. All Phase 1 requirements fulfilled: DS-05 (spacing/typography consistent across shell), NAV-01 (single scroll), NAV-03 (smooth scroll via index.css), NAV-04 (responsive via max-w-3xl + Tailwind breakpoints established), SUMM-01+02 (prose no wrapper)
</success_criteria>

<output>
After completion, create `.planning/phases/01-design-system-page-skeleton/01-03-SUMMARY.md`

The summary must record:
- Files created: src/components/SummarySection.js
- Files rebuilt: src/App.js (shell composition), src/components/Footer.js (cleaned)
- Shell structure: Header → SummarySection → main[experience, projects, education, skills, leadership] → Footer
- id="main" present for skip link resolution
- Build status: npm run build exits 0
- Known state going into Phase 2: EducationExperienceSection and ProjectsSection render with old cosmic styles — will be rebuilt in Phase 2
</output>
