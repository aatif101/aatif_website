/**
 * useGitHubProjects Hook
 * Manages GitHub projects state, loading, caching, and error handling
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import GitHubService from '../services/GitHubService';
import { analyzeGitHubError, formatErrorMessage, shouldRetry, getRetryDelay } from '../utils/githubErrorHandler';
import githubConfig from '../config/githubConfig';

/**
 * Custom hook for managing GitHub projects data
 * @param {string} username - GitHub username
 * @param {Object} config - Configuration options
 * @returns {Object} Hook state and methods
 */
const useGitHubProjects = (username, config = {}) => {
  // Memoize the full configuration to prevent infinite re-renders
  const fullConfig = useMemo(() => ({
    ...githubConfig,
    ...config,
    filters: { ...githubConfig.filters, ...config.filters },
    sorting: { ...githubConfig.sorting, ...config.sorting },
    display: { ...githubConfig.display, ...config.display },
    cache: { ...githubConfig.cache, ...config.cache },
    api: { ...githubConfig.api, ...config.api }
  }), [config]);

  // Store config in ref to avoid dependency issues
  const configRef = useRef(fullConfig);
  configRef.current = fullConfig;

  // State management
  const [state, setState] = useState({
    projects: [],
    loading: false,
    error: null,
    fromCache: false,
    lastUpdated: null,
    rateLimitInfo: null
  });

  // Refs for cleanup and retry logic
  const abortControllerRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const mountedRef = useRef(true);
  


  /**
   * Fetches projects from GitHub API
   * @param {boolean} forceRefresh - Force refresh ignoring cache
   * @param {number} retryAttempt - Current retry attempt number
   */
  const fetchProjects = useCallback(async (forceRefresh = false, retryAttempt = 0) => {
    const currentConfig = configRef.current;
    
    console.log('🔍 GitHub Integration Debug:', {
      username,
      hasToken: !!process.env.REACT_APP_GITHUB_TOKEN,
      config: currentConfig
    });
    
    // Don't fetch if no username provided
    if (!username || username === 'your-github-username') {
      console.error('❌ GitHub username not configured:', username);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'GitHub username not configured',
        projects: []
      }));
      return;
    }

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      loading: true,
      error: retryAttempt === 0 ? null : prev.error // Keep error visible during retries
    }));

    try {
      const options = {
        perPage: currentConfig.api.perPage,
        sort: currentConfig.sorting.by,
        direction: currentConfig.sorting.order,
        type: 'owner',
        useCache: !forceRefresh,
        config: currentConfig
      };

      console.log('🚀 Fetching GitHub repositories with options:', options);
      const result = await GitHubService.fetchUserRepositories(username, options);
      console.log('✅ GitHub API response:', result);

      // Apply filters and sorting
      let filteredProjects = GitHubService.filterRepositories(result.data, currentConfig.filters);
      filteredProjects = GitHubService.sortRepositories(
        filteredProjects, 
        currentConfig.sorting.by, 
        currentConfig.sorting.order
      );

      // Limit number of projects displayed
      if (currentConfig.display.maxProjects > 0) {
        filteredProjects = filteredProjects.slice(0, currentConfig.display.maxProjects);
      }

      setState(prev => ({
        ...prev,
        projects: filteredProjects,
        loading: false,
        error: null,
        fromCache: result.fromCache,
        lastUpdated: result.timestamp,
        rateLimitInfo: result.rateLimitInfo
      }));

    } catch (error) {
      console.error('❌ GitHub API Error:', error);
      
      // Check if component is still mounted
      if (!mountedRef.current) return;

      // Don't update state if request was aborted
      if (error.name === 'AbortError') return;

      const errorInfo = analyzeGitHubError(error);
      console.log('🔍 Error analysis:', errorInfo);
      const shouldAttemptRetry = shouldRetry(errorInfo) && retryAttempt < currentConfig.api.maxRetries;

      if (shouldAttemptRetry) {
        const delay = getRetryDelay(errorInfo, retryAttempt);
        console.log(`Retrying GitHub API request in ${delay}ms (attempt ${retryAttempt + 1})`);
        
        retryTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            fetchProjects(forceRefresh, retryAttempt + 1);
          }
        }, delay);
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: formatErrorMessage(errorInfo)
        }));
      }
    }
  }, [username]);

  /**
   * Manually refresh projects data
   */
  const refetch = useCallback(() => {
    fetchProjects(true);
  }, [fetchProjects]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  /**
   * Get cache information
   */
  const getCacheInfo = useCallback(() => {
    return {
      fromCache: state.fromCache,
      lastUpdated: state.lastUpdated,
      rateLimitInfo: state.rateLimitInfo
    };
  }, [state.fromCache, state.lastUpdated, state.rateLimitInfo]);

  // Initial fetch on mount or when username changes
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true; // Ensure it's set to true on mount
    
    return () => {
      mountedRef.current = false;
      
      // Cancel any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Clear any pending retries
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Auto-refresh when cache expires (optional)
  useEffect(() => {
    const currentConfig = configRef.current;
    
    if (!currentConfig.cache.autoRefresh || !state.lastUpdated || state.loading) {
      return;
    }

    const timeUntilExpiry = (state.lastUpdated + currentConfig.cache.ttl) - Date.now();
    
    if (timeUntilExpiry > 0) {
      const refreshTimeout = setTimeout(() => {
        if (mountedRef.current && !state.loading) {
          fetchProjects();
        }
      }, timeUntilExpiry);

      return () => clearTimeout(refreshTimeout);
    }
  }, [state.lastUpdated, state.loading, fetchProjects]);

  return {
    projects: state.projects,
    loading: state.loading,
    error: state.error,
    refetch,
    clearError,
    getCacheInfo,
    // Additional metadata
    fromCache: state.fromCache,
    lastUpdated: state.lastUpdated,
    rateLimitInfo: state.rateLimitInfo,
    // Configuration info
    config: fullConfig
  };
};

export default useGitHubProjects;