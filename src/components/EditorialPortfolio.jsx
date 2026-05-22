import React from 'react';
import OpeningSpread from './editorial/OpeningSpread';
import SectionShell from './editorial/SectionShell';

export default function EditorialPortfolio() {
  return (
    <>
      {/* Accessible skip link — positioned off-screen until focused */}
      <a href="#main" className="skip-link">
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
        <OpeningSpread />

        <SectionShell id="experience" label="Experience" heading="Work" surface="paper" />

        <SectionShell id="projects" label="Projects" heading="Selected work" surface="surface" />

        <SectionShell id="education" label="Education" heading="Formation" surface="paper" />

        <SectionShell id="skills" label="Skills" heading="Craft" surface="surface" />
      </main>

      {/* ── Footer / colophon ───────────────────────────────────────────────── */}
      <footer
        aria-label="Colophon"
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
