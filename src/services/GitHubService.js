/**
 * GitHubService - Handles GitHub API interactions and data transformation
 * Provides methods for fetching repository data with proper error handling
 */
class GitHubService {
  static BASE_URL = 'https://api.github.com';
  static DEFAULT_PER_PAGE = 30;
  static MAX_RETRIES = 3;
  static RETRY_DELAY = 1000; // Base delay in milliseconds

  /**
   * Fetches public repositories for a given username
   * @param {string} username - GitHub username
   * @param {Object} options - Configuration options
   * @param {number} options.perPage - Number of repositories per page (default: 30)
   * @param {string} options.sort - Sort criteria: 'created', 'updated', 'pushed', 'full_name'
   * @param {string} options.direction - Sort direction: 'asc' or 'desc'
   * @param {string} options.type - Repository type: 'all', 'owner', 'member'
   * @returns {Promise<Array>} Array of repository objects
   */
  static async fetchUserRepositories(username, options = {}) {
    const {
      perPage = this.DEFAULT_PER_PAGE,
      sort = 'updated',
      direction = 'desc',
      type = 'owner'
    } = options;

    const url = `${this.BASE_URL}/users/${username}/repos`;
    const params = new URLSearchParams({
      per_page: perPage.toString(),
      sort,
      direction,
      type
    });

    try {
      const response = await this._makeRequestWithRetry(`${url}?${params}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const repositories = await response.json();
      
      // Fetch language data for each repository
      const repositoriesWithLanguages = await Promise.all(
        repositories.map(async (repo) => {
          try {
            const languages = await this.fetchRepositoryLanguages(username, repo.name);
            return { ...repo, languages };
          } catch (error) {
            console.warn(`Failed to fetch languages for ${repo.name}:`, error);
            return { ...repo, languages: {} };
          }
        })
      );

      return repositoriesWithLanguages;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
  }

  /**
   * Fetches language statistics for a specific repository
   * @param {string} username - GitHub username
   * @param {string} repoName - Repository name
   * @returns {Promise<Object>} Language statistics object
   */
  static async fetchRepositoryLanguages(username, repoName) {
    const url = `${this.BASE_URL}/repos/${username}/${repoName}/languages`;

    try {
      const response = await this._makeRequestWithRetry(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {}; // Repository might be private or deleted
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching languages for ${repoName}:`, error);
      throw error;
    }
  }

  /**
   * Transforms raw GitHub repository data into component-friendly format
   * @param {Array} rawRepos - Raw repository data from GitHub API
   * @param {Object} options - Transformation options
   * @returns {Array} Transformed project data
   */
  static transformRepositoryData(rawRepos, options = {}) {
    return rawRepos.map(repo => {
      // Extract primary language and additional languages
      const languages = repo.languages || {};
      const languageNames = Object.keys(languages);
      const primaryLanguage = repo.language || languageNames[0] || 'Unknown';
      
      // Create tech array from primary language and topics
      const tech = [
        primaryLanguage,
        ...(repo.topics || []).slice(0, 4) // Limit topics to avoid overcrowding
      ].filter(Boolean);

      // Generate project details from description
      const details = repo.description || `A ${primaryLanguage} project`;

      return {
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available',
        details,
        link: repo.html_url,
        homepage: repo.homepage || null,
        tech,
        stats: {
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          watchers: repo.watchers_count || 0,
          lastUpdated: repo.updated_at
        },
        metadata: {
          isArchived: repo.archived || false,
          isFork: repo.fork || false,
          isPrivate: repo.private || false,
          createdAt: repo.created_at,
          language: primaryLanguage,
          size: repo.size || 0,
          openIssues: repo.open_issues_count || 0
        }
      };
    });
  }

