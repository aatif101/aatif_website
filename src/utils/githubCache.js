/**
 * GitHub API Caching Utilities
 * Provides localStorage-based caching with TTL support and ETag handling
 */

import githubConfig from '../config/githubConfig';

/**
 * Cache key generator for GitHub data
 * @param {string} username - GitHub username
 * @param {Object} config - Configuration object
 * @returns {string} Cache key
 */
export function generateCacheKey(username, config = {}) {
  const configHash = JSON.stringify({
    filters: config.filters || {},
    sorting: config.sorting || {},
    display: config.display || {}
  });
  
  // Create a simple hash of the config
  const hash = btoa(configHash).slice(0, 8);
  return `${githubConfig.cache.key}_${username}_${hash}`;
}

/**
 * Retrieves cached GitHub data
 * @param {string} username - GitHub username
 * @param {Object} config - Configuration object
 * @returns {Object|null} Cached data or null if not found/expired
 */
export function getCachedData(username, config = {}) {
  try {
    const cacheKey = generateCacheKey(username, config);
    const cachedItem = localStorage.getItem(cacheKey);
    
    if (!cachedItem) {
      return null;
    }

    const parsed = JSON.parse(cachedItem);
    const now = Date.now();
    const ttl = config.cache?.ttl || githubConfig.cache.ttl;

    // Check if cache has expired
    if (now - parsed.timestamp > ttl) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    // Validate cache structure
    if (!parsed.data || !Array.isArray(parsed.data)) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return {
      data: parsed.data,
      timestamp: parsed.timestamp,
      etag: parsed.etag || null,
      username: parsed.username,
      config: parsed.config
    };
  } catch (error) {
    console.warn('Error reading from cache:', error);
    return null;
  }
}

/**
 * Stores GitHub data in cache
 * @param {string} username - GitHub username
 * @param {Array} data - Project data to cache
 * @param {Object} config - Configuration object
 * @param {string} etag - ETag from GitHub API response
 */
export function setCachedData(username, data, config = {}, etag = null) {
  try {
    const cacheKey = generateCacheKey(username, config);
    const cacheData = {
      data,
      timestamp: Date.now(),
      username,
      config,
      etag
    };

    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Error writing to cache:', error);
    // If localStorage is full, try to clear old entries
    if (error.name === 'QuotaExceededError') {
      clearOldCacheEntries();
      try {
        const retryKey = generateCacheKey(username, config);
        const retryCacheData = {
          data,
          timestamp: Date.now(),
          username,
          config,
          etag
        };
        localStorage.setItem(retryKey, JSON.stringify(retryCacheData));
      } catch (retryError) {
        console.error('Failed to cache data after cleanup:', retryError);
      }
    }
  }
}

/**
 * Clears cached data for a specific user and config
 * @param {string} username - GitHub username
 * @param {Object} config - Configuration object
 */
export function clearCachedData(username, config = {}) {
  try {
    const cacheKey = generateCacheKey(username, config);
    localStorage.removeItem(cacheKey);
  } catch (error) {
    console.warn('Error clearing cache:', error);
  }
}

/**
 * Clears all GitHub-related cache entries
 */
export function clearAllCache() {
  try {
    const keysToRemove = [];
    const prefix = githubConfig.cache.key;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Error clearing all cache:', error);
  }
}

/**
 * Removes old cache entries to free up space
 * Keeps the 5 most recent entries
 */
export function clearOldCacheEntries() {
  try {
    const prefix = githubConfig.cache.key;
    const cacheEntries = [];
    
    // Collect all cache entries with timestamps
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          cacheEntries.push({
            key,
            timestamp: data.timestamp || 0
          });
        } catch (parseError) {
          // Remove invalid entries
          localStorage.removeItem(key);
        }
      }
    }
    
    // Sort by timestamp (newest first) and keep only the 5 most recent
    cacheEntries.sort((a, b) => b.timestamp - a.timestamp);
    const entriesToRemove = cacheEntries.slice(5);
    
    entriesToRemove.forEach(entry => {
      localStorage.removeItem(entry.key);
    });
  } catch (error) {
    console.warn('Error clearing old cache entries:', error);
  }
}

/**
 * Gets cache statistics
 * @returns {Object} Cache statistics
 */
export function getCacheStats() {
  try {
    const prefix = githubConfig.cache.key;
    let totalEntries = 0;
    let totalSize = 0;
    let oldestEntry = null;
    let newestEntry = null;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const value = localStorage.getItem(key);
        if (value) {
          totalEntries++;
          totalSize += value.length;
          
          try {
            const data = JSON.parse(value);
            const timestamp = data.timestamp;
            
            if (!oldestEntry || timestamp < oldestEntry) {
              oldestEntry = timestamp;
            }
            if (!newestEntry || timestamp > newestEntry) {
              newestEntry = timestamp;
            }
          } catch (parseError) {
            // Skip invalid entries
          }
        }
      }
    }
    
    return {
      totalEntries,
      totalSize,
      totalSizeKB: Math.round(totalSize / 1024),
      oldestEntry: oldestEntry ? new Date(oldestEntry) : null,
      newestEntry: newestEntry ? new Date(newestEntry) : null
    };
  } catch (error) {
    console.warn('Error getting cache stats:', error);
    return {
      totalEntries: 0,
      totalSize: 0,
      totalSizeKB: 0,
      oldestEntry: null,
      newestEntry: null
    };
  }
}

/**
 * Checks if cache data is still valid
 * @param {Object} cachedData - Cached data object
 * @param {Object} config - Current configuration
 * @returns {boolean} True if cache is valid
 */
export function isCacheValid(cachedData, config = {}) {
  if (!cachedData) return false;
  
  const now = Date.now();
  const ttl = config.cache?.ttl || githubConfig.cache.ttl;
  
  // Check TTL
  if (now - cachedData.timestamp > ttl) {
    return false;
  }
  
  // Check if configuration has changed significantly
  const currentConfigHash = JSON.stringify({
    filters: config.filters || {},
    sorting: config.sorting || {},
    display: config.display || {}
  });
  
  const cachedConfigHash = JSON.stringify({
    filters: cachedData.config?.filters || {},
    sorting: cachedData.config?.sorting || {},
    display: cachedData.config?.display || {}
  });
  
  return currentConfigHash === cachedConfigHash;
}

/**
 * Creates conditional request headers using ETag
 * @param {string} etag - ETag from previous response
 * @returns {Object} Headers object for conditional request
 */
export function createConditionalHeaders(etag) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Website'
  };
  
  if (etag) {
    headers['If-None-Match'] = etag;
  }
  
  return headers;
}

/**
 * Handles conditional response from GitHub API
 * @param {Response} response - Fetch response object
 * @param {Object} cachedData - Existing cached data
 * @returns {Object} Response data or cached data
 */
export function handleConditionalResponse(response, cachedData) {
  // 304 Not Modified - use cached data
  if (response.status === 304) {
    return {
      data: cachedData.data,
      fromCache: true,
      etag: cachedData.etag
    };
  }
  
  // New data available
  return {
    data: null, // Will be populated by caller
    fromCache: false,
    etag: response.headers.get('ETag')
  };
}