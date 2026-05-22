---
phase: 01
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - tailwind.config.js
  - public/index.html
  - src/index.css
  - src/components/MatrixRain.js
  - src/components/FloatingSocialButtons/index.js
  - src/components/FloatingSocialButtons/socialButtonsData.js
  - src/components/HeroSection.js
  - src/components/AboutSection.js
autonomous: true
requirements:
  - DS-01
  - DS-02
  - DS-03
  - DS-04
  - DS-05

must_haves:
  truths:
    - "tailwind.config.js contains no cosmic.* or terminal.* color tokens"
    - "tailwind.config.js contains no fontFamily.mono (JetBrains Mono)"
    - "tailwind.config.js contains no pulse-glow animation or keyframes"
    - "tailwind.config.js declares fontFamily.sans as Inter, colors surface/ink/muted"
    - "public/index.html loads Inter 400+600 from fonts.googleapis.com, not JetBrains Mono"
    - "public/index.html title is Mohammad Aatif Shaikh"
    - "src/index.css body uses font-sans / Inter, background #fafaf8, color #111"
    - "All cosmic-glow, terminal-border, matrix-rain CSS classes removed from index.css"
    - "MatrixRain.js, FloatingSocialButtons/, HeroSection.js, AboutSection.js are deleted"
  artifacts:
    - path: "tailwind.config.js"
      provides: "Design tokens — Inter font, surface/ink/muted colors"
      contains: "fontFamily.*sans.*Inter"
    - path: "public/index.html"
      provides: "Inter Google Fonts CDN link"
      contains: "fonts.googleapis.com/css2?family=Inter"
    - path: "src/index.css"
      provides: "Global base styles — #fafaf8 background, #111 text, smooth scroll"
      contains: "background: #fafaf8"
  key_links:
    - from: "tailwind.config.js"
      to: "src/components/Header.js (Plan 02)"
      via: "font-sans, text-[#111], bg-[#fafaf8] utility classes"
      pattern: "Inter.*system-ui.*sans-serif"
    - from: "public/index.html"
      to: "Browser"
      via: "Google Fonts CDN"
      pattern: "fonts.googleapis.com/css2.*family=Inter"
---

<objective>
Gut the old cosmic/terminal visual layer and establish the Swiss/Bauhaus design system foundation.

Purpose: Before any new components can be built, the old decorative theme must be removed
completely — wrong tokens in tailwind.config.js will corrupt new components, wrong fonts in
index.html will prevent Inter from loading, and old cosmic CSS classes in index.css will leak
into any remaining components.

Output:
- tailwind.config.js: purged of cosmic/terminal tokens, Inter font stack declared, surface/ink/muted color tokens added
- public/index.html: Inter 400+600 loaded from Google Fonts CDN; title updated; theme-color updated
- src/index.css: cosmic/glow/matrix CSS classes removed, body reset to #fafaf8 background, #111 text, Inter font-family
- Four old components deleted: MatrixRain.js, FloatingSocialButtons/ (directory), HeroSection.js, AboutSection.js
</objective>

<execution_context>
@/home/.claude/get-shit-done/workflows/execute-plan.md
@/home/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phase-01-design-system-page-skeleton/01-UI-SPEC.md

<interfaces>
<!-- Current state of files being modified — read before touching anything. -->

tailwind.config.js (current — REMOVE everything below, ADD new tokens):
  REMOVE: colors.cosmic (dark, darker, purple, blue, green, orange, pink)
  REMOVE: colors.terminal (green, amber, red)
  REMOVE: fontFamily.mono (['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'])
  REMOVE: animation['pulse-glow'] and keyframes['pulse-glow'] (entire block)
  ADD:    fontFamily.sans: ['Inter', 'system-ui', 'sans-serif']
  ADD:    colors.surface: '#fafaf8'
  ADD:    colors.ink: '#111111'
  ADD:    colors.muted: '#555555'

public/index.html (current — exact replacements):
  REMOVE: <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  REMOVE: <meta name="theme-color" content="#0a0a0f">
  REMOVE: <title>aatif | Portfolio</title>
  ADD:    <link rel="preconnect" href="https://fonts.googleapis.com">
  ADD:    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ADD:    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  ADD:    <meta name="theme-color" content="#fafaf8">
  ADD:    <title>Mohammad Aatif Shaikh</title>

