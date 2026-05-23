#!/usr/bin/env node
'use strict';

const fs = require('fs');
const https = require('https');
const path = require('path');

const USERNAME = 'aatif101';
const API_HOST = 'api.github.com';
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/githubActivity.json');
const ENV_PATH = path.resolve(__dirname, '../.env');
const REQUEST_TIMEOUT_MS = 12000;

const ENDPOINTS = {
  profile: `/users/${USERNAME}`,
  repos: `/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
  events: `/users/${USERNAME}/events/public?per_page=100`,
};

function logPhase(phase, details = {}) {
  const safeDetails = Object.fromEntries(
    Object.entries(details).filter(([key, value]) => {
      if (value === undefined || value === null) return false;
      return !/token|authorization|secret|password/i.test(key);
    })
  );
  console.log(JSON.stringify({ phase, ...safeDetails }));
}

function parseDotenv(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce((acc, line) => {
      const equalsIndex = line.indexOf('=');
      if (equalsIndex === -1) return acc;
      const key = line.slice(0, equalsIndex).trim();
      let value = line.slice(equalsIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (key) acc[key] = value;
      return acc;
    }, {});
}

function loadLocalEnv(envPath = ENV_PATH) {
  if (!fs.existsSync(envPath)) return {};
  return parseDotenv(fs.readFileSync(envPath, 'utf8'));
}

function resolveToken(processEnv = process.env, fileEnv = loadLocalEnv()) {
  return (
    processEnv.GITHUB_TOKEN_PORTFOLIO ||
    processEnv.GITHUB_TOKEN ||
    fileEnv.GITHUB_TOKEN_PORTFOLIO ||
    fileEnv.GITHUB_TOKEN ||
    ''
  ).trim();
}

function endpointClass(endpoint) {
  if (endpoint.includes('/repos')) return 'repos';
  if (endpoint.includes('/events')) return 'events';
  return 'profile';
}

function createRequestOptions(endpoint, token) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'aatif-portfolio-build-fetch',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    host: API_HOST,
    path: endpoint,
    method: 'GET',
    headers,
    timeout: REQUEST_TIMEOUT_MS,
  };
}

function githubGet(endpoint, token) {
  logPhase('request:start', {
    endpointClass: endpointClass(endpoint),
    apiHost: API_HOST,
    authenticated: Boolean(token),
  });

  return new Promise((resolve, reject) => {
    const req = https.request(createRequestOptions(endpoint, token), (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        logPhase('request:end', {
          endpointClass: endpointClass(endpoint),
          statusCode: res.statusCode,
          rateLimitRemaining: res.headers['x-ratelimit-remaining'],
        });

        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`GitHub ${endpointClass(endpoint)} request failed with ${res.statusCode}`));
          return;
        }

        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error(`GitHub ${endpointClass(endpoint)} response was not valid JSON`));
        }
      });
    });

    req.on('timeout', () => {
      req.destroy(new Error(`GitHub ${endpointClass(endpoint)} request timed out`));
    });
    req.on('error', reject);
    req.end();
  });
}

function fallbackActivity(reason = 'unavailable') {
  return {
    generatedAt: new Date().toISOString(),
    username: USERNAME,
    source: 'fallback',
    fallback: true,
    fallbackReason: reason,
    profile: {
      login: USERNAME,
      name: 'Mohammad Aatif Shaikh',
      htmlUrl: `https://github.com/${USERNAME}`,
      bio: 'Public GitHub activity is temporarily unavailable.',
      publicRepos: null,
      followers: null,
    },
    signals: {
      publicRepos: 0,
      originalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      recentEvents: 0,
      activeRepositories: 0,
      topLanguages: [],
      latestPushAt: null,
    },
    repositories: [],
    recentActivity: [],
  };
}

function sortLanguageEntries(languageCounts) {
  return Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([language, count]) => ({ language, count }));
}

function sanitizeRepo(repo) {
  return {
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || '',
    htmlUrl: repo.html_url,
    homepage: repo.homepage || '',
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    isFork: Boolean(repo.fork),
    archived: Boolean(repo.archived),
    topics: Array.isArray(repo.topics) ? repo.topics.slice(0, 8) : [],
    pushedAt: repo.pushed_at || null,
    updatedAt: repo.updated_at || null,
  };
}

