import React from 'react';

const footerStyle = {
  backgroundColor: 'var(--color-ink)',
  color: 'var(--color-faint)',
  padding: 'var(--space-16) var(--space-8)',
};

const innerStyle = {
  maxWidth: 'var(--col-prose)',
  margin: '0 auto',
};

const labelStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  margin: '0 0 var(--space-5)',
};

const proseStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'var(--text-xl)',
  fontWeight: 300,
  lineHeight: 'var(--leading-prose)',
  letterSpacing: 'var(--tracking-tight)',
  margin: 0,
};

const linkStyle = {
  color: 'inherit',
  textDecoration: 'underline',
  textDecorationColor: 'var(--color-oxblood)',
  textDecorationThickness: '1px',
  textUnderlineOffset: '0.22em',
};

const metaStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-wide)',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  margin: 'var(--space-8) 0 0',
};

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export default function Colophon({ identity = {}, contact = {} }) {
  const name = isNonEmptyString(identity.name) ? identity.name.trim() : 'Aatif';
  const location = isNonEmptyString(identity.location) ? identity.location.trim() : '';
  const email = isNonEmptyString(contact.email) ? contact.email.trim() : '';
  const linkedin = isNonEmptyString(contact.linkedin) ? contact.linkedin.trim() : '';
  const github = isNonEmptyString(contact.github) ? contact.github.trim() : '';
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-label="Contact and colophon"
      data-motion-reveal
      style={footerStyle}
    >
      <div style={innerStyle}>
        <p style={labelStyle}>Contact / Colophon</p>
        <address style={{ fontStyle: 'normal' }}>
          <p style={proseStyle}>
            {name} is reachable{location ? ` from ${location}` : ''} by{' '}
            {email ? (
              <a href={`mailto:${email}`} className="editorial-text-link" style={linkStyle}>
                {email}
              </a>
            ) : (
              'email'
            )}
            {linkedin ? (
              <>
                , on{' '}
                <a href={linkedin} className="editorial-text-link" style={linkStyle}>
                  LinkedIn
                </a>
              </>
            ) : null}
            {github ? (
              <>
                , and through{' '}
                <a href={github} className="editorial-text-link" style={linkStyle}>
                  GitHub
                </a>
              </>
            ) : null}
            .
          </p>
        </address>
        <p style={metaStyle}>
          Set in Spectral and system sans. Built as a quiet single-page portfolio, {year}.
        </p>
      </div>
    </footer>
  );
}
