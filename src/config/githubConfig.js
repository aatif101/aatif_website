/**
 * GitHub Integration Configuration
 * Defines default settings for fetching and displaying GitHub repositories
 */

const githubConfig = {
  // GitHub username - should be set by user
  username: process.env.REACT_APP_GITHUB_USERNAME || 'your-github-username',
  
  // Optional GitHub token for higher rate limits
  token: process.env.REACT_APP_GITHUB_TOKEN || null,
  
  // Repository filtering options
  filters: {
    excludeForked: true,        // Exclude forked repositories
    excludeArchived: true,      // Exclude archived repositories
    minStars: 0,               // Minimum star count
    includeTopics: [],         // Topics that must be present (empty = all)
    excludeTopics: [           // Topics to exclude
      'learning', 
      'tutorial', 
      'practice',
      'exercise'
    ]
  },
  
  // Sorting configuration
  sorting: {
    by: 'updated',             // 'stars', 'created', 'updated', 'name'
    order: 'desc'              // 'asc' or 'desc'
  },
  
  // Display options
  display: {
    maxProjects: 6,            // Maximum number of projects to show
    showStats: true,           // Show stars, forks, etc.
    showLanguages: true,       // Show programming languages as tech badges
    showLastUpdated: true      // Show last updated date
  },
  
  // Caching configuration
  cache: {
    ttl: 3600000,             // Cache TTL in milliseconds (1 hour)
    key: 'github_projects'     // localStorage key for caching
  },
  
  // API configuration
  api: {
    perPage: 30,              // Repositories per API request
    maxRetries: 3,            // Maximum retry attempts
    retryDelay: 1000          // Base retry delay in milliseconds
  }
};

export default githubConfig;