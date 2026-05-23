#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const GITIGNORE_PATH = path.join(ROOT, '.gitignore');
const SCAN_TARGETS = ['package.json', 'src', 'scripts', 'public', 'build'];
const TEXT_EXTENSIONS = new Set([
  '',
  '.css',
  '.csv',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.map',
  '.md',
  '.mjs',
  '.svg',
  '.tex',
  '.txt',
  '.ts',
  '.tsx',
  '.xml',
]);
const SKIP_DIRS = new Set(['.git', '.gsd', '.cache', 'coverage', 'node_modules']);
const SKIP_FILES = new Set([path.relative(ROOT, __filename).replace(/\\/g, '/')]);
const GITHUB_TOKEN_PREFIXES = ['p', 'o', 'u', 's', 'r'].map((suffix) => `gh${suffix}_`);
const GITHUB_TOKEN_PAT_PREFIX = ['github', 'pat'].join('_') + '_';
const TOKEN_PATTERNS = [
  ...GITHUB_TOKEN_PREFIXES.map((prefix) => ({
    label: `${prefix}<redacted>`,
    pattern: new RegExp(`${escapeRegExp(prefix)}[A-Za-z0-9_]{20,}`, 'g'),
  })),
  {
    label: `${GITHUB_TOKEN_PAT_PREFIX}<redacted>`,
    pattern: new RegExp(`${escapeRegExp(GITHUB_TOKEN_PAT_PREFIX)}[A-Za-z0-9_]{20,}`, 'g'),
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toRelative(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function isEnvFile(relativePath) {
  const baseName = path.basename(relativePath);
  return baseName === '.env' || baseName.startsWith('.env.');
}

function isTextFile(filePath) {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function walk(targetPath, files = []) {
  if (!fs.existsSync(targetPath)) return files;
  const stat = fs.statSync(targetPath);
  const relativePath = toRelative(targetPath);

  if (stat.isDirectory()) {
    if (SKIP_DIRS.has(path.basename(targetPath))) return files;
    for (const entry of fs.readdirSync(targetPath)) {
      walk(path.join(targetPath, entry), files);
    }
    return files;
  }

  if (!stat.isFile()) return files;
  if (SKIP_FILES.has(relativePath)) return files;
  if (isEnvFile(relativePath)) return files;
  if (!isTextFile(targetPath)) return files;
  files.push(targetPath);
  return files;
}

function assertGitignoreProtectsEnv() {
  if (!fs.existsSync(GITIGNORE_PATH)) {
    throw new Error('.gitignore is missing; cannot verify .env protection');
  }

  const lines = fs
    .readFileSync(GITIGNORE_PATH, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));

  const ignoresDotenv = lines.includes('.env') || lines.includes('/.env');
  const ignoresDotenvVariants = lines.includes('.env.*') || lines.includes('/.env.*');
  const unignoresDotenv = lines.some(
    (line) => line.startsWith('!') && (line === '!.env' || line.startsWith('!.env.')) && line !== '!.env.example'
  );

  if (!ignoresDotenv || !ignoresDotenvVariants || unignoresDotenv) {
    throw new Error('.gitignore must ignore .env and .env.* while only allowing safe examples');
  }
}

function scanForGitHubTokens() {
  const files = SCAN_TARGETS.flatMap((target) => walk(path.join(ROOT, target)));
  const findings = [];

  for (const filePath of files) {
    const relativePath = toRelative(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      TOKEN_PATTERNS.forEach(({ label, pattern }) => {
        pattern.lastIndex = 0;
        if (pattern.test(line)) {
          findings.push({ file: relativePath, line: index + 1, tokenClass: label });
        }
      });
    });
  }

  if (findings.length > 0) {
    const safeSummary = findings
      .map((finding) => `${finding.file}:${finding.line} contains ${finding.tokenClass}`)
      .join('\n');
    throw new Error(`Possible GitHub token leakage detected:\n${safeSummary}`);
  }

  return files.length;
}

function main() {
  assertGitignoreProtectsEnv();
  const scannedFiles = scanForGitHubTokens();
  console.log(
    JSON.stringify({
      phase: 'verify:no-secrets',
      scannedFiles,
      checkedBuildOutput: fs.existsSync(path.join(ROOT, 'build')),
      dotenvIgnored: true,
      githubTokenLeakage: false,
    })
  );
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(JSON.stringify({ phase: 'verify:no-secrets', status: 'failed', message: error.message }));
    process.exitCode = 1;
  }
}

module.exports = {
  assertGitignoreProtectsEnv,
  scanForGitHubTokens,
};
