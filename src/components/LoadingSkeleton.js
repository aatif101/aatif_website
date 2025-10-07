/**
 * Loading Skeleton Components
 * Provides skeleton loading states for GitHub projects
 */

import React from 'react';

/**
 * Individual project card skeleton
 */
export const ProjectCardSkeleton = () => {
  return (
    <div className="terminal-border rounded-lg p-4 md:p-6 animate-pulse h-full flex flex-col">
      {/* Project name skeleton */}
      <div className="mb-4 flex-grow">
        <div className="h-5 md:h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
        
        {/* Description lines */}
        <div className="space-y-2 mb-2">
          <div className="h-3 md:h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
        
        {/* Details line */}
        <div className="h-3 md:h-4 bg-gray-700 rounded w-4/5"></div>
      </div>
      
      {/* Tech badges skeleton */}
      <div className="mb-4 md:mb-6">
        <div className="h-3 bg-gray-700 rounded w-16 mb-2"></div>
        <div className="flex flex-wrap gap-1 md:gap-2">
          <div className="h-6 bg-gray-700 rounded w-16 md:w-20"></div>
          <div className="h-6 bg-gray-700 rounded w-12 md:w-16"></div>
          <div className="h-6 bg-gray-700 rounded w-18 md:w-24"></div>
          <div className="h-6 bg-gray-700 rounded w-14 md:w-18"></div>
        </div>
      </div>
      
      {/* Stats skeleton */}
      <div className="mb-4 flex flex-wrap gap-2 md:gap-4">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-6 md:w-8"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-4 md:w-6"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-12 md:w-16"></div>
        </div>
      </div>
      
      {/* Links skeleton */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-auto">
        <div className="h-4 bg-gray-700 rounded w-24 md:w-32"></div>
        <div className="h-4 bg-gray-700 rounded w-20 md:w-24"></div>
      </div>
    </div>
  );
};

/**
 * Grid of project card skeletons
 */
export const ProjectsGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }, (_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
};

/**
 * Error state component
 */
export const ProjectsError = ({ error, onRetry, showRetry = true }) => {
  return (
    <div className="text-center py-12">
      <div className="terminal-border rounded-lg p-8 max-w-md mx-auto">
        <div className="mb-4">
          <span className="text-red-400 text-4xl">⚠</span>
        </div>
        <h3 className="text-xl font-bold text-red-400 font-mono mb-4">
          Error Loading Projects
        </h3>
        <p className="text-gray-400 font-mono text-sm mb-6 leading-relaxed">
          {error || 'Failed to load GitHub projects'}
        </p>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-terminal-green/20 text-terminal-green border border-terminal-green/30 rounded font-mono text-sm hover:bg-terminal-green/30 transition-colors"
          >
            <span>→ Retry</span>
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Empty state component
 */
export const ProjectsEmpty = ({ message = "No projects found" }) => {
  return (
    <div className="text-center py-12">
      <div className="terminal-border rounded-lg p-8 max-w-md mx-auto">
        <div className="mb-4">
          <span className="text-gray-500 text-4xl">📁</span>
        </div>
        <h3 className="text-xl font-bold text-gray-400 font-mono mb-4">
          No Projects
        </h3>
        <p className="text-gray-500 font-mono text-sm leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

/**
 * Cache indicator component
 */
export const CacheIndicator = ({ fromCache, lastUpdated }) => {
  if (!fromCache) return null;

  const timeAgo = lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'unknown';

  return (
    <div className="text-center mb-4">
      <span className="inline-flex items-center px-2 py-1 text-xs bg-cosmic-purple/20 text-cosmic-purple rounded border border-cosmic-purple/30 font-mono">
        <span className="mr-1">💾</span>
        Cached data from {timeAgo}
      </span>
    </div>
  );
};

/**
 * Rate limit warning component
 */
export const RateLimitWarning = ({ rateLimitInfo }) => {
  if (!rateLimitInfo || rateLimitInfo.remaining > 10) return null;

  const resetTime = rateLimitInfo.resetDate ? rateLimitInfo.resetDate.toLocaleTimeString() : 'unknown';

  return (
    <div className="text-center mb-4">
      <span className="inline-flex items-center px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30 font-mono">
        <span className="mr-1">⚡</span>
        Rate limit: {rateLimitInfo.remaining}/{rateLimitInfo.limit} remaining (resets at {resetTime})
      </span>
    </div>
  );
};