src/index.css — body block replacement:
  REMOVE: font-family: 'JetBrains Mono', monospace;
  REMOVE: background: linear-gradient(135deg, #0a0a0f 0%, #05050a 100%);
  REMOVE: color: #e5e7eb;
  ADD:    font-family: 'Inter', system-ui, sans-serif;
  ADD:    background-color: #fafaf8;
  ADD:    color: #111111;
  REMOVE entire @layer components block (terminal-border, cosmic-gradient, matrix-rain, cosmic-glow, cosmic-glow-intense, perspective-1000, transform-gpu, animate-scroll)
  REMOVE @keyframes: scroll-horizontal, cosmic-pulse, cosmic-rotate, fadeInUp, cosmic-rotate
  REMOVE .animate-fade-in-up and .animate-pulse class definitions at bottom
  KEEP:   @tailwind base/components/utilities directives
  KEEP:   html { scroll-behavior: smooth; }
  KEEP:   * { margin: 0; padding: 0; box-sizing: border-box; }
  KEEP:   @media (prefers-reduced-motion: reduce) block (but remove animation properties inside it since no animations remain)
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rewrite tailwind.config.js — remove cosmic/terminal tokens, add Inter + design tokens</name>
  <read_first>
    - tailwind.config.js (current state — read the full file to understand all tokens being removed)
    - .planning/phase-01-design-system-page-skeleton/01-UI-SPEC.md (Design System section, Typography section, Color section)
  </read_first>
  <files>tailwind.config.js</files>
  <action>
Rewrite tailwind.config.js completely. The new file must be exactly:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: '#fafaf8',
        ink: '#111111',
        muted: '#555555',
      },
    },
  },
  plugins: [],
}
```

The content glob is unchanged. All cosmic.* tokens, terminal.* tokens, fontFamily.mono (JetBrains Mono), animation.pulse-glow, and keyframes.pulse-glow are GONE. Do not partially remove — rewrite the entire file.
  </action>
  <verify>
    <automated>
      node -e "const c = require('./tailwind.config.js'); const t = c.theme.extend; if (t.colors.cosmic) throw new Error('cosmic tokens still present'); if (t.colors.terminal) throw new Error('terminal tokens still present'); if (t.fontFamily.mono) throw new Error('mono font still present'); if (t.animation) throw new Error('animation still present'); if (!t.fontFamily.sans || !t.fontFamily.sans.includes('Inter')) throw new Error('Inter not added'); if (!t.colors.surface) throw new Error('surface token missing'); if (!t.colors.ink) throw new Error('ink token missing'); console.log('PASS');"
    </automated>
  </verify>
  <acceptance_criteria>
    - `tailwind.config.js` does NOT contain the string `cosmic`
    - `tailwind.config.js` does NOT contain the string `terminal`
    - `tailwind.config.js` does NOT contain the string `JetBrains`
    - `tailwind.config.js` does NOT contain the string `pulse-glow`
    - `tailwind.config.js` contains `'Inter'`
    - `tailwind.config.js` contains `surface: '#fafaf8'`
    - `tailwind.config.js` contains `ink: '#111111'`
    - `tailwind.config.js` contains `muted: '#555555'`
  </acceptance_criteria>
  <done>tailwind.config.js contains only the content array, Inter font-sans, and surface/ink/muted color tokens. No cosmic, terminal, mono, or animation references remain.</done>
</task>

<task type="auto">
  <name>Task 2: Update public/index.html — swap JetBrains Mono for Inter, update title and theme-color</name>
  <read_first>
    - public/index.html (current state — read entire file before editing)
  </read_first>
  <files>public/index.html</files>
  <action>
Rewrite public/index.html completely. The new file must be:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#fafaf8" />
    <meta
      name="description"
      content="Mohammad Aatif Shaikh — AI-native builder with security instincts"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <title>Mohammad Aatif Shaikh</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Changes:
- theme-color: `#0a0a0f` → `#fafaf8`
- JetBrains Mono font link → Inter 400+600 font link (exact URL: `https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap`)
- title: `aatif | Portfolio` → `Mohammad Aatif Shaikh`
- meta description: updated to match portfolio purpose
- preconnect links kept (both googleapis.com and gstatic.com)
  </action>
  <verify>
    <automated>
      node -e "const fs = require('fs'); const html = fs.readFileSync('public/index.html', 'utf8'); if (html.includes('JetBrains')) throw new Error('JetBrains still present'); if (!html.includes('family=Inter:wght@400;600')) throw new Error('Inter font link missing'); if (!html.includes('Mohammad Aatif Shaikh')) throw new Error('title not updated'); if (html.includes('0a0a0f')) throw new Error('old theme-color still present'); console.log('PASS');"
    </automated>
  </verify>
  <acceptance_criteria>
    - `public/index.html` does NOT contain `JetBrains`
    - `public/index.html` contains `fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap`
    - `public/index.html` contains `<title>Mohammad Aatif Shaikh</title>`
    - `public/index.html` contains `theme-color" content="#fafaf8"`
    - `public/index.html` contains `fonts.gstatic.com` preconnect
  </acceptance_criteria>
  <done>public/index.html loads Inter 400+600 from Google Fonts CDN, title is "Mohammad Aatif Shaikh", theme-color is #fafaf8. No JetBrains Mono reference remains.</done>
