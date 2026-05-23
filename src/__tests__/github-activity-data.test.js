const githubActivity = require('../data/githubActivity.json');

const ISO_8601_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const ISO_8601_ANY = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
const SECRET_VALUE_PATTERN = /(?:github_pat_|gh[opsu]_[A-Za-z0-9_]+|Bearer\s+\S+|Authorization|GITHUB_TOKEN|access_token=|token=)/i;

function collectStrings(value, path = '$', acc = []) {
  if (typeof value === 'string') {
    acc.push({ path, value });
    return acc;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, `${path}[${index}]`, acc));
    return acc;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, nested]) => collectStrings(nested, `${path}.${key}`, acc));
  }

  return acc;
}

describe('githubActivity static data artifact', () => {
  it('exposes the required top-level public artifact fields', () => {
    expect(githubActivity).toEqual(
      expect.objectContaining({
        generatedAt: expect.any(String),
        username: expect.any(String),
        source: expect.any(String),
        fallback: expect.any(Boolean),
        profile: expect.any(Object),
        signals: expect.any(Object),
        repositories: expect.any(Array),
        recentActivity: expect.any(Array),
      })
    );

    expect(githubActivity.generatedAt).toMatch(ISO_8601_UTC);
    expect(Number.isNaN(Date.parse(githubActivity.generatedAt))).toBe(false);
    expect(githubActivity.username).toBe('aatif101');
    expect(['github-rest', 'fallback']).toContain(githubActivity.source);
    expect(githubActivity.fallbackReason === null || typeof githubActivity.fallbackReason === 'string').toBe(
      true
    );
  });

  it('keeps profile and aggregate signal fields renderable without private data', () => {
    expect(githubActivity.profile).toEqual(
      expect.objectContaining({
        login: expect.any(String),
        name: expect.any(String),
        htmlUrl: expect.stringMatching(/^https:\/\/github\.com\//),
        publicRepos: expect.any(Number),
        followers: expect.any(Number),
      })
    );

    expect(githubActivity.signals).toEqual(
      expect.objectContaining({
        publicRepos: expect.any(Number),
        originalRepos: expect.any(Number),
        totalStars: expect.any(Number),
        totalForks: expect.any(Number),
        recentEvents: expect.any(Number),
        activeRepositories: expect.any(Number),
        topLanguages: expect.any(Array),
      })
    );

    githubActivity.signals.topLanguages.forEach((entry) => {
      expect(entry).toEqual({ language: expect.any(String), count: expect.any(Number) });
    });
  });

  it('publishes recent activity entries with only the safe render shape', () => {
    githubActivity.recentActivity.forEach((event) => {
      expect(event).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          type: expect.any(String),
          repo: expect.any(String),
          createdAt: expect.stringMatching(ISO_8601_ANY),
          commits: expect.any(Array),
        })
      );
      expect(event.action === null || typeof event.action === 'string').toBe(true);
      expect(event).not.toHaveProperty('payload');
      expect(event).not.toHaveProperty('actor');
      expect(event).not.toHaveProperty('org');
    });
  });

  it('publishes active repositories with sanitized public fields only', () => {
    githubActivity.repositories.forEach((repo) => {
      expect(repo).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          fullName: expect.any(String),
          htmlUrl: expect.stringMatching(/^https:\/\/github\.com\//),
          language: expect.any(String),
          stars: expect.any(Number),
          forks: expect.any(Number),
          isFork: expect.any(Boolean),
          archived: expect.any(Boolean),
          topics: expect.any(Array),
          pushedAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
      expect(repo).not.toHaveProperty('private');
      expect(repo).not.toHaveProperty('owner');
      expect(repo.pushedAt === '' || ISO_8601_ANY.test(repo.pushedAt)).toBe(true);
      expect(repo.updatedAt === '' || ISO_8601_ANY.test(repo.updatedAt)).toBe(true);
    });
  });

  it('does not contain token-looking keys or values anywhere in the committed JSON', () => {
    const serialized = JSON.stringify(githubActivity);
    expect(serialized).not.toMatch(/"(?:token|authorization|secret|password)"\s*:/i);

    const suspiciousStrings = collectStrings(githubActivity).filter(({ value }) =>
      SECRET_VALUE_PATTERN.test(value)
    );
    expect(suspiciousStrings).toEqual([]);
  });
});
