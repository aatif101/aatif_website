import React from 'react';
import { useEditorialMotion } from '../hooks/useEditorialMotion';
import portfolioContent from '../content/portfolioContent';
import OpeningSpread from './editorial/OpeningSpread';
import SectionShell from './editorial/SectionShell';
import SelectedWork from './editorial/SelectedWork';
import GitHubActivity from './editorial/GitHubActivity';
import ExperienceTimeline from './editorial/ExperienceTimeline';
import Colophon from './editorial/Colophon';

export default function EditorialPortfolio() {
  useEditorialMotion();

  const { identity, selectedWork, experience, education, leadership, contact } = portfolioContent;

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
        data-motion-hero
        style={{
          backgroundColor: 'var(--color-paper)',
          borderBottom: '1px solid var(--color-hairline)',
          padding: 'var(--space-6) var(--space-8)',
        }}
      >
        <div
          className="editorial-header-inner"
          style={{
            maxWidth: 'var(--col-wide)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
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
            {identity.name}
          </h1>
          <nav
            className="editorial-nav"
            aria-label="Page sections"
            style={{
              marginLeft: 'auto',
              display: 'flex',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
          >
            {[
              ['About', '#about'],
              ['Selected work', '#selected-work'],
              ['GitHub', '#github-activity'],
              ['Timeline', '#timeline'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a
                className="editorial-nav-link"
                key={label}
                href={href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-wide)',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                  padding: '0 var(--space-2)',
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

        <SectionShell
          id="selected-work"
          label="Selected work"
          heading="Things I've built"
          surface="surface"
          motionReveal
        >
          <SelectedWork works={selectedWork} />
        </SectionShell>

        <section
          id="github-activity"
          className="editorial-ledger-section"
          aria-labelledby="github-activity-heading"
          data-motion-reveal
          style={{
            backgroundColor: 'var(--color-paper)',
            padding: 'var(--space-24) var(--space-8)',
            borderBottom: '1px solid var(--color-hairline)',
          }}
        >
          <div style={{ maxWidth: 'var(--col-wide)', margin: '0 auto' }}>
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
              GitHub activity
            </p>
            <h2
              id="github-activity-heading"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 300,
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--color-ink)',
                margin: '0 0 var(--space-16)',
              }}
            >
              What I'm doing on GitHub
            </h2>
            <GitHubActivity />
          </div>
        </section>

        <SectionShell
          id="timeline"
          label="Timeline"
          heading="Experience, education, leadership"
          surface="paper"
          motionReveal
        >
          <ExperienceTimeline
            experience={experience}
            education={education}
            leadership={leadership}
          />
        </SectionShell>
      </main>

      {/* ── Footer / colophon ───────────────────────────────────────────────── */}
      <Colophon identity={identity} contact={contact} />
    </>
  );
}
