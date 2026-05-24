import React from 'react';

const timelineStyle = {
  display: 'grid',
  gap: 'var(--space-10)',
};

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(8rem, 0.38fr) minmax(0, 1fr)',
  gap: 'var(--space-8)',
  paddingTop: 'var(--space-8)',
  borderTop: '1px solid var(--color-hairline)',
};

const dateStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  lineHeight: 'var(--leading-loose)',
};

const headingStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-xl)',
  fontWeight: 300,
  lineHeight: 'var(--leading-tight)',
  color: 'var(--color-ink)',
  margin: 0,
};

function TimelineRow({ item }) {
  return (
    <article className="editorial-timeline-row" style={rowStyle}>
      <aside className="editorial-tabular" style={dateStyle}>{item.period || 'Ongoing'}</aside>
      <div>
        <p
          style={{
            ...dateStyle,
            color: item.kind === 'Leadership' ? 'var(--color-oxblood)' : 'var(--color-muted)',
            margin: '0 0 var(--space-2)',
          }}
        >
          {item.kind}
          {item.context ? ` · ${item.context}` : ''}
        </p>
        <h3 style={headingStyle}>
          {item.role || item.degree}, {item.organization || item.institution}
        </h3>
        {item.gpa ? (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-muted)',
              margin: 'var(--space-3) 0 0',
            }}
          >
            GPA {item.gpa}
          </p>
        ) : null}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 'var(--space-5) 0 0',
            display: 'grid',
            gap: 'var(--space-3)',
          }}
        >
          {(item.highlights || item.honors || []).map((highlight) => (
            <li
              key={highlight}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--color-muted)',
              }}
            >
              {highlight}
            </li>
          ))}
          {item.coursework ? (
            <li
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--color-muted)',
              }}
            >
              Coursework: {item.coursework.join(', ')}.
            </li>
          ) : null}
        </ul>
      </div>
    </article>
  );
}

export default function ExperienceTimeline({ experience, education, leadership }) {
  const rows = [
    ...experience.map((item) => ({ ...item, kind: 'Experience' })),
    ...education.map((item) => ({ ...item, kind: 'Education' })),
    ...leadership.map((item) => ({ ...item, kind: 'Leadership' })),
  ];

  return (
    <div style={timelineStyle} aria-label="Experience, education, and leadership timeline">
      {rows.map((item) => (
        <TimelineRow
          key={`${item.kind}-${item.organization || item.institution}-${item.role || item.degree}`}
          item={item}
        />
      ))}
    </div>
  );
}