function sanitizeEvent(event) {
  return {
    id: event.id,
    type: event.type,
    repo: event.repo && event.repo.name ? event.repo.name : null,
    createdAt: event.created_at,
    action: event.payload && event.payload.action ? event.payload.action : null,
    commits:
      event.payload && Array.isArray(event.payload.commits)
        ? event.payload.commits.slice(0, 3).map((commit) => ({
            sha: commit.sha,
            message: commit.message,
          }))
        : [],
  };
}

function buildActivity({ profile, repos, events }) {
  const sanitizedRepos = repos
    .filter((repo) => !repo.private)
    .map(sanitizeRepo)
    .sort((a, b) => {
      const aTime = a.pushedAt ? new Date(a.pushedAt).getTime() : 0;
      const bTime = b.pushedAt ? new Date(b.pushedAt).getTime() : 0;
      return bTime - aTime;
    });

  const originalRepos = sanitizedRepos.filter((repo) => !repo.isFork);
  const languageCounts = originalRepos.reduce((acc, repo) => {
    if (repo.language && repo.language !== 'Unknown') {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const activeCutoff = Date.now() - 1000 * 60 * 60 * 24 * 365;
  const latestPushAt = sanitizedRepos.find((repo) => repo.pushedAt)?.pushedAt || null;

  return {
    generatedAt: new Date().toISOString(),
    username: USERNAME,
    source: 'github-rest',
    fallback: false,
    fallbackReason: null,
    profile: {
      login: profile.login || USERNAME,
      name: profile.name || 'Mohammad Aatif Shaikh',
      htmlUrl: profile.html_url || `https://github.com/${USERNAME}`,
      bio: profile.bio || '',
      company: profile.company || '',
      location: profile.location || '',
      publicRepos: profile.public_repos || 0,
      followers: profile.followers || 0,
    },
    signals: {
      publicRepos: profile.public_repos || sanitizedRepos.length,
      originalRepos: originalRepos.length,
      totalStars: sanitizedRepos.reduce((sum, repo) => sum + repo.stars, 0),
      totalForks: sanitizedRepos.reduce((sum, repo) => sum + repo.forks, 0),
      recentEvents: Array.isArray(events) ? events.length : 0,
      activeRepositories: sanitizedRepos.filter((repo) => {
        if (!repo.pushedAt) return false;
        return new Date(repo.pushedAt).getTime() >= activeCutoff;
      }).length,
      topLanguages: sortLanguageEntries(languageCounts),
      latestPushAt,
    },
    repositories: sanitizedRepos.slice(0, 12),
    recentActivity: Array.isArray(events) ? events.slice(0, 12).map(sanitizeEvent) : [],
  };
}

async function fetchActivity({ token = resolveToken(), forceFallback = false } = {}) {
  logPhase('fetch:init', {
    username: USERNAME,
    tokenSource: token ? 'provided' : 'missing',
  });

  if (forceFallback || process.env.GITHUB_ACTIVITY_FORCE_FALLBACK === '1') {
    logPhase('fallback:used', { reason: 'forced' });
    return fallbackActivity('forced');
  }

  try {
    const [profile, repos, events] = await Promise.all([
      githubGet(ENDPOINTS.profile, token),
      githubGet(ENDPOINTS.repos, token),
      githubGet(ENDPOINTS.events, token),
    ]);
    const activity = buildActivity({ profile, repos, events });
    logPhase('fetch:complete', { fallback: activity.fallback, repositories: activity.repositories.length });
    return activity;
  } catch (error) {
    logPhase('fallback:used', {
      reason: error.message,
      tokenSource: token ? 'provided' : 'missing',
    });
    return fallbackActivity(error.message);
  }
}

function writeActivity(activity, outputPath = OUTPUT_PATH) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(activity, null, 2)}\n`);
  logPhase('write:complete', {
    outputPath: path.relative(process.cwd(), outputPath),
    fallback: activity.fallback,
  });
}

async function main() {
  logPhase('script:start', { outputPath: path.relative(process.cwd(), OUTPUT_PATH) });
  const activity = await fetchActivity();
  writeActivity(activity);
  logPhase('script:done', { fallback: activity.fallback });
}

if (require.main === module) {
  main().catch((error) => {
    logPhase('script:error', { message: error.message });
    process.exitCode = 1;
  });
}

module.exports = {
  ENDPOINTS,
  buildActivity,
  createRequestOptions,
  fallbackActivity,
  fetchActivity,
  loadLocalEnv,
  parseDotenv,
  resolveToken,
  writeActivity,
};