  /**
   * Filters repositories based on provided criteria
   * @param {Array} repos - Array of repository objects
   * @param {Object} filters - Filter criteria
   * @param {boolean} filters.excludeForked - Exclude forked repositories
   * @param {boolean} filters.excludeArchived - Exclude archived repositories
   * @param {number} filters.minStars - Minimum star count
   * @param {Array} filters.includeTopics - Topics that must be present
   * @param {Array} filters.excludeTopics - Topics to exclude
   * @returns {Array} Filtered repositories
   */
  static filterRepositories(repos, filters = {}) {
    const {
      excludeForked = true,
      excludeArchived = true,
      minStars = 0,
      includeTopics = [],
      excludeTopics = []
    } = filters;

    return repos.filter(repo => {
      // Filter out forks if specified
      if (excludeForked && repo.metadata.isFork) {
        return false;
      }

      // Filter out archived repos if specified
      if (excludeArchived && repo.metadata.isArchived) {
        return false;
      }

      // Filter by minimum stars
      if (repo.stats.stars < minStars) {
        return false;
      }

      // Filter by included topics (must have at least one)
      if (includeTopics.length > 0) {
        const hasIncludedTopic = includeTopics.some(topic => 
          repo.tech.some(t => t.toLowerCase().includes(topic.toLowerCase()))
        );
        if (!hasIncludedTopic) {
          return false;
        }
      }

      // Filter out excluded topics
      if (excludeTopics.length > 0) {
        const hasExcludedTopic = excludeTopics.some(topic => 
          repo.tech.some(t => t.toLowerCase().includes(topic.toLowerCase()))
        );
        if (hasExcludedTopic) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Sorts repositories by specified criteria
   * @param {Array} repos - Array of repository objects
   * @param {string} sortBy - Sort criteria: 'stars', 'updated', 'created', 'name'
   * @param {string} order - Sort order: 'asc' or 'desc'
   * @returns {Array} Sorted repositories
   */
  static sortRepositories(repos, sortBy = 'updated', order = 'desc') {
    const sortedRepos = [...repos].sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case 'stars':
          valueA = a.stats.stars;
          valueB = b.stats.stars;
          break;
        case 'created':
          valueA = new Date(a.metadata.createdAt);
          valueB = new Date(b.metadata.createdAt);
          break;
        case 'updated':
          valueA = new Date(a.stats.lastUpdated);
          valueB = new Date(b.stats.lastUpdated);
          break;
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        default:
          valueA = new Date(a.stats.lastUpdated);
          valueB = new Date(b.stats.lastUpdated);
      }

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedRepos;
  }

  /**
   * Makes HTTP request with retry logic and exponential backoff
   * @param {string} url - Request URL
   * @param {Object} options - Fetch options
   * @returns {Promise<Response>} Fetch response
   * @private
   */
  static async _makeRequestWithRetry(url, options = {}) {
    let lastError;

    for (let attempt = 0; attempt < this.MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-Website',
            ...options.headers
          }
        });

        // Check for rate limiting
        if (response.status === 403) {
          const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
          const rateLimitReset = response.headers.get('X-RateLimit-Reset');
          
          if (rateLimitRemaining === '0') {
            const resetTime = new Date(parseInt(rateLimitReset) * 1000);
            throw new Error(`Rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
          }
        }

        return response;
      } catch (error) {
        lastError = error;
        
        // Don't retry on certain errors
        if (error.message.includes('Rate limit exceeded') || 
            error.message.includes('404') ||
            error.message.includes('401')) {
          throw error;
        }

        // Wait before retrying (exponential backoff)
        if (attempt < this.MAX_RETRIES - 1) {
          const delay = this.RETRY_DELAY * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  }

  /**
   * Checks if the provided error is a rate limit error
   * @param {Error} error - Error object to check
   * @returns {boolean} True if rate limit error
   */
  static isRateLimitError(error) {
    return error.message.includes('Rate limit exceeded') || 
           error.message.includes('403');
  }

  /**
   * Checks if the provided error is a network error
   * @param {Error} error - Error object to check
   * @returns {boolean} True if network error
   */
  static isNetworkError(error) {
    return error.message.includes('Failed to fetch') ||
           error.message.includes('Network request failed') ||
           error.message.includes('TypeError: NetworkError');
  }
}

export default GitHubService;