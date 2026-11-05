# Portfolio redesign: handoff spec

Owner: Aatif Shaikh (github.com/aatif101). Repo: `aatif_website`, currently deployed at https://aatif101.github.io/aatif_website.

This file is the source of truth for the redesign. `reference/index.html` is a static mockup of the approved design (light mode, orange accent). Open it in a browser and match it. `reference/mockup-source.dc.html` is the original design source, including the dark-mode values.

---

## 0. Prompt to paste into Codex

> Read `REDESIGN.md` and open `reference/index.html` in a browser. Rebuild this repo's site to match that mockup exactly, following every section of the spec: the content, design tokens, dark mode, responsiveness, accessibility, meta/OG tags, and what to remove. First inspect `package.json` and the existing deploy setup, and keep the current stack and GitHub Pages deploy working. Do not invent content: every word on the site comes from section 3. Where the spec says [PLACEHOLDER], leave a visible TODO and list it in your final summary. Work on a new branch, run the build, check the page at 1440px and 390px wide, and show me the result before deploying. Don't delete `.planning`, `.kiro`, `.gsd*`, or other non-site folders. Ask me before deleting anything outside `src/` and `public/`.

---

## 1. Goal

One page whose job is to get a recruiter from "who's this" to clicking a live project in under 30 seconds. Show the work; don't describe the person. Product-first: project cards with real visuals, one number each, and two links.

## 2. Remove from the current site (all of it)

- Matrix rain, orbiting logos, cosmic/terminal theme, Framer Motion leftovers
- The GitHub activity "ledger" and the GitHub API integration. It goes stale; it was frozen at May 23, 2026.
- The Timeline entries **"Open Source Contributor, Mozilla"** and **"Open Source Contributor, Infrastructure Docs Collective"**. Remove completely.
- The Meta MLH fellowship / medical line
- The old hero ("I build AI systems, security tools…", "NazScan, 63 commits", "Vision desktop agent")
- `mohammadaatif@usf.edu` everywhere. Replace with **smatif.t@gmail.com**.
- Rewrite the repo `README.md`. It's the original template text; describe the actual site in 5 lines.

## 3. Content (use verbatim)

### Nav
Left: a 10px orange square, then **Aatif Shaikh** (links to top). Right: Work · Experience · GitHub · Email. Hide the right-side links under 760px.

### Hero
- Row: circular photo (64px, `reference/photo.jpg`, object-position 50% 38%, 1px border) next to **Aatif Shaikh** / `CS @ USF · Graduating Dec 2026 · Tampa, FL` (mono, muted)
- H1: **I build AI systems that hold up with real users on them.**
- Paragraph: I’ve learned a lot shipping projects solo, but I've hit the ceiling of what I can learn building alone. I'm looking for a team where I can work on someone else's hard problem, next to engineers who are better than me. Open to new-grad AI engineering roles starting early 2027.
- Buttons: **Email me** (filled accent → mailto:smatif.t@gmail.com) · **Resume** (→ `/resume.pdf`, updated November 2026 resume) · **GitHub** (github.com/aatif101) · **LinkedIn** (linkedin.com/in/shaikhaatif)

### Selected work (2×2 grid; 1 column under 760px)

Each card: a visual (280px tall) · title + stat pill · description · mono stack line · links.

1. **Easy-A**, pill `2,400+ page views, month one`
   - Visual: Easy-A screenshot, top-left aligned, `object-fit: cover`. Retake a clean screenshot of easya.fyi without the scrollbar (the one in `reference/` shows one).
   - Text: See which USF professors give the most A's in every class, compare everyone who's taught it, check open seats, and copy the CRN. Built with Kanishk Singh Chauhan and launched for spring registration.
   - Stack: React · FastAPI · PostgreSQL
   - Links: Live site ↗ https://easya.fyi · Code ↗ https://github.com/aatif101/easy-A
