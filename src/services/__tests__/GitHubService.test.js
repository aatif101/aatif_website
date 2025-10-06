/**
 * Basic tests for GitHubService functionality
 * Tests data transformation and filtering logic
 */

import GitHubService from '../GitHubService';

// Mock GitHub API response data
const mockGitHubRepo = {
  id: 123456,
  name: 'test-repo',
  description: 'A test repository',
  html_url: 'https://github.com/user/test-repo',
  homepage: 'https://test-repo.com',
  language: 'JavaScript',
  topics: ['react', 'frontend', 'web'],
  stargazers_count: 42,
  forks_count: 7,
  watchers_count: 15,
  updated_at: '2023-12-01T10:00:00Z',
  created_at: '2023-01-01T10:00:00Z',
  archived: false,
  fork: false,
  private: false,
  size: 1024,
  open_issues_count: 3,
  languages: {
    'JavaScript': 15000,
    'CSS': 3000,
    'HTML': 1000
  }
};

describe('GitHubService', () => {
  describe('transformRepositoryData', () => {
    test('should transform GitHub repo data to component format', () => {
      const transformed = GitHubService.transformRepositoryData([mockGitHubRepo]);
      
      expect(transformed).toHaveLength(1);
      
      const project = transformed[0];
      expect(project.id).toBe(123456);
      expect(project.name).toBe('test-repo');
      expect(project.description).toBe('A test repository');
      expect(project.link).toBe('https://github.com/user/test-repo');
      expect(project.homepage).toBe('https://test-repo.com');
      expect(project.tech).toContain('JavaScript');
      expect(project.tech).toContain('react');
      expect(project.stats.stars).toBe(42);
      expect(project.stats.forks).toBe(7);
      expect(project.metadata.isArchived).toBe(false);
      expect(project.metadata.isFork).toBe(false);
    });

    test('should handle repos without description', () => {
      const repoWithoutDesc = { ...mockGitHubRepo, description: null };
      const transformed = GitHubService.transformRepositoryData([repoWithoutDesc]);
      
      expect(transformed[0].description).toBe('No description available');
      expect(transformed[0].details).toBe('A JavaScript project');
    });

    test('should handle repos without language', () => {
      const repoWithoutLang = { ...mockGitHubRepo, language: null, languages: {} };
      const transformed = GitHubService.transformRepositoryData([repoWithoutLang]);
      
      expect(transformed[0].tech).toContain('Unknown');
      expect(transformed[0].metadata.language).toBe('Unknown');
    });
  });

  describe('filterRepositories', () => {
    const mockProjects = [
      {
        id: 1,
        name: 'regular-repo',
        stats: { stars: 10 },
        metadata: { isFork: false, isArchived: false },
        tech: ['JavaScript', 'react']
      },
      {
        id: 2,
        name: 'forked-repo',
        stats: { stars: 5 },
        metadata: { isFork: true, isArchived: false },
        tech: ['Python', 'django']
      },
      {
        id: 3,
        name: 'archived-repo',
        stats: { stars: 20 },
        metadata: { isFork: false, isArchived: true },
        tech: ['Java', 'spring']
      },
      {
        id: 4,
        name: 'learning-repo',
        stats: { stars: 2 },
        metadata: { isFork: false, isArchived: false },
        tech: ['JavaScript', 'learning']
      }
    ];

    test('should exclude forked repositories by default', () => {
      const filtered = GitHubService.filterRepositories(mockProjects);
      expect(filtered).toHaveLength(3);
      expect(filtered.find(p => p.id === 2)).toBeUndefined();
    });

    test('should exclude archived repositories by default', () => {
      const filtered = GitHubService.filterRepositories(mockProjects);
      expect(filtered.find(p => p.id === 3)).toBeUndefined();
    });

    test('should filter by minimum stars', () => {
      const filtered = GitHubService.filterRepositories(mockProjects, { minStars: 8 });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(1);
    });

    test('should exclude repositories with excluded topics', () => {
      const filtered = GitHubService.filterRepositories(mockProjects, { 
        excludeTopics: ['learning'] 
      });
      expect(filtered.find(p => p.id === 4)).toBeUndefined();
    });

    test('should include only repositories with included topics', () => {
      const filtered = GitHubService.filterRepositories(mockProjects, { 
        includeTopics: ['react'] 
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe(1);
    });
  });

  describe('sortRepositories', () => {
    const mockProjects = [
      {
        id: 1,
        name: 'zebra-repo',
        stats: { stars: 5, lastUpdated: '2023-01-01T10:00:00Z' },
        metadata: { createdAt: '2022-01-01T10:00:00Z' }
      },
      {
        id: 2,
        name: 'alpha-repo',
        stats: { stars: 15, lastUpdated: '2023-06-01T10:00:00Z' },
        metadata: { createdAt: '2023-01-01T10:00:00Z' }
      },
      {
        id: 3,
        name: 'beta-repo',
        stats: { stars: 10, lastUpdated: '2023-12-01T10:00:00Z' },
        metadata: { createdAt: '2022-06-01T10:00:00Z' }
      }
    ];

    test('should sort by stars descending', () => {
      const sorted = GitHubService.sortRepositories(mockProjects, 'stars', 'desc');
      expect(sorted[0].id).toBe(2); // 15 stars
      expect(sorted[1].id).toBe(3); // 10 stars
      expect(sorted[2].id).toBe(1); // 5 stars
    });

    test('should sort by name ascending', () => {
      const sorted = GitHubService.sortRepositories(mockProjects, 'name', 'asc');
      expect(sorted[0].name).toBe('alpha-repo');
      expect(sorted[1].name).toBe('beta-repo');
      expect(sorted[2].name).toBe('zebra-repo');
    });

    test('should sort by updated date descending by default', () => {
      const sorted = GitHubService.sortRepositories(mockProjects);
      expect(sorted[0].id).toBe(3); // 2023-12-01
      expect(sorted[1].id).toBe(2); // 2023-06-01
      expect(sorted[2].id).toBe(1); // 2023-01-01
    });
  });

  describe('error handling utilities', () => {
    test('should identify rate limit errors', () => {
      const rateLimitError = new Error('Rate limit exceeded. Resets at 14:30:00');
      expect(GitHubService.isRateLimitError(rateLimitError)).toBe(true);
      
      const normalError = new Error('Network error');
      expect(GitHubService.isRateLimitError(normalError)).toBe(false);
    });

    test('should identify network errors', () => {
      const networkError = new Error('Failed to fetch');
      expect(GitHubService.isNetworkError(networkError)).toBe(true);
      
      const apiError = new Error('GitHub API error: 404');
      expect(GitHubService.isNetworkError(apiError)).toBe(false);
    });
  });
});