/**
 * GitHub API Error Handling Utilities
 * Provides standardized error handling and user-friendly error messages
 */

/**
 * GitHub API error types
 */
export const GitHubErrorTypes = {
  RATE_LIMIT: 'RATE_LIMIT',
  NOT_FOUND: 'NOT_FOUND',
  NETWORK: 'NETWORK',
  UNAUTHORIZED: 'UNAUTHORIZED',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN'
};

/**
 * Analyzes GitHub API errors and returns structured error information
 * @param {Error} error - The error object to analyze
 * @returns {Object} Structured error information
 */
export function analyzeGitHubError(error) {
  const errorInfo = {
    type: GitHubErrorTypes.UNKNOWN,
    message: 'An unexpected error occurred',
    userMessage: 'Something went wrong while fetching projects',
    canRetry: true,
    suggestedAction: 'Please try again later'
  };

  if (!error) {
    return errorInfo;
  }

  const errorMessage = error.message.toLowerCase();

  // Rate limit errors
  if (errorMessage.includes('rate limit') || errorMessage.includes('403')) {
    errorInfo.type = GitHubErrorTypes.RATE_LIMIT;
    errorInfo.message = error.message;
    errorInfo.userMessage = 'GitHub API rate limit reached';
    errorInfo.canRetry = false;
    errorInfo.suggestedAction = 'Please wait a few minutes before refreshing';
    
    // Extract reset time if available
    const resetMatch = error.message.match(/resets at (\d{1,2}:\d{2}:\d{2})/i);
    if (resetMatch) {
      errorInfo.suggestedAction = `Rate limit resets at ${resetMatch[1]}`;
    }
  }
  
  // Not found errors (user doesn't exist or repos are private)
  else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
    errorInfo.type = GitHubErrorTypes.NOT_FOUND;
    errorInfo.message = error.message;
    errorInfo.userMessage = 'GitHub user not found or repositories are private';
    errorInfo.canRetry = false;
    errorInfo.suggestedAction = 'Please check the GitHub username configuration';
  }
  
  // Network errors
  else if (errorMessage.includes('failed to fetch') || 
           errorMessage.includes('network') ||
           errorMessage.includes('connection')) {
    errorInfo.type = GitHubErrorTypes.NETWORK;
    errorInfo.message = error.message;
    errorInfo.userMessage = 'Network connection error';
    errorInfo.canRetry = true;
    errorInfo.suggestedAction = 'Please check your internet connection and try again';
  }
  
  // Unauthorized errors
  else if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
    errorInfo.type = GitHubErrorTypes.UNAUTHORIZED;
    errorInfo.message = error.message;
    errorInfo.userMessage = 'GitHub API authentication failed';
    errorInfo.canRetry = false;
    errorInfo.suggestedAction = 'Please check your GitHub token configuration';
  }
  
  // Server errors
  else if (errorMessage.includes('500') || errorMessage.includes('502') || 
           errorMessage.includes('503') || errorMessage.includes('504')) {
    errorInfo.type = GitHubErrorTypes.SERVER_ERROR;
    errorInfo.message = error.message;
    errorInfo.userMessage = 'GitHub servers are experiencing issues';
    errorInfo.canRetry = true;
    errorInfo.suggestedAction = 'GitHub is temporarily unavailable, please try again later';
  }
  
  // Generic API errors
  else if (errorMessage.includes('github api error')) {
    errorInfo.message = error.message;
    errorInfo.userMessage = 'GitHub API returned an error';
    errorInfo.suggestedAction = 'Please try again or check your configuration';
  }

  return errorInfo;
}

/**
 * Formats error messages for display to users
 * @param {Object} errorInfo - Error information from analyzeGitHubError
 * @returns {string} User-friendly error message
 */
export function formatErrorMessage(errorInfo) {
  let message = errorInfo.userMessage;
  
  if (errorInfo.suggestedAction) {
    message += `. ${errorInfo.suggestedAction}`;
  }
  
  return message;
}

/**
 * Determines if an error should trigger a retry
 * @param {Object} errorInfo - Error information from analyzeGitHubError
 * @returns {boolean} True if retry should be attempted
 */
export function shouldRetry(errorInfo) {
  return errorInfo.canRetry && 
         errorInfo.type !== GitHubErrorTypes.RATE_LIMIT &&
         errorInfo.type !== GitHubErrorTypes.NOT_FOUND &&
         errorInfo.type !== GitHubErrorTypes.UNAUTHORIZED;
}

/**
 * Gets retry delay based on error type and attempt number
 * @param {Object} errorInfo - Error information from analyzeGitHubError
 * @param {number} attemptNumber - Current retry attempt (0-based)
 * @returns {number} Delay in milliseconds
 */
export function getRetryDelay(errorInfo, attemptNumber) {
  const baseDelay = 1000; // 1 second
  
  switch (errorInfo.type) {
    case GitHubErrorTypes.NETWORK:
      // Longer delays for network errors
      return baseDelay * Math.pow(2, attemptNumber) * 2;
    
    case GitHubErrorTypes.SERVER_ERROR:
      // Even longer delays for server errors
      return baseDelay * Math.pow(2, attemptNumber) * 3;
    
    default:
      // Standard exponential backoff
      return baseDelay * Math.pow(2, attemptNumber);
  }
}

/**
 * Creates a fallback error object for unknown errors
 * @param {any} error - The original error
 * @returns {Object} Standardized error information
 */
export function createFallbackError(error) {
  return {
    type: GitHubErrorTypes.UNKNOWN,
    message: error?.message || 'Unknown error occurred',
    userMessage: 'Unable to load GitHub projects',
    canRetry: true,
    suggestedAction: 'Please try refreshing the page'
  };
}