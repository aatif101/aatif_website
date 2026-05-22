import React from 'react';

const labelStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  marginBottom: 'var(--space-4)',
};

const headingStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-3xl)',
  fontWeight: 300,
  lineHeight: 'var(--leading-tight)',
  letterSpacing: 'var(--tracking-tight)',
  color: 'var(--color-ink)',
  margin: '0 0 var(--space-16)',
};

/**
 * Reusable editorial section shell.
 * Props:
 *   id        — anchor id for the <section>
 *   label     — small-caps eyebrow label (e.g. "Experience")
 *   heading   — display heading (e.g. "Work")
 *   surface   — "paper" | "surface" (defaults to "paper")
 *   children  — content slot filled by later slices
 */
export default function SectionShell({ id, label, heading, surface = 'paper', children }) {
  const headingId = `${id}-heading`;
  const bg = surface === 'surface' ? 'var(--color-surface)' : 'var(--color-paper)';

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      style={{
        backgroundColor: bg,
        padding: 'var(--space-24) var(--space-8)',
        borderBottom: '1px solid var(--color-hairline)',
      }}
    >
      <div style={{ maxWidth: 'var(--col-prose)', margin: '0 auto' }}>
        <p style={labelStyle}>{label}</p>
        <h2 id={headingId} style={headingStyle}>
          {heading}
        </h2>
        {children}
      </div>
    </section>
  );
}
