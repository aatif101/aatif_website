import React from 'react';

export default function EditorialPortfolio() {
  return (
    <>
      {/* Accessible skip link — positioned off-screen until focused */}
      <a
        href="#main"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* ── Name corner / identity header ───────────────────────────────────── */}
      <header
        id="top"
        aria-label="Site identity"
        style={{
          backgroundColor: 'var(--color-paper)',
          borderBottom: '1px solid var(--color-hairline)',
          padding: 'var(--space-6) var(--space-8)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--col-wide)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--space-4)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}
          >
            Portfolio
          </span>
          <h1
            data-identity
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 400,
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--color-ink)',
              lineHeight: 'var(--leading-tight)',
              margin: 0,
            }}
          >
            Aatif Siddiqui
          </h1>
          <nav
            aria-label="Page sections"
            style={{
              marginLeft: 'auto',
              display: 'flex',
              gap: 'var(--space-6)',
            }}
          >
            {['About', 'Experience', 'Projects', 'Education', 'Skills'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-wide)',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-base)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <main id="main" tabIndex={-1}>

        {/* Opening spread / lede ─────────────────────────────────────────── */}
        <section
          id="about"
          aria-labelledby="about-heading"
          style={{
            backgroundColor: 'var(--color-paper)',
            padding: 'var(--space-32) var(--space-8) var(--space-24)',
            borderBottom: '1px solid var(--color-hairline)',
          }}
        >
          <div style={{ maxWidth: 'var(--col-prose)', margin: '0 auto' }}>
            {/* Issue label */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-caps)',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                marginBottom: 'var(--space-8)',
              }}
            >
              Software Engineer &mdash; Toronto, Canada
            </p>

            {/* Display lede */}
            <h2
              id="about-heading"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 300,
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--color-ink)',
                margin: '0 0 var(--space-8)',
              }}
            >
              Building things that feel&nbsp;right.
            </h2>

            {/* Lede paragraph */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                lineHeight: 'var(--leading-prose)',
                color: 'var(--color-ink)',
                maxWidth: '52ch',
                margin: 0,
              }}
            >
              {/* Placeholder — detailed bio added in later slice */}
              Full-stack developer with a focus on clean interfaces, thoughtful systems, and work that
              holds up.
            </p>
          </div>
        </section>

        {/* Experience ─────────────────────────────────────────────────────── */}
        <section
          id="experience"
          aria-labelledby="experience-heading"
          style={{
            backgroundColor: 'var(--color-paper)',
            padding: 'var(--space-24) var(--space-8)',
            borderBottom: '1px solid var(--color-hairline)',
          }}
        >
          <div style={{ maxWidth: 'var(--col-prose)', margin: '0 auto' }}>
            <SectionLabel>Experience</SectionLabel>
            <h2
              id="experience-heading"
              style={sectionHeadingStyle}
            >
              Work
            </h2>
            {/* Content slot — filled by later slice */}
          </div>
        </section>

        {/* Projects ───────────────────────────────────────────────────────── */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          style={{
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--space-24) var(--space-8)',
            borderBottom: '1px solid var(--color-hairline)',
          }}
        >
          <div style={{ maxWidth: 'var(--col-prose)', margin: '0 auto' }}>
            <SectionLabel>Projects</SectionLabel>
            <h2
              id="projects-heading"
              style={sectionHeadingStyle}
            >
              Selected work
            </h2>
            {/* Content slot — filled by later slice */}
          </div>
        </section>

        {/* Education ──────────────────────────────────────────────────────── */}
        <section
          id="education"
          aria-labelledby="education-heading"
          style={{
            backgroundColor: 'var(--color-paper)',
            padding: 'var(--space-24) var(--space-8)',
            borderBottom: '1px solid var(--color-hairline)',
          }}
        >
          <div style={{ maxWidth: 'var(--col-prose)', margin: '0 auto' }}>
            <SectionLabel>Education</SectionLabel>
            <h2
              id="education-heading"
              style={sectionHeadingStyle}
            >
              Formation
            </h2>
            {/* Content slot — filled by later slice */}
          </div>
        </section>

        {/* Skills ─────────────────────────────────────────────────────────── */}
        <section
          id="skills"
          aria-labelledby="skills-heading"
          style={{
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--space-24) var(--space-8)',
          }}
        >
          <div style={{ maxWidth: 'var(--col-prose)', margin: '0 auto' }}>
            <SectionLabel>Skills</SectionLabel>
            <h2
              id="skills-heading"
              style={sectionHeadingStyle}
            >
              Craft
            </h2>
            {/* Content slot — filled by later slice */}
          </div>
        </section>

      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer
        aria-label="Site footer"
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-faint)',
          padding: 'var(--space-12) var(--space-8)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wide)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Aatif Siddiqui &mdash; {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: 'var(--space-4)',
      }}
    >
      {children}
    </p>
  );
}

const sectionHeadingStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-3xl)',
  fontWeight: 300,
  lineHeight: 'var(--leading-tight)',
  letterSpacing: 'var(--tracking-tight)',
  color: 'var(--color-ink)',
  margin: '0 0 var(--space-16)',
};
