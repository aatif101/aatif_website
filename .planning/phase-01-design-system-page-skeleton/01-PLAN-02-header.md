---
phase: 01
plan: 02
type: execute
wave: 2
depends_on:
  - 01-PLAN-01-cleanup-config
files_modified:
  - src/components/Header.js
autonomous: true
requirements:
  - HDR-01
  - HDR-02
  - HDR-03
  - HDR-04
  - NAV-02

must_haves:
  truths:
    - "The name 'Mohammad Aatif Shaikh' renders as the dominant h1 element at 36px semibold on desktop"
    - "The tagline 'AI-native builder with security instincts.' renders as body text directly below the name"
    - "A horizontal contact row shows: email link, LinkedIn link, GitHub link, Tampa FL location, work auth note — all separated by · dots"
    - "LinkedIn and GitHub links open in a new tab with rel=noopener noreferrer"
    - "Email link uses mailto:mohammadaatif@usf.edu"
    - "All interactive elements have focus:ring-2 focus:ring-[#111] for visible focus"
    - "A skip-to-main-content link is the first focusable element in the component"
    - "Nav links Experience, Projects, Education, Skills, Leadership render below contact row, hidden on mobile"
    - "Header is sticky top-0 with z-10 — no border, no shadow, no backdrop blur"
  artifacts:
    - path: "src/components/Header.js"
      provides: "Identity block: name + tagline + contacts + nav"
      exports: ["Header (default export)"]
      min_lines: 60
  key_links:
    - from: "src/components/Header.js"
      to: "https://linkedin.com/in/shaikhaatif"
      via: "anchor href"
      pattern: "linkedin.com/in/shaikhaatif"
    - from: "src/components/Header.js"
      to: "https://github.com/aatif101"
      via: "anchor href"
      pattern: "github.com/aatif101"
    - from: "src/components/Header.js"
      to: "mailto:mohammadaatif@usf.edu"
      via: "anchor href"
      pattern: "mailto:mohammadaatif@usf.edu"
---

<objective>
Rebuild Header.js as the primary identity block — name, tagline, contact row, and nav anchors.

Purpose: This is the first thing a visitor sees. It must communicate who Aatif is and how to
reach him within 10 seconds. The Swiss/Bauhaus design principle applies: every element earns its
place through function, not decoration.

Output: A fully rebuilt src/components/Header.js with:
- Full name as dominant h1 (36px semibold desktop / 28px mobile)
- One-liner tagline verbatim from cv.md
- Horizontal contact row (email, LinkedIn, GitHub, location, work auth) with · separators
- Minimal nav with 5 section anchors (hidden on mobile)
- Sticky positioning, no visual decoration
- Full accessibility baseline (skip link, focus rings, aria-labels, landmark element)
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
<!-- Content verbatim from C:\Users\smati\VS Code Projects\career-ops\cv.md -->
<!-- DO NOT paraphrase or modify these strings -->

Name (h1): Mohammad Aatif Shaikh

Tagline (first sentence of Summary, verbatim):
  AI-native builder with security instincts.

Contact row values (verbatim from cv.md contact line):
  Email:     mohammadaatif@usf.edu
  LinkedIn:  https://www.linkedin.com/in/shaikhaatif/
  GitHub:    https://github.com/aatif101
  Location:  Tampa, FL
  Work auth: US (F1 OPT, May 2026) · UAE · India

Nav anchors (5 items, in this order):
  Experience → #experience
  Projects   → #projects
  Education  → #education
  Skills     → #skills
  Leadership → #leadership

