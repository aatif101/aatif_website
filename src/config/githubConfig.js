/**
 * GitHub Integration Configuration
 * Defines default settings for fetching and displaying GitHub repositories
 */

const githubConfig = {
    // GitHub username - should be set by user
    username: process.env.REACT_APP_GITHUB_USERNAME || 'aatif101',

    // Optional GitHub token for higher rate limits
    token: process.env.REACT_APP_GITHUB_TOKEN || null,

    // Repository filtering options
    filters: {
        excludeForked: true,        // Exclude forked repositories
        excludeArchived: true,      // Exclude archived repositories
        excludePrivate: true,       // Exclude private repositories (if token provided)
        minStars: 0,               // Minimum star count
        maxAge: null,              // Maximum age in days (null = no limit)
        minSize: 0,                // Minimum repository size in KB
        maxSize: null,             // Maximum repository size in KB (null = no limit)
        includeTopics: [],         // Topics that must be present (empty = all)
        excludeTopics: [           // Topics to exclude
            'learning',
            'tutorial',
            'practice',
            'exercise',
            'homework',
            'assignment'
        ],
        includeLanguages: [],      // Languages that must be present (empty = all)
        excludeLanguages: [],      // Languages to exclude
        requireDescription: false,  // Only include repos with descriptions
        requireHomepage: false,    // Only include repos with homepage URLs
        customFilter: null         // Custom filter function (repo) => boolean
    },

    // Sorting configuration
    sorting: {
        by: 'updated',             // 'stars', 'created', 'updated', 'name', 'size', 'forks'
        order: 'desc',             // 'asc' or 'desc'
        secondarySort: {           // Secondary sort criteria
            by: 'stars',
            order: 'desc'
        }
    },

    // Display options
    display: {
        maxProjects: 6,            // Maximum number of projects to show
        showStats: true,           // Show stars, forks, etc.
        showLanguages: true,       // Show programming languages as tech badges
        showLastUpdated: true,     // Show last updated date
        showDescription: true,     // Show repository description
        showHomepage: true,        // Show homepage link if available
        showCreatedDate: false,    // Show repository creation date
        showSize: false,           // Show repository size
        showOpenIssues: false,     // Show open issues count
        truncateDescription: 100,  // Max characters for description (0 = no limit)
        maxTechBadges: 5          // Maximum number of tech badges to show
    },

    // Caching configuration
    cache: {
        ttl: 3600000,             // Cache TTL in milliseconds (1 hour)
        key: 'github_projects',    // localStorage key for caching
        autoRefresh: false,       // Auto-refresh when cache expires
        maxEntries: 10            // Maximum number of cache entries to keep
    },

    // API configuration
    api: {
        perPage: 30,              // Repositories per API request
        maxRetries: 3,            // Maximum retry attempts
        retryDelay: 1000,         // Base retry delay in milliseconds
        timeout: 10000,           // Request timeout in milliseconds
        fetchLanguages: true,     // Whether to fetch language data for each repo
        useConditionalRequests: true // Use ETag for conditional requests
    },

    // UI configuration
    ui: {
        loadingSkeletonCount: 6,  // Number of skeleton cards to show while loading
        errorRetryButton: true,   // Show retry button on errors
        cacheIndicator: true,     // Show indicator when data is from cache
        rateLimitWarning: true,   // Show warning when rate limit is low
        animateOnLoad: true,      // Animate cards when they load
        cardHoverEffects: true    // Enable hover effects on project cards
    }
};

/**
 * Validates and normalizes configuration
 * @param {Object} config - Configuration object to validate
 * @returns {Object} Validated configuration
 */
export function validateConfig(config) {
    const validated = { ...githubConfig, ...config };

    // Validate numeric values
    validated.filters.minStars = Math.max(0, validated.filters.minStars || 0);
    validated.filters.minSize = Math.max(0, validated.filters.minSize || 0);
    validated.display.maxProjects = Math.max(1, validated.display.maxProjects || 6);
    validated.display.truncateDescription = Math.max(0, validated.display.truncateDescription || 0);
    validated.display.maxTechBadges = Math.max(1, validated.display.maxTechBadges || 5);
    validated.cache.ttl = Math.max(60000, validated.cache.ttl || 3600000); // Min 1 minute
    validated.api.perPage = Math.min(100, Math.max(1, validated.api.perPage || 30)); // GitHub max is 100
    validated.api.maxRetries = Math.max(0, validated.api.maxRetries || 3);
    validated.api.retryDelay = Math.max(100, validated.api.retryDelay || 1000);

    return validated;
}

/**
 * Creates a configuration preset for common use cases
 * @param {string} preset - Preset name
 * @returns {Object} Configuration object
 */
export function createConfigPreset(preset) {
    const presets = {
        // Show only starred projects
        'starred-only': {
            filters: { minStars: 1 },
            sorting: { by: 'stars', order: 'desc' },
            display: { maxProjects: 8 }
        },

        // Show recent projects
        'recent-activity': {
            filters: { maxAge: 365 }, // Last year
            sorting: { by: 'updated', order: 'desc' },
            display: { maxProjects: 10, showLastUpdated: true }
        },

        // Show major projects only
        'major-projects': {
            filters: {
                minStars: 5,
                requireDescription: true,
                excludeTopics: ['learning', 'tutorial', 'practice', 'exercise', 'demo']
            },
            sorting: { by: 'stars', order: 'desc' },
            display: { maxProjects: 6, showStats: true }
        },

        // Show all projects (minimal filtering)
        'show-all': {
            filters: {
                excludeForked: false,
                excludeArchived: false,
                minStars: 0
            },
            sorting: { by: 'updated', order: 'desc' },
            display: { maxProjects: 20 }
        },

        // Portfolio showcase (best projects)
        'portfolio': {
            filters: {
                minStars: 2,
                requireDescription: true,
                excludeTopics: ['learning', 'tutorial', 'practice', 'exercise', 'homework']
            },
            sorting: {
                by: 'stars',
                order: 'desc',
                secondarySort: { by: 'updated', order: 'desc' }
            },
            display: {
                maxProjects: 6,
                showStats: true,
                showHomepage: true,
                showDescription: true
            }
        }
    };

    return presets[preset] || {};
}

export default githubConfig;