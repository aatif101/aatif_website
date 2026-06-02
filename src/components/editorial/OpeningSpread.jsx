import React from 'react';
import portfolioContent from '../../content/portfolioContent';

/**
 * Opening spread — the lede section of the one-page portfolio.
 * Book-like: no cards, no icons, no gradients, no shadows.
 */
export default function OpeningSpread() {
  const { lede, identity } = portfolioContent;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        backgroundColor: 'var(--color-paper)',
        padding: 'var(--space-32) var(--space-8) var(--space-24)',
        borderBottom: '1px solid var(--color-hairline)',
      }}
    >
      <div data-motion-hero style={{ maxWidth: 'var(--col-prose)', margin: '0 auto' }}>
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
          {lede.eyebrow} &mdash; {identity.location}
        </p>

        <h2
          id="about-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 400,
            lineHeight: 'var(--leading-tight)',
            letterSpacing: 'var(--tracking-tight)',
            color: 'var(--color-ink)',
            margin: '0 0 var(--space-6)',
            maxWidth: '20ch',
          }}
        >
          {lede.title}
        </h2>

        {lede.proof && (
          <ul
            aria-label="Quick proof points"
            style={{
              listStyle: 'none',
              margin: '0 0 var(--space-8)',
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-2) var(--space-4)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-caps)',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}
          >
            {lede.proof.map((point, i) => (
              <li
                key={point}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                }}
              >
                {i > 0 && <span aria-hidden="true" style={{ color: 'var(--color-hairline)' }}>/</span>}
                {point}
              </li>
            ))}
          </ul>
        )}

        {lede.body.map((paragraph) => (
          <p
            key={paragraph}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-prose)',
              color: 'var(--color-ink)',
              maxWidth: '52ch',
              margin: '0 0 var(--space-5)',
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