UI-SPEC component structure (from 01-UI-SPEC.md Header.js section):
  <header>  sticky top-0 z-10, bg-[#fafaf8], no border, no shadow
    <div>   max-w-3xl mx-auto px-6 py-12 (desktop) / py-8 (mobile)
      <h1>  text-4xl font-semibold leading-tight sm:text-3xl  — "Mohammad Aatif Shaikh"
      <p>   text-base font-normal leading-relaxed text-[#111]  — tagline
      <div> contact row: flex flex-wrap gap-2 items-center
        <a>     Email (mailto:mohammadaatif@usf.edu)
        <span>  · separator (text-[#555])
        <a>     LinkedIn (target=_blank, rel=noopener noreferrer)
        <span>  · separator
        <a>     GitHub (target=_blank, rel=noopener noreferrer)
        <span>  · separator
        <span>  Tampa, FL (text-[#555] text-sm)
        <span>  · separator
        <span>  US (F1 OPT, May 2026) · UAE · India (text-[#555] text-sm)
      <nav>   aria-label="Page sections", hidden md:flex, flex gap-4, pt-4
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#leadership">Leadership</a>

Interaction contracts:
  - Contact link hover: hover:underline
  - Contact link focus: focus:outline-none focus:ring-2 focus:ring-[#111]
  - External link aria-label: include "(opens in new tab)" suffix
  - Nav link: text-sm font-normal text-[#111] hover:underline, no default underline

Accessibility requirements (from 01-UI-SPEC.md):
  - Skip link: <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
    placed as first child of <header>
  - Landmark: <header> semantic element (not <div>)
  - h1 is the only h1 on the page — do not add another h1 inside nav or elsewhere
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rebuild Header.js — full identity block with name, tagline, contacts, nav</name>
  <read_first>
    - src/components/Header.js (current state — 26 lines; read it to know what you are replacing)
    - .planning/phase-01-design-system-page-skeleton/01-UI-SPEC.md (Component Inventory: Header.js section, Interaction Contracts section, Accessibility Baseline section, Copywriting Contract section)
    - C:/Users/smati/VS Code Projects/career-ops/cv.md (lines 1-16 — name, contact line, and Summary section for exact verbatim strings)
  </read_first>
  <files>src/components/Header.js</files>
  <action>
Replace src/components/Header.js entirely with the following component. Copy this EXACTLY — every class name, every string, every aria attribute:

```jsx
import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-[#fafaf8]">
      {/* Skip link — must be first focusable element */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-[#fafaf8] focus:text-[#111] focus:px-3 focus:py-1 focus:rounded focus:outline-none focus:ring-2 focus:ring-[#111] focus:z-50"
      >
        Skip to content
      </a>

      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-8">
        {/* Name — dominant element */}
        <h1 className="text-4xl sm:text-3xl font-semibold leading-tight text-[#111] tracking-normal">
          Mohammad Aatif Shaikh
        </h1>

        {/* Tagline — verbatim from cv.md summary first sentence */}
        <p className="mt-2 text-base font-normal leading-relaxed text-[#111]">
          AI-native builder with security instincts.
        </p>

        {/* Contact row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
          <a
            href="mailto:mohammadaatif@usf.edu"
            className="text-base text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded"
          >
            mohammadaatif@usf.edu
          </a>
          <span className="text-[#555]" aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/shaikhaatif/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
            className="text-base text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded"
          >
            LinkedIn
          </a>
          <span className="text-[#555]" aria-hidden="true">·</span>
          <a
            href="https://github.com/aatif101"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in new tab)"
            className="text-base text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded"
          >
            GitHub
          </a>
          <span className="text-[#555]" aria-hidden="true">·</span>
          <span className="text-sm text-[#555]">Tampa, FL</span>
          <span className="text-[#555]" aria-hidden="true">·</span>
          <span className="text-sm text-[#555]">US (F1 OPT, May 2026) · UAE · India</span>
        </div>

        {/* Nav — hidden on mobile, visible md+ */}
        <nav
          aria-label="Page sections"
          className="hidden md:flex items-center gap-4 mt-4 pt-4 border-t border-[#111]/10"
        >
          <a href="#experience" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Experience</a>
          <a href="#projects" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Projects</a>
          <a href="#education" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Education</a>
          <a href="#skills" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Skills</a>
          <a href="#leadership" className="text-sm font-normal text-[#111] hover:underline focus:outline-none focus:ring-2 focus:ring-[#111] rounded">Leadership</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
```

Design decisions embedded in this implementation:
- `sticky top-0 z-10` — header stays visible while scrolling (NAV-02)
- No border-bottom, no box-shadow, no backdrop-filter on sticky header (DS-03 — no decoration)
- `bg-[#fafaf8]` on header ensures the page background shows through during sticky scroll (not transparent)
- Nav border-t uses `border-[#111]/10` — a very subtle separator at 10% opacity (Tailwind JIT syntax)
- Contact row uses `gap-x-2 gap-y-1` so dots stay horizontally spaced and wraps on mobile have tight vertical gaps
- `aria-hidden="true"` on separator dots — screen readers don't need to announce "dot dot dot"
- All focus rings use `focus:ring-[#111]` — high contrast, matches ink color
  </action>
  <verify>
    <automated>
      node -e "const fs = require('fs'); const h = fs.readFileSync('src/components/Header.js', 'utf8'); const checks = [['sticky top-0 z-10', 'sticky positioning'], ['Mohammad Aatif Shaikh', 'name text'], ['AI-native builder with security instincts', 'tagline'], ['mailto:mohammadaatif@usf.edu', 'email link'], ['linkedin.com/in/shaikhaatif', 'linkedin href'], ['github.com/aatif101', 'github href'], ['Tampa, FL', 'location'], ['F1 OPT, May 2026', 'work auth'], ['aria-label=\"Page sections\"', 'nav aria-label'], ['href=\"#experience\"', 'experience anchor'], ['href=\"#projects\"', 'projects anchor'], ['href=\"#education\"', 'education anchor'], ['href=\"#skills\"', 'skills anchor'], ['href=\"#leadership\"', 'leadership anchor'], ['sr-only focus:not-sr-only', 'skip link'], ['target=\"_blank\"', 'new tab'], ['rel=\"noopener noreferrer\"', 'rel attr'], ['focus:ring-2 focus:ring-[#111]', 'focus ring']]; let pass = true; checks.forEach(([str, name]) => { if (!h.includes(str)) { console.error('FAIL: missing ' + name + ' (' + str + ')'); pass = false; } }); if (pass) console.log('PASS — all checks passed');"
    </automated>
  </verify>
  <acceptance_criteria>
    - `src/components/Header.js` contains `sticky top-0 z-10`
    - `src/components/Header.js` contains `Mohammad Aatif Shaikh`
    - `src/components/Header.js` contains `AI-native builder with security instincts.`
    - `src/components/Header.js` contains `mailto:mohammadaatif@usf.edu`
    - `src/components/Header.js` contains `linkedin.com/in/shaikhaatif`
    - `src/components/Header.js` contains `github.com/aatif101`
    - `src/components/Header.js` contains `Tampa, FL`
    - `src/components/Header.js` contains `F1 OPT, May 2026`
    - `src/components/Header.js` contains `aria-label="Page sections"`
    - `src/components/Header.js` contains `href="#experience"`
    - `src/components/Header.js` contains `href="#projects"`
    - `src/components/Header.js` contains `href="#education"`
    - `src/components/Header.js` contains `href="#skills"`
    - `src/components/Header.js` contains `href="#leadership"`
    - `src/components/Header.js` contains `sr-only focus:not-sr-only`
    - `src/components/Header.js` contains `target="_blank"`
    - `src/components/Header.js` contains `rel="noopener noreferrer"`
    - `src/components/Header.js` does NOT contain `terminal-green`
    - `src/components/Header.js` does NOT contain `cosmic`
    - `src/components/Header.js` does NOT contain `font-mono`
    - `src/components/Header.js` does NOT contain `fixed top-0` (must be sticky, not fixed)
  </acceptance_criteria>
  <done>
Header.js is a complete rebuild. It renders:
- h1 "Mohammad Aatif Shaikh" at text-4xl semibold
- Tagline "AI-native builder with security instincts." as body text
- Contact row with email, LinkedIn (new tab), GitHub (new tab), Tampa FL, work auth note — all separated by · dots in #555
- Nav with 5 section anchors, hidden on mobile
- Skip link as first focusable element
- No terminal, cosmic, mono, or glow CSS anywhere
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Header → External links | LinkedIn and GitHub URLs embedded as hardcoded hrefs — user clicks open third-party sites |
| Header → Email client | mailto: href opens user's email client with pre-filled To address |
| Header → Browser DOM | Sticky header sits above page content in z-index stack |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-04 | Information Disclosure | mailto:mohammadaatif@usf.edu in DOM | accept | Email address is intentionally public — it is a portfolio contact mechanism. No obfuscation needed; spam risk is accepted by the portfolio owner. |
| T-01-05 | Spoofing | External links (LinkedIn, GitHub) — hardcoded URLs | accept | URLs point to known-owner profiles (aatif101, shaikhaatif). No user-supplied URLs; no XSS vector. |
| T-01-06 | Tampering | target="_blank" without rel="noopener noreferrer" | mitigate | Both LinkedIn and GitHub anchor elements include `rel="noopener noreferrer"` — prevents opener access from the new tab. |
| T-01-07 | Elevation of Privilege | Skip link href="#main" — requires #main id on target | accept | If #main is missing (Plan 03 not yet run), the skip link is a no-op, not a security issue. Verified by Plan 03 presence of id="main" on the main element. |
</threat_model>

<verification>
After task completes:

```bash
# Verify all required strings present
node -e "
const fs = require('fs');
const h = fs.readFileSync('src/components/Header.js', 'utf8');
const required = [
  'sticky top-0 z-10',
  'Mohammad Aatif Shaikh',
  'AI-native builder with security instincts.',
  'mailto:mohammadaatif@usf.edu',
  'linkedin.com/in/shaikhaatif',
  'github.com/aatif101',
  'Tampa, FL',
  'F1 OPT, May 2026',
  'sr-only focus:not-sr-only',
  'aria-label=\"Page sections\"',
];
required.forEach(s => { if (!h.includes(s)) console.error('MISSING: ' + s); });
console.log('Verification complete');
"

# Verify no old cosmic/terminal classes
grep -c "cosmic\|terminal\|font-mono\|fixed top-0" src/components/Header.js && echo "FAIL: old classes present" || echo "PASS: clean"
```
</verification>

<success_criteria>
- Header.js exists and exports a React component as default
- Name "Mohammad Aatif Shaikh" is the h1 content
- Tagline matches cv.md first summary sentence exactly: "AI-native builder with security instincts."
- Contact row contains all 5 elements: email, LinkedIn, GitHub, Tampa FL, work auth note
- LinkedIn and GitHub use target="_blank" rel="noopener noreferrer"
- Nav has 5 anchors: #experience, #projects, #education, #skills, #leadership
- Header has sticky top-0 z-10 positioning
- Skip link present with sr-only / focus:not-sr-only pattern
- Zero cosmic, terminal, or mono references
</success_criteria>

<output>
After completion, create `.planning/phases/01-design-system-page-skeleton/01-02-SUMMARY.md`

The summary must record:
- File rebuilt: src/components/Header.js (26 lines old → ~80 lines new)
- Identity displayed: Mohammad Aatif Shaikh, tagline, contacts (email/LinkedIn/GitHub/location/work auth)
- Nav anchors: experience, projects, education, skills, leadership
- Accessibility: skip link, aria-label on nav, aria-hidden on separators, focus rings
- Contacts href values recorded for traceability: mailto:mohammadaatif@usf.edu, linkedin.com/in/shaikhaatif, github.com/aatif101
</output>
