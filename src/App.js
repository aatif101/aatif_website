import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="masthead" id="top">
      <div className="bar">
        <a className="brand" href="#top">
          <span aria-hidden="true" className="mark"></span>
          Mohammad Aatif Shaikh
        </a>
        <nav aria-label="Primary" className="navlinks">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="https://github.com/aatif101">GitHub</a>
          <a href="mailto:smatif.t@gmail.com">Email</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="identity">
        <img
          alt="Mohammad Aatif Shaikh"
          className="portrait"
          src={process.env.PUBLIC_URL + "/portrait.webp"}
        />
        <div className="details">
          <span className="name">Mohammad Aatif Shaikh</span>
          <span className="byline">
            CS @ USF · Graduating Dec 2026 · Tampa, FL
          </span>
        </div>
      </div>
      <h1 className="h1 headline">
        I build AI systems that hold up with real users on them.
      </h1>
      <p className="intro">
        I’ve learned a lot shipping projects solo, but I've hit the ceiling of
        what I can learn building alone. I'm looking for a team where I can work
        on someone else's hard problem, next to engineers who are better than
        me. Open to new-grad AI engineering roles starting early 2027.
      </p>
      <div className="actions">
        <a className="primary" href="mailto:smatif.t@gmail.com">
          Email me
        </a>
        <a className="button" href={process.env.PUBLIC_URL + "/resume.pdf"}>
          Resume
        </a>
        <a className="button" href="https://github.com/aatif101">
          GitHub
        </a>
        <a className="button" href="https://www.linkedin.com/in/shaikhaatif/">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="section" id="work">
      <h2 className="label">Selected work</h2>
      <div className="g2 grid">
        <article className="card">
          <div className="vis screenshot">
            <img
              alt="Easy-A search page showing a USF class with a 95% A rate"
              className="project-image"
              src={process.env.PUBLIC_URL + "/easy-a.webp"}
            />
          </div>
          <div className="card-body">
            <div className="row card-heading">
              <h3 className="title">Easy-A</h3>
              <span className="pill">2,400+ page views, month one</span>
            </div>
            <p className="description">
              See which USF professors give the most A's in every class, compare
              everyone who's taught it, check open seats, and copy the CRN.
              Built with Kanishk Singh Chauhan and launched for spring
              registration.
            </p>
            <p className="stack">React · FastAPI · PostgreSQL</p>
            <div className="project-links">
              <a href="https://easya.fyi">Live site ↗</a>
              <a href="https://github.com/aatif101/easy-A">Code ↗</a>
            </div>
          </div>
        </article>
        <article className="card">
          <div className="vis terminal">
            <span className="command">{"$ python repro.py   # before the fix"}</span>
            <span className="command">--- CONTROL ---</span>
            <span>
              <span className="caught">caught</span>{"  "}inline image
            </span>
            <span>
              <span className="caught">caught</span>{"  "}full reference image
            </span>
            <span>
              <span className="caught">caught</span>{"  "}shortcut ref + query exfil
            </span>
            <span className="command">--- SUSPECTED ---</span>
            <span>
              <span className="missed">MISSED</span>{"  "}shortcut ref + path exfil
            </span>
            <span>
              <span className="missed">MISSED</span>{"  "}raw HTML img
            </span>
          </div>
          <div className="card-body">
            <div className="row card-heading">
              <h3 className="title">Microsoft PyRIT</h3>
              <span className="pill">Merged · PR #3471</span>
            </div>
            <p className="description">
              Found two zero-click data-exfiltration paths that the
              MarkdownInjectionScorer in Microsoft's AI red-teaming toolkit
              missed. Filed the bug with a repro, wrote the fix and tests, and
              got it reviewed and merged.
            </p>
            <p className="stack">Python · Regex · pytest</p>
            <div className="project-links">
              <a href="https://github.com/microsoft/PyRIT/pull/3471">
                Pull request ↗
              </a>
              <a href="https://github.com/microsoft/PyRIT/issues/3343">
                Issue ↗
              </a>
            </div>
          </div>
        </article>
        <article className="card">
          <div className="vis pipeline">
            <div className="chip-row">
              <span className="chip">Supplier PDF</span>
              <span aria-hidden="true" className="muted">
                →
              </span>
              <span className="chip">Docling parse</span>
              <span aria-hidden="true" className="muted">
                →
              </span>
              <span className="chip">VLM extract</span>
            </div>
            <div className="chip-row">
              <span aria-hidden="true" className="muted">
                →
              </span>
              <span className="chip">Critic check</span>
              <span aria-hidden="true" className="muted">
                →
              </span>
              <span className="gate">Evidence gate</span>
            </div>
            <div className="outcomes">
              <span className="muted">confident →</span>
              <span className="chip">cited field</span>
              <span className="muted">unsure →</span>
              <span className="review">human review</span>
            </div>
          </div>
          <div className="card-body">
            <div className="row card-heading">
              <h3 className="title">Pharma document AI</h3>
              <span className="pill">97.9% table extraction</span>
            </div>
            <p className="description">
              Pfizer project through Extern. Turns messy supplier PDFs into
              structured, cited data, and sends anything it isn't sure about to
              a person instead of guessing. Benchmarked on F1, latency and cost.
            </p>
            <p className="stack">
              LangGraph · ColQwen2 · Qdrant · BM25 · Langfuse
            </p>
            <div className="project-links">
              <a href="https://github.com/aatif101/pfizer-externship">Code ↗</a>
            </div>
          </div>
        </article>
        <article className="card">
          <div className="vis chat">
            <div className="bubble">any white SUVs under 20k?</div>
            <div className="tool">
              search_inventory(body_type="suv",
              <br />
              color="white", price_max=20000)
            </div>
            <div className="verified">
              <svg
                aria-hidden="true"
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                width="14"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
              <span>every price re-checked in code before it's sent</span>
            </div>
          </div>
          <div className="card-body">
            <div className="row card-heading">
              <h3 className="title">Car-sales agent</h3>
              <span className="pill">5 tools · 1 loop</span>
            </div>
            <p className="description">
              A chat agent over ~100 real used-car listings. The model only
              turns messages into tool calls; a deterministic check verifies
              every price it quotes, guardrails live in code rather than the
              prompt, and returning users are remembered across sessions.
            </p>
            <p className="stack">
              FastAPI · Gemini via LiteLLM · SQLite · Streamlit
            </p>
            <div className="project-links">
              <a href="https://github.com/aatif101/dubizzle-car-agent">
                Code ↗
              </a>
            </div>
          </div>
        </article>
      </div>
      <div className="more">
        <div className="row list-row">
          <div className="details">
            <span className="item-name">SPOTlight</span>
            <span className="item-description">
              Knight Hacks, team of 4. Fine-tuned a 421M ModernBERT on AMD ROCm
              to triage robot inspection events.
            </span>
          </div>
          <a
            className="outcome"
            href="https://devpost.com/software/spotlightdog"
          >
            0.805 macro-F1 ↗
          </a>
        </div>
        <div className="row list-row">
          <div className="details">
            <span className="item-name">NazScan</span>
            <span className="item-description">
              Async Python CLI that scans web apps for common vulnerabilities,
              built to check AI-generated apps.
            </span>
          </div>
          <a className="outcome" href="https://github.com/aatif101/nazscan">
            in progress ↗
          </a>
        </div>
        <div className="row list-row">
          <div className="details">
            <span className="item-name">Reliu</span>
            <span className="item-description">
              Health and habit-tracking app for a founder, built with React,
              TypeScript and Supabase.
            </span>
          </div>
          <span className="metric">TestFlight in 72 hours</span>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section" id="experience">
      <h2 className="label">Experience</h2>
      <div className="entries">
        <div className="row job">
          <div className="details">
            <span className="item-name">Automation Intern · USF IT</span>
            <span className="item-description">
              Started as an AV tech, spotted a gap in how jobs were dispatched,
              built the fix. Now runs AV dispatch and handoffs for 20+ users.
            </span>
          </div>
          <span className="date">Sep 2026 – now</span>
        </div>
        <div className="row job">
          <div className="details">
            <span className="item-name">
              AI/ML Extern · Pfizer project, via Extern
            </span>
            <span className="item-description">
              Pharmaceutical document intelligence: extraction, hybrid
              retrieval, eval harness.
            </span>
          </div>
          <span className="date">Apr – Oct 2026</span>
        </div>
        <div className="row job">
          <div className="details">
            <span className="item-name">Full Stack Developer · Reliu</span>
            <span className="item-description">
              Freelance build for a founder, blank repo to TestFlight.
            </span>
          </div>
          <span className="date">Mar – May 2026</span>
        </div>
        <div className="row job">
          <div className="details">
            <span className="item-name">AI/ML Intern · Cache AI</span>
            <span className="item-description">
              LLM evaluation and retrieval workflows, latency and cost tracking,
              CI with Docker and GitHub Actions.
            </span>
          </div>
          <span className="date">May – Aug 2025</span>
        </div>
        <div className="row job">
          <div className="details">
            <span className="item-name">
              B.S. Computer Science · University of South Florida
            </span>
            <span className="item-description">
              Bellini College of AI, Cybersecurity and Computing. GPA 3.6.
            </span>
          </div>
          <span className="date">Dec 2026</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="row footer-inner">
        <div className="contact">
          <span className="invitation">
            Working on something hard? Let's talk.
          </span>
          <a className="email" href="mailto:smatif.t@gmail.com">
            smatif.t@gmail.com
          </a>
        </div>
        <div className="social">
          <a href="https://github.com/aatif101">GitHub</a>
          <a href="https://www.linkedin.com/in/shaikhaatif/">LinkedIn</a>
          <a href="https://easya.fyi">Easy-A</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="site">
      <Header />
      <main className="container">
        <Hero />
        <Work />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
