import { 
  getCachedData, 
  setCachedData, 
  createConditionalHeaders, 
  handleConditionalResponse,
  isCacheValid 
} from '../utils/githubCache';

/**
 * GitHubService - Handles GitHub API interactions and data transformation
 * Provides methods for fetching repository data with proper error handling
 */
class GitHubService {
  static BASE_URL = 'https://api.github.com';
  static DEFAULT_PER_PAGE = 30;
  static MAX_RETRIES = 3;
  static RETRY_DELAY = 1000; // Base delay in milliseconds
  static RATE_LIMIT_THRESHOLD = 10; // Minimum remaining requests before warning

  /**
   * Fetches public repositories for a given username with caching support
   * @param {string} username - GitHub username
   * @param {Object} options - Configuration options
   * @param {number} options.perPage - Number of repositories per page (default: 30)
   * @param {string} options.sort - Sort criteria: 'created', 'updated', 'pushed', 'full_name'
   * @param {string} options.direction - Sort direction: 'asc' or 'desc'
   * @param {string} options.type - Repository type: 'all', 'owner', 'member'
   * @param {boolean} options.useCache - Whether to use caching (default: true)
   * @param {Object} options.config - Full configuration object for cache key generation
   * @returns {Promise<Object>} Object with repositories array and metadata
   */
  static async fetchUserRepositories(username, options = {}) {
    const {
      perPage = this.DEFAULT_PER_PAGE,
      sort = 'updated',
      direction = 'desc',
      type = 'owner',
      useCache = true,
      config = {}
    } = options;

    // Check cache first if enabled
    if (useCache) {
      const cachedData = getCachedData(username, config);
      if (cachedData && isCacheValid(cachedData, config)) {
        return {
          data: cachedData.data,
          fromCache: true,
          timestamp: cachedData.timestamp,
          rateLimitInfo: null
        };
      }
    }

    const url = `${this.BASE_URL}/users/${username}/repos`;
    const params = new URLSearchParams({
      per_page: perPage.toString(),
      sort,
      direction,
      type
    });

    try {
      // Use conditional request if we have cached data with ETag
      const cachedData = useCache ? getCachedData(username, config) : null;
      const headers = cachedData?.etag ? createConditionalHeaders(cachedData.etag) : {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Website'
      };

      // Add GitHub token if available
      const token = process.env.REACT_APP_GITHUB_TOKEN || config.token;
      if (token) {
        headers['Authorization'] = `token ${token}`;
        console.log('🔑 Using GitHub token for authentication');
      } else {
        console.log('⚠️ No GitHub token found, using unauthenticated requests');
      }

      console.log('🌐 Making GitHub API request:', `${url}?${params}`);
      const response = await this._makeRequestWithRetry(`${url}?${params}`, { headers });
      console.log('📡 GitHub API response status:', response.status);
      
      // Handle rate limiting
      const rateLimitInfo = this._extractRateLimitInfo(response);
      if (rateLimitInfo.remaining <= this.RATE_LIMIT_THRESHOLD) {
        console.warn(`GitHub API rate limit warning: ${rateLimitInfo.remaining} requests remaining`);
      }

      // Handle conditional response
      if (useCache && cachedData?.etag) {
        const conditionalResult = handleConditionalResponse(response, cachedData);
        if (conditionalResult.fromCache) {
          return {
            data: conditionalResult.data,
            fromCache: true,
            timestamp: cachedData.timestamp,
            rateLimitInfo
          };
        }
      }
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const repositories = await response.json();
      
      // Fetch language data for each repository (with rate limit awareness)
      const repositoriesWithLanguages = await this._fetchLanguagesForRepositories(
        username, 
        repositories,
        rateLimitInfo
      );

      // Transform and cache the data
      const transformedData = this.transformRepositoryData(repositoriesWithLanguages);
      
      if (useCache) {
        const etag = response.headers.get('ETag');
        setCachedData(username, transformedData, config, etag);
      }

      return {
        data: transformedData,
        fromCache: false,
        timestamp: Date.now(),
        rateLimitInfo
      };
    } catch (error) {
      // Try to return cached data on error
      if (useCache) {
        const cachedData = getCachedData(username, config);
        if (cachedData) {
          console.warn('Using cached data due to API error:', error.message);
          return {
            data: cachedData.data,
            fromCache: true,
            timestamp: cachedData.timestamp,
            rateLimitInfo: null,
            error: error.message
          };
        }
      }
      
      console.error('Error fetching repositories:', error);
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
  }

  /**
   * Fetches language data for multiple repositories with rate limit awareness
   * @param {string} username - GitHub username
   * @param {Array} repositories - Array of repository objects
   * @param {Object} rateLimitInfo - Current rate limit information
   * @returns {Promise<Array>} Repositories with language data
   * @private
   */
  static async _fetchLanguagesForRepositories(username, repositories, rateLimitInfo) {
    // If rate limit is low, skip language fetching to preserve API calls
    if (rateLimitInfo && rateLimitInfo.remaining < repositories.length + 5) {
      console.warn('Skipping language fetching due to low rate limit');
      return repositories.map(repo => ({ ...repo, languages: {} }));
    }

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
   * @returns {Array} Filtered repositories
   */
  static filterRepositories(repos, filters = {}) {
    const {
      excludeForked = true,
      excludeArchived = true,
      excludePrivate = true,
      minStars = 0,
      maxAge = null,
      minSize = 0,
      maxSize = null,
      includeTopics = [],
      excludeTopics = [],
      includeLanguages = [],
      excludeLanguages = [],
      requireDescription = false,
      requireHomepage = false,
      customFilter = null
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

      // Filter out private repos if specified
      if (excludePrivate && repo.metadata.isPrivate) {
        return false;
      }

      // Filter by minimum stars
      if (repo.stats.stars < minStars) {
        return false;
      }

      // Filter by repository age
      if (maxAge !== null) {
        const daysSinceUpdate = (Date.now() - new Date(repo.stats.lastUpdated)) / (1000 * 60 * 60 * 24);
        if (daysSinceUpdate > maxAge) {
          return false;
        }
      }

      // Filter by repository size
      if (repo.metadata.size < minSize) {
        return false;
      }
      if (maxSize !== null && repo.metadata.size > maxSize) {
        return false;
      }

      // Filter by description requirement
      if (requireDescription && (!repo.description || repo.description === 'No description available')) {
        return false;
      }

      // Filter by homepage requirement
      if (requireHomepage && !repo.homepage) {
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

      // Filter by included languages (must have at least one)
      if (includeLanguages.length > 0) {
        const hasIncludedLanguage = includeLanguages.some(lang => 
          repo.metadata.language.toLowerCase().includes(lang.toLowerCase()) ||
          repo.tech.some(t => t.toLowerCase().includes(lang.toLowerCase()))
        );
        if (!hasIncludedLanguage) {
          return false;
        }
      }

      // Filter out excluded languages
      if (excludeLanguages.length > 0) {
        const hasExcludedLanguage = excludeLanguages.some(lang => 
          repo.metadata.language.toLowerCase().includes(lang.toLowerCase()) ||
          repo.tech.some(t => t.toLowerCase().includes(lang.toLowerCase()))
        );
        if (hasExcludedLanguage) {
          return false;
        }
      }

      // Apply custom filter if provided
      if (customFilter && typeof customFilter === 'function') {
        if (!customFilter(repo)) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Sorts repositories by specified criteria with secondary sorting
   * @param {Array} repos - Array of repository objects
   * @param {string} sortBy - Sort criteria: 'stars', 'updated', 'created', 'name', 'size', 'forks'
   * @param {string} order - Sort order: 'asc' or 'desc'
   * @param {Object} secondarySort - Secondary sort criteria
   * @returns {Array} Sorted repositories
   */
  static sortRepositories(repos, sortBy = 'updated', order = 'desc', secondarySort = null) {
    const sortedRepos = [...repos].sort((a, b) => {
      // Primary sort
      const primaryResult = this._compareRepositories(a, b, sortBy, order);
      
      // If primary sort values are equal, use secondary sort
      if (primaryResult === 0 && secondarySort) {
        return this._compareRepositories(a, b, secondarySort.by, secondarySort.order);
      }
      
      return primaryResult;
    });

    return sortedRepos;
  }

  /**
   * Compares two repositories based on specified criteria
   * @param {Object} a - First repository
   * @param {Object} b - Second repository
   * @param {string} sortBy - Sort criteria
   * @param {string} order - Sort order
   * @returns {number} Comparison result (-1, 0, 1)
   * @private
   */
  static _compareRepositories(a, b, sortBy, order) {
    let valueA, valueB;

    switch (sortBy) {
      case 'stars':
        valueA = a.stats.stars;
        valueB = b.stats.stars;
        break;
      case 'forks':
        valueA = a.stats.forks;
        valueB = b.stats.forks;
        break;
      case 'watchers':
        valueA = a.stats.watchers;
        valueB = b.stats.watchers;
        break;
      case 'size':
        valueA = a.metadata.size;
        valueB = b.metadata.size;
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
      case 'language':
        valueA = a.metadata.language.toLowerCase();
        valueB = b.metadata.language.toLowerCase();
        break;
      default:
        valueA = new Date(a.stats.lastUpdated);
        valueB = new Date(b.stats.lastUpdated);
    }

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
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
        const defaultHeaders = {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Website'
        };

        // Add GitHub token if available
        const token = process.env.REACT_APP_GITHUB_TOKEN;
        if (token) {
          defaultHeaders['Authorization'] = `token ${token}`;
        }

        const response = await fetch(url, {
          ...options,
          headers: {
            ...defaultHeaders,
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
   * Extracts rate limit information from GitHub API response
   * @param {Response} response - Fetch response object
   * @returns {Object} Rate limit information
   * @private
   */
  static _extractRateLimitInfo(response) {
    return {
      limit: parseInt(response.headers.get('X-RateLimit-Limit')) || 60,
      remaining: parseInt(response.headers.get('X-RateLimit-Remaining')) || 0,
      reset: parseInt(response.headers.get('X-RateLimit-Reset')) || 0,
      resetDate: new Date(parseInt(response.headers.get('X-RateLimit-Reset')) * 1000)
    };
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