import React from 'react';
import githubActivity from '../../data/githubActivity.json';

const eyebrowStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--color-muted)',
  margin: 0,
};

const serifMetricStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(4rem, 16vw, 12rem)',
  fontWeight: 300,
  lineHeight: 0.86,
  letterSpacing: '-0.08em',
  color: 'var(--color-oxblood)',
  margin: 'var(--space-4) 0 var(--space-6)',
};

const quietSansStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-sm)',
  lineHeight: 'var(--leading-relaxed)',
  color: 'var(--color-muted)',
};

const ruleStyle = {
  borderTop: '1px solid var(--color-hairline)',
  paddingTop: 'var(--space-4)',
};

function formatDate(value) {
  if (!value) return 'undated';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'undated';
  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
}

function shortEventType(type) {
  return String(type || 'Activity').replace(/Event$/, '').replace(/([a-z])([A-Z])/g, '$1 $2');
}

function buildContributionPrint(activity) {
  const events = Math.max(activity?.signals?.recentEvents || 0, activity?.recentActivity?.length || 0, 1);
  return Array.from({ length: 56 }, (_, index) => {
    const isHot = (index * 7 + events) % 11 < 4;
    const isWarm = (index + events) % 6 === 0;
    return isHot ? 'oxblood' : isWarm ? 'accent' : 'faint';
  });
}

export default function GitHubActivity({ activity = githubActivity }) {
  const signals = activity?.signals || {};
  const profile = activity?.profile || {};
  const repos = Array.isArray(activity?.repositories) ? activity.repositories.slice(0, 5) : [];
  const recentActivity = Array.isArray(activity?.recentActivity) ? activity.recentActivity.slice(0, 5) : [];
  const contributionPrint = buildContributionPrint(activity);
  const hasFallback = Boolean(activity?.fallback);
  const generatedAt = formatDate(activity?.generatedAt);
  const headlineMetric = signals.recentEvents || recentActivity.length || signals.activeRepositories || 0;
  const languageLine = Array.isArray(signals.topLanguages)
    ? signals.topLanguages
        .slice(0, 3)
        .map((entry) => `${entry.language} ${entry.count}`)
        .join(' / ')
    : '';

  return (
    <div aria-label="GitHub activity report" style={{ display: 'grid', gap: 'var(--space-12)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.9fr) minmax(18rem, 1.1fr)',
          gap: 'var(--space-12)',
          alignItems: 'end',
        }}
      >
        <div>
          <p style={eyebrowStyle}>Public GitHub ledger / {activity?.username || profile.login || 'aatif101'}</p>
          <p aria-label={`${headlineMetric} recent public events`} style={serifMetricStyle}>
            {headlineMetric}
          </p>
          <p
            style={{
              ...quietSansStyle,
              maxWidth: '34rem',
              fontSize: 'var(--text-base)',
              color: 'var(--color-ink)',
            }}
          >
            Recent public events set against {signals.activeRepositories || repos.length || 0} active
            repositories, drawn at build time into a static, token-free artifact.
          </p>
        </div>

        <aside
          aria-label="GitHub data status"
          style={{
            ...ruleStyle,
            display: 'grid',
            gap: 'var(--space-3)',
            alignSelf: 'stretch',
          }}
        >
          <p style={{ ...eyebrowStyle, color: hasFallback ? 'var(--color-oxblood)' : 'var(--color-muted)' }}>
            {hasFallback ? 'Fallback data visible' : 'Live public artifact'}
          </p>
          <p style={{ ...quietSansStyle, margin: 0 }}>
            Generated {generatedAt}. Source: {activity?.source || 'unknown'}
            {hasFallback && activity?.fallbackReason ? ` / ${activity.fallbackReason}` : ''}.
          </p>
          <p style={{ ...quietSansStyle, margin: 0 }}>
            Tally: {signals.publicRepos || profile.publicRepos || 0} public repos,{' '}
            {signals.originalRepos || 0} original, {signals.totalStars || 0} stars,{' '}
            {signals.totalForks || 0} forks.
          </p>
        </aside>
      </div>

      <div
        aria-label="Contribution-style activity print"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(14, minmax(0, 1fr))',
          gap: '0.35rem',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-paper)',
          borderTop: '1px solid var(--color-ink)',
          borderBottom: '1px solid var(--color-ink)',
        }}
      >
        {contributionPrint.map((tone, index) => (
          <span
            key={`${tone}-${index}`}
            aria-hidden="true"
            style={{
              minHeight: '0.85rem',
              backgroundColor:
                tone === 'oxblood'
                  ? 'var(--color-oxblood)'
                  : tone === 'accent'
                    ? 'var(--color-accent)'
                    : 'var(--color-surface)',
              opacity: tone === 'faint' ? 0.72 : 1,
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 'var(--space-12)',
        }}
      >
        <section aria-labelledby="github-recent-heading" style={ruleStyle}>
          <h3
            id="github-recent-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 300,
              margin: '0 0 var(--space-6)',
            }}
          >
            Recent public marks
          </h3>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-4)' }}>
            {recentActivity.length > 0 ? (
              recentActivity.map((event) => (
                <li key={event.id} style={{ display: 'grid', gridTemplateColumns: '7rem 1fr', gap: 'var(--space-4)' }}>
                  <time dateTime={event.createdAt} style={eyebrowStyle}>
                    {formatDate(event.createdAt)}
                  </time>
                  <span style={{ ...quietSansStyle, color: 'var(--color-ink)' }}>
                    {shortEventType(event.type)} {event.action ? `${event.action} ` : ''}in {event.repo}
                  </span>
                </li>
              ))
            ) : (
              <li style={quietSansStyle}>No recent public events in the static artifact.</li>
            )}
          </ol>
        </section>

        <section aria-labelledby="github-repos-heading" style={ruleStyle}>
          <h3
            id="github-repos-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 300,
              margin: '0 0 var(--space-6)',
            }}
          >
            Active repositories
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-4)' }}>
            {repos.length > 0 ? (
              repos.map((repo) => (
                <li key={repo.fullName}>
                  <a
                    href={repo.htmlUrl}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 'var(--space-4)',
                      color: 'var(--color-ink)',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)' }}>
                      {repo.name}
                    </span>
                    <span style={eyebrowStyle}>{repo.language || 'Unknown'}</span>
                  </a>
                  <p style={{ ...quietSansStyle, margin: 'var(--space-1) 0 0' }}>
                    pushed {formatDate(repo.pushedAt)} / {repo.stars} stars / {repo.forks} forks
                  </p>
                </li>
              ))
            ) : (
              <li style={quietSansStyle}>Repository list unavailable; fallback artifact is rendering safely.</li>
            )}
          </ul>
        </section>
      </div>

      {languageLine ? <p style={{ ...eyebrowStyle, textAlign: 'right' }}>Language index: {languageLine}</p> : null}
    </div>
  );
}
