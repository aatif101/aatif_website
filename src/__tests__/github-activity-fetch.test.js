const {
  buildActivity,
  createRequestOptions,
  fallbackActivity,
  parseDotenv,
  resolveToken,
} = require('../../scripts/fetch-github-activity');

describe('fetch-github-activity script helpers', () => {
  it('reads portfolio token first without printing or mutating values', () => {
    const fileEnv = parseDotenv(`
      GITHUB_TOKEN=file-token
      GITHUB_TOKEN_PORTFOLIO="portfolio-file-token"
    `);

    expect(fileEnv).toEqual({
      GITHUB_TOKEN: 'file-token',
      GITHUB_TOKEN_PORTFOLIO: 'portfolio-file-token',
    });
    expect(
      resolveToken(
        {
          GITHUB_TOKEN: 'process-token',
          GITHUB_TOKEN_PORTFOLIO: 'portfolio-process-token',
        },
        fileEnv
      )
    ).toBe('portfolio-process-token');
  });

  it('adds Authorization only inside request options when a token exists', () => {
    expect(createRequestOptions('/users/aatif101', '').headers.Authorization).toBeUndefined();
    expect(createRequestOptions('/users/aatif101', 'secret-token').headers.Authorization).toBe(
      'Bearer secret-token'
    );
  });

  it('builds a sanitized public activity artifact from GitHub payloads', () => {
    const activity = buildActivity({
      profile: {
        login: 'aatif101',
        name: 'Mohammad Aatif Shaikh',
        html_url: 'https://github.com/aatif101',
        bio: 'Builder',
        public_repos: 2,
        followers: 7,
      },
      repos: [
        {
          private: false,
          name: 'fresh',
          full_name: 'aatif101/fresh',
          html_url: 'https://github.com/aatif101/fresh',
          description: 'Recent work',
          homepage: '',
          language: 'JavaScript',
          stargazers_count: 3,
          forks_count: 1,
          fork: false,
          archived: false,
          topics: ['portfolio'],
          pushed_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-02T00:00:00Z',
        },
        {
          private: true,
          name: 'private-work',
        },
      ],
      events: [
        {
          id: '1',
          type: 'PushEvent',
          repo: { name: 'aatif101/fresh' },
          created_at: '2026-01-03T00:00:00Z',
          payload: { commits: [{ sha: 'abc', message: 'Ship safely' }] },
        },
      ],
    });

    expect(activity.fallback).toBe(false);
    expect(activity.source).toBe('github-rest');
    expect(activity.repositories).toHaveLength(1);
    expect(activity.repositories[0]).not.toHaveProperty('private');
    expect(activity.signals.totalStars).toBe(3);
    expect(activity.signals.topLanguages).toEqual([{ language: 'JavaScript', count: 1 }]);
    expect(activity.recentActivity[0]).toMatchObject({ type: 'PushEvent', repo: 'aatif101/fresh' });
  });

  it('provides a graceful fallback shape for missing token or API failure', () => {
    const fallback = fallbackActivity('missing token');

    expect(fallback).toMatchObject({
      username: 'aatif101',
      source: 'fallback',
      fallback: true,
      fallbackReason: 'missing token',
    });
    expect(fallback.profile.htmlUrl).toBe('https://github.com/aatif101');
    expect(fallback.repositories).toEqual([]);
    expect(fallback.recentActivity).toEqual([]);
  });
});