2. **Microsoft PyRIT**, pill `Merged · PR #3471`
   - Visual: dark code panel (#0D1117) showing this exact repro output, "caught" in #3FB950 and "MISSED" in #FF7B72:
     ```
     $ python repro.py   # before the fix
     --- CONTROL ---
     caught  inline image
     caught  full reference image
     caught  shortcut ref + query exfil
     --- SUSPECTED ---
     MISSED  shortcut ref + path exfil
     MISSED  raw HTML img
     ```
   - Text: Found two zero-click data-exfiltration paths that the MarkdownInjectionScorer in Microsoft's AI red-teaming toolkit missed. Filed the bug with a repro, wrote the fix and tests, and got it reviewed and merged.
   - Stack: Python · Regex · pytest
   - Links: Pull request ↗ https://github.com/microsoft/PyRIT/pull/3471 · Issue ↗ https://github.com/microsoft/PyRIT/issues/3343
3. **Pharma document AI**, pill `97.9% table extraction`
   - Visual: pipeline of chips: Supplier PDF → Docling parse → VLM extract → Critic check → **Evidence gate** (accent outline), then a row: confident → cited field · unsure → human review (dashed)
   - Text: Pfizer project through Extern. Turns messy supplier PDFs into structured, cited data, and sends anything it isn't sure about to a person instead of guessing. Benchmarked on F1, latency and cost.
   - Stack: LangGraph · ColQwen2 · Qdrant · BM25 · Langfuse
   - Links: Code ↗ https://github.com/aatif101/pfizer-externship
4. **Car-sales agent**, pill `5 tools · 1 loop`
   - Visual: user bubble "any white SUVs under 20k?" (accent fill) → mono tool-call box `search_inventory(body_type="suv", color="white", price_max=20000)` → check icon + "every price re-checked in code before it's sent"
   - Text: A chat agent over ~100 real used-car listings. The model only turns messages into tool calls; a deterministic check verifies every price it quotes, guardrails live in code rather than the prompt, and returning users are remembered across sessions.
   - Stack: FastAPI · Gemini via LiteLLM · SQLite · Streamlit
   - Links: Code ↗ https://github.com/aatif101/dubizzle-car-agent

### More work (bordered list under the grid)
- **SPOTlight**: Knight Hacks, team of 4. Fine-tuned a 421M ModernBERT on AMD ROCm to triage robot inspection events. → `0.805 macro-F1 ↗` https://devpost.com/software/spotlightdog
- **NazScan**: Async Python CLI that scans web apps for common vulnerabilities, built to check AI-generated apps. → `in progress ↗` https://github.com/aatif101/nazscan
- **Reliu**: Health and habit-tracking app for a founder, built with React, TypeScript and Supabase. → `TestFlight in 72 hours` (no link)

### Experience (role · org on the left, mono dates on the right)
- Automation Intern · USF IT, **Sep 2026 – now**: Started as an AV tech, spotted a gap in how jobs were dispatched, built the fix. Now runs AV dispatch and handoffs for 20+ users.
- AI/ML Extern · Pfizer project, via Extern, **Apr – Oct 2026**: Pharmaceutical document intelligence: extraction, hybrid retrieval, eval harness.
- Full Stack Developer · Reliu, **Mar – May 2026**: Freelance build for a founder, blank repo to TestFlight.
- AI/ML Intern · Cache AI, **May – Aug 2025**: LLM evaluation and retrieval workflows, latency and cost tracking, CI with Docker and GitHub Actions.
- B.S. Computer Science · University of South Florida, **Dec 2026**: Bellini College of AI, Cybersecurity and Computing. GPA 3.6.

### Footer
"Working on something hard? Let's talk." + smatif.t@gmail.com (mono, accent text) · right: GitHub · LinkedIn · Easy-A

## 4. Design tokens

- Fonts: **Geist** (400/500/600/700) for text, **Geist Mono** (400/500) for labels, pills, stacks, and dates. Google Fonts.
- Layout: max-width 1080px, 24px side padding. Hero padding 96px top / 80px bottom. Sections 96px apart. Card radius 14px, buttons 8px, pills fully rounded. Grid gap 24px.
- Type: H1 3.5rem / 1.05 / 600 / -0.035em (2.25rem under 760px). Body 18px hero, 15px cards. Section labels 13px mono, uppercase, letter-spacing 0.08em, muted.

| Token | Light | Dark |
|---|---|---|
| bg | #FFFFFF | #0A0A0A |
| text | #0A0A0A | #EDEDED |
| muted | #5B5B5B | #A3A3A3 |
| border | #E6E6E6 | #262626 |
| card | #FFFFFF | #111111 |
| panel | #F7F7F7 | #161616 |
| accent (fills only) | #FF5A1F | #FF6B2C |
| on-accent text | #0A0A0A | #0A0A0A |
| accent-soft (pill bg) | #FFE9DD | #2A140A |
| accent-text (links, pill text) | #B83A00 | #FF6B2C |

**Accent rule:** bright orange `#FF5A1F` is for **fills only**: the Email button, the chat bubble, the nav square, the pill background tint. Never use it as text on white; that's 3.1:1 and fails WCAG AA. Links and pill text use `#B83A00` (5.8:1). Keep the accent rare; that's what makes it stand out.

**Dark mode:** follow `prefers-color-scheme`, plus a small toggle in the nav that persists to localStorage (wrapped in try/catch).

## 5. Quality bar

- Responsive: no horizontal scroll at 390px; cards stack; nav links hide.
- Accessible: real `<a href>`; alt text on both images; decorative SVGs `aria-hidden`; all text ≥ 4.5:1; visible focus styles; touch targets ≥ 44px.
- Performance: no animation libraries; images compressed (WebP or optimized PNG/JPG); Lighthouse ≥ 95 on all four categories.
- Meta: `<title>Aatif Shaikh · AI engineer</title>`, a meta description built from the hero line, canonical URL, an orange-square favicon, and **Open Graph + Twitter card tags with a 1200×630 OG image** (name + H1 on white, orange square). That gives every shared link a real preview.

## 6. Decisions for Aatif (Codex: ask, don't decide)

1. **URL.** Either rename the repo to `aatif101.github.io` (free; the site moves to the root URL) or buy a domain like aatifshaikh.dev (~$12/yr) and set a CNAME. Either way, update the website link on LinkedIn and GitHub afterward. Both currently point to `/aatif_website`.
2. **Resume PDF.** Put the updated one at `public/resume.pdf`.
3. **Name.** The site uses "Aatif Shaikh" to match LinkedIn; the resume says "Mohammad Aatif Shaikh". Pick one everywhere.

---

## 7. Everything else to update online (Aatif's checklist, not Codex's)

Done today: **LinkedIn** (headline, About, experience, projects, featured, reposts), **GitHub** (avatar, bio, README, pins, 7 repos private, nazscan rename, descriptions).

**Do next, in order:**
1. **Resume PDF.** Pfizer → Apr–Oct 2026; automation role start date matches LinkedIn (Sep); add the PyRIT merged PR; Easy-A launch numbers; one name. Then re-upload it to LinkedIn Featured and every job site below.
2. **Website.** This spec.
3. **Handshake.** USF recruiters and campus employers search here. Mirror LinkedIn, upload the new resume, set job preferences for AI/SWE new grad, Jan 2027 start.
4. **YC Work at a Startup** (workatastartup.com). One profile reaches every YC company. Lead with Easy-A and PyRIT, and set it to actively looking.
5. **Wellfound.** Same content, plus salary/location/remote preferences; mark yourself open.
6. **Simplify.** Autofill profile for applications; keep it identical to the resume.
7. **X / Twitter.** Bio = LinkedIn headline, link to the website, the same photo; pin a post about Easy-A or the PyRIT fix.
8. **Devpost.** Add SPOTlight and past hackathons, set the photo and bio, link GitHub and the website.
9. **Hugging Face** (optional, good for AI roles). Profile with photo/bio; publish the fine-tuned SPOTlight ModernBERT if you can share it.

**Loose ends from today:**
- LinkedIn: delete the Power BI cert and the Courses section; swap the Featured resume once it's fixed; check the Cache AI company logo.
- GitHub: delete the `dozzle`, `AFFiNE`, and `course_work_ui` forks (Settings → Delete); write a README for `nazscan` and gitignore `.claude/`, `.planning/`, `naz-gsd-context.md`, `output.json`.
- Easy-A: add an `og:image` so shares show a preview.
- Anywhere that still shows the @usf.edu email (GitHub commits email, Devpost, Handshake): switch to smatif.t@gmail.com before December.
- Post on LinkedIn about the PyRIT fix, which is still unwritten.
