import React from 'react';

const spreadStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(8rem, 0.45fr) minmax(0, 1fr)',
  gap: 'var(--space-8)',
  padding: 'var(--space-12) 0',
  borderTop: '1px solid var(--color-hairline)',
};

const metaStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  lineHeight: 'var(--leading-loose)',
};

const titleStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-2xl)',
  fontWeight: 300,
  lineHeight: 'var(--leading-tight)',
  letterSpacing: 'var(--tracking-tight)',
  color: 'var(--color-ink)',
  margin: '0 0 var(--space-4)',
};

const bodyStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-md)',
  lineHeight: 'var(--leading-prose)',
  color: 'var(--color-ink)',
  margin: '0 0 var(--space-6)',
};

export default function SelectedWork({ works }) {
  return (
    <div aria-label="Pinned selected work">
      {works.map((work, index) => (
        <article key={work.id} className="editorial-work-spread" style={spreadStyle}>
          <aside style={metaStyle} aria-label={`${work.name} metadata`}>
            <div className="editorial-tabular">{String(index + 1).padStart(2, '0')}</div>
            <div>{work.role}</div>
            <div>{work.status}</div>
          </aside>

          <div>
            <p style={{ ...metaStyle, color: 'var(--color-oxblood)', margin: '0 0 var(--space-3)' }}>
              {work.name}
            </p>
            <h3 style={titleStyle}>
              {work.href ? (
                <a
                  className="editorial-text-link"
                  href={work.href}
                  style={{ color: 'inherit', textDecorationColor: 'var(--color-oxblood)' }}
                >
                  {work.title}
                </a>
              ) : (
                work.title
              )}
            </h3>
            <p style={bodyStyle}>{work.summary}</p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gap: 'var(--space-3)',
              }}
            >
              {work.details.map((detail) => (
                <li
                  key={detail}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--color-muted)',
                  }}
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