</task>

<task type="auto">
  <name>Task 3: Rewrite src/index.css — remove all cosmic/glow/matrix CSS, establish clean base</name>
  <read_first>
    - src/index.css (current state — read entire file; it is 154 lines)
    - .planning/phase-01-design-system-page-skeleton/01-UI-SPEC.md (Interaction Contracts section for smooth scroll requirement)
  </read_first>
  <files>src/index.css</files>
  <action>
Rewrite src/index.css completely. The new file must be:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #fafaf8;
    color: #111111;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }
}
```

Remove entirely:
- The entire `@layer components` block (terminal-border, cosmic-gradient, matrix-rain, animate-scroll, cosmic-glow, cosmic-glow-intense, perspective-1000, transform-gpu, and the prefers-reduced-motion media query inside it)
- All @keyframes blocks: scroll-horizontal, cosmic-pulse, cosmic-rotate, fadeInUp, pulse
- .animate-fade-in-up class
- .animate-pulse class

Keep:
- @tailwind base/components/utilities
- @layer base with the * reset, body, and html scroll-behavior
- No other CSS is needed — all styling moves to Tailwind utility classes in components

Do NOT keep the prefers-reduced-motion block — there are no animations to disable. The reduced-motion concern is moot in Phase 1 (no animations exist after cleanup).
  </action>
  <verify>
    <automated>
      node -e "const fs = require('fs'); const css = fs.readFileSync('src/index.css', 'utf8'); const banned = ['cosmic', 'terminal', 'matrix', 'glow', 'JetBrains', 'linear-gradient', '#0a0a0f', '#05050a', 'e5e7eb', 'pulse-glow', 'fadeInUp', 'scroll-horizontal']; banned.forEach(b => { if (css.includes(b)) throw new Error('Found banned string: ' + b); }); if (!css.includes('#fafaf8')) throw new Error('background #fafaf8 missing'); if (!css.includes('scroll-behavior: smooth')) throw new Error('smooth scroll missing'); console.log('PASS');"
    </automated>
  </verify>
  <acceptance_criteria>
    - `src/index.css` does NOT contain `cosmic`
    - `src/index.css` does NOT contain `terminal`
    - `src/index.css` does NOT contain `matrix`
    - `src/index.css` does NOT contain `glow`
    - `src/index.css` does NOT contain `linear-gradient`
    - `src/index.css` does NOT contain `#0a0a0f`
    - `src/index.css` does NOT contain `JetBrains`
    - `src/index.css` contains `background-color: #fafaf8`
    - `src/index.css` contains `color: #111111`
    - `src/index.css` contains `font-family: 'Inter'`
    - `src/index.css` contains `scroll-behavior: smooth`
  </acceptance_criteria>
  <done>src/index.css contains only Tailwind directives and a clean @layer base block. All cosmic/glow/matrix/animation CSS is gone. Body is styled with Inter font, #fafaf8 background, #111111 text.</done>
</task>

<task type="auto">
  <name>Task 4: Delete old components — MatrixRain.js, FloatingSocialButtons/, HeroSection.js, AboutSection.js</name>
  <read_first>
    - src/App.js (current state — understand all current imports before deletion, so you know what to clean up in Plan 03)
    - src/components/HeroSection.js (confirm it imports FloatingSocialButtons — it does; safe to delete both)
  </read_first>
  <files>
    src/components/MatrixRain.js
    src/components/FloatingSocialButtons/index.js
    src/components/FloatingSocialButtons/socialButtonsData.js
    src/components/HeroSection.js
    src/components/AboutSection.js
  </files>
  <action>
Delete the following files. Use the filesystem directly — do not rename or archive:

1. `src/components/MatrixRain.js` — delete
2. `src/components/FloatingSocialButtons/index.js` — delete
3. `src/components/FloatingSocialButtons/socialButtonsData.js` — delete
4. `src/components/FloatingSocialButtons/` directory — remove (will be empty after step 2-3)
5. `src/components/HeroSection.js` — delete
6. `src/components/AboutSection.js` — delete

NOTE: src/App.js still imports MatrixRain, HeroSection, and AboutSection after this task. App.js will be rebuilt in Plan 03 (Wave 3). The app will have broken imports between Plan 01 completion and Plan 03 completion — this is expected and acceptable. The executor for Plan 03 will rewrite App.js to remove these dead imports.

Do NOT attempt to patch App.js in this plan. App.js is owned by Plan 03.
  </action>
  <verify>
    <automated>
      node -e "const fs = require('fs'); const deleted = ['src/components/MatrixRain.js', 'src/components/FloatingSocialButtons/index.js', 'src/components/FloatingSocialButtons/socialButtonsData.js', 'src/components/HeroSection.js', 'src/components/AboutSection.js']; deleted.forEach(f => { if (fs.existsSync(f)) throw new Error('File still exists: ' + f); }); if (fs.existsSync('src/components/FloatingSocialButtons')) throw new Error('FloatingSocialButtons directory still exists'); console.log('PASS');"
    </automated>
  </verify>
  <acceptance_criteria>
    - `src/components/MatrixRain.js` does NOT exist
    - `src/components/FloatingSocialButtons/` directory does NOT exist
    - `src/components/HeroSection.js` does NOT exist
    - `src/components/AboutSection.js` does NOT exist
  </acceptance_criteria>
  <done>All four old decorative/replaced components are deleted. The FloatingSocialButtons directory is removed. The app has broken imports in App.js — that is intentional; Plan 03 fixes App.js.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| CDN → Browser | Inter font loaded from fonts.googleapis.com — external resource |
| Build → Filesystem | tailwind.config.js content glob determines which files are scanned |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01 | Tampering | Google Fonts CDN link in index.html | accept | CDN is Google-operated; Inter is a widely-used open-source font. No SRI hash added because CRA doesn't support it in this configuration and font integrity failures would degrade UX rather than compromise security. |
| T-01-02 | Information Disclosure | tailwind.config.js content glob `./src/**/*.{js,jsx,ts,tsx}` | accept | Glob only affects build-time CSS purging; no runtime security surface. |
| T-01-03 | Denial of Service | Fonts failing to load from CDN | accept | Tailwind font stack falls back to `system-ui, sans-serif` — readable fallback, no data loss. |
</threat_model>

<verification>
After all four tasks complete:

```bash
# Verify no banned tokens in tailwind
node -e "const c = require('./tailwind.config.js'); const s = JSON.stringify(c); ['cosmic','terminal','JetBrains','pulse-glow'].forEach(b => { if (s.includes(b)) throw new Error('FAIL: ' + b + ' in tailwind.config.js'); }); console.log('tailwind.config.js: PASS');"

# Verify Inter in index.html
grep -c "family=Inter:wght@400;600" public/index.html

# Verify clean index.css
grep -c "fafaf8" src/index.css

# Verify deleted components
ls src/components/ | grep -E "MatrixRain|FloatingSocialButtons|HeroSection|AboutSection" && echo "FAIL: files remain" || echo "PASS: files deleted"
```
</verification>

<success_criteria>
- tailwind.config.js: zero cosmic/terminal/mono/pulse-glow references; Inter + surface/ink/muted declared
- public/index.html: Inter 400+600 loaded; title = "Mohammad Aatif Shaikh"; theme-color = #fafaf8
- src/index.css: body background #fafaf8, color #111111, font Inter; no cosmic/glow/matrix CSS
- MatrixRain.js, FloatingSocialButtons/, HeroSection.js, AboutSection.js: all deleted from filesystem
</success_criteria>

<output>
After completion, create `.planning/phases/01-design-system-page-skeleton/01-01-SUMMARY.md`

The summary must record:
- Files modified: tailwind.config.js, public/index.html, src/index.css
- Files deleted: MatrixRain.js, FloatingSocialButtons/ (2 files + dir), HeroSection.js, AboutSection.js
- Tokens added: surface:#fafaf8, ink:#111111, muted:#555555, fontFamily.sans:Inter
- Tokens removed: all cosmic.*, terminal.*, fontFamily.mono, animation.pulse-glow, keyframes.pulse-glow
- Known state: App.js has broken imports (MatrixRain, HeroSection, AboutSection) — fixed in Plan 03
</output>
