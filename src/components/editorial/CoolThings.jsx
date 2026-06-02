import React from 'react';
import { coolThings as defaultCoolThings } from '../../content/coolThings';

const listStyle = {
  display: 'grid',
  borderTop: '1px solid var(--color-hairline)',
};

const itemStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(5rem, 0.22fr) minmax(0, 1fr)',
  gap: 'var(--space-8)',
  padding: 'var(--space-8) 0',
  borderBottom: '1px solid var(--color-hairline)',
};

const indexStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  lineHeight: 'var(--leading-tight)',
};

const titleStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-2xl)',
  fontWeight: 300,
  lineHeight: 'var(--leading-tight)',
  letterSpacing: 'var(--tracking-tight)',
  color: 'var(--color-ink)',
  margin: '0 0 var(--space-3)',
};

const linkStyle = {
  color: 'inherit',
  textDecoration: 'underline',
  textDecorationColor: 'var(--color-oxblood)',
  textDecorationThickness: '1px',
  textUnderlineOffset: '0.22em',
  transition: 'color var(--duration-base) var(--ease-out), text-decoration-color var(--duration-base) var(--ease-out)',
};

const captionStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-sm)',
  lineHeight: 'var(--leading-prose)',
  color: 'var(--color-muted)',
  margin: 0,
};

const kindStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--color-oxblood)',
  margin: '0 0 var(--space-4)',
};

const emptyStateStyle = {
  borderTop: '1px solid var(--color-hairline)',
  borderBottom: '1px solid var(--color-hairline)',
  padding: 'var(--space-8) 0',
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-lg)',
  lineHeight: 'var(--leading-prose)',
  color: 'var(--color-muted)',
};

function normalizeCoolThing(item, index) {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const title = typeof item.title === 'string' ? item.title.trim() : '';

  if (!title) {
    return null;
  }

  return {
    id: item.id || `${title}-${index}`,
    title,
    url: typeof item.url === 'string' && item.url.trim() ? item.url.trim() : null,
    caption: typeof item.caption === 'string' ? item.caption.trim() : '',
    kind: typeof item.kind === 'string' ? item.kind.trim() : '',
  };
}

export default function CoolThings({ items = defaultCoolThings }) {
  const normalizedItems = Array.isArray(items)
    ? items.map(normalizeCoolThing).filter(Boolean)
    : [];

  if (normalizedItems.length === 0) {
    return (
      <p role="status" style={emptyStateStyle}>
        This list is being edited. Check back for a slower, stranger set of things soon.
      </p>
    );
  }

  return (
    <div aria-label="Things I find cool" style={listStyle}>
      {normalizedItems.map((item, index) => (
        <article key={item.id} className="editorial-list-row" style={itemStyle}>
          <aside aria-hidden="true" className="editorial-tabular" style={indexStyle}>
            {String(index + 1).padStart(2, '0')}
          </aside>
          <div>
            {item.kind ? <p style={kindStyle}>{item.kind}</p> : null}
            <h3 style={titleStyle}>
              {item.url ? (
                <a
                  className="editorial-text-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </h3>
            {item.caption ? <p style={captionStyle}>{item.caption}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
