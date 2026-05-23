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
            fontSize: 'var(--text-4xl)',
            fontWeight: 300,
            lineHeight: 'var(--leading-tight)',
            letterSpacing: 'var(--tracking-tight)',
            color: 'var(--color-ink)',
            margin: '0 0 var(--space-8)',
          }}
        >
          {lede.title}
        </h2>

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
