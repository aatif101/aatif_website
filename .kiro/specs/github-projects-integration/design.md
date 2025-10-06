# Design Document

## Overview

The GitHub Projects Integration feature will replace the current static projects data with a dynamic system that fetches repository information from GitHub's REST API. The system will maintain the existing terminal/cosmic theme while providing real-time project data including repository statistics, technologies, and links.

The integration will be built as a React hook and service layer that can be easily configured and cached for optimal performance. The existing ProjectsSection component will be enhanced to consume this data while preserving the current visual design.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   ProjectsSection   │    │   useGitHubProjects  │    │   GitHubService     │
│   Component     │◄───┤   Hook           │◄───┤   API Layer     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Local Storage  │    │   GitHub API    │
                       │   Cache          │    │   REST Endpoint │
                       └──────────────────┘    └─────────────────┘
```

### Data Flow

1. **Component Mount**: ProjectsSection component mounts and calls useGitHubProjects hook
2. **Cache Check**: Hook checks localStorage for cached data and validity
3. **API Request**: If cache is invalid/empty, GitHubService makes API request to GitHub
4. **Data Processing**: Raw GitHub data is transformed into component-friendly format
5. **State Update**: Hook updates component state with processed data
6. **Cache Update**: Successful responses are cached with timestamp
7. **Render**: Component renders project cards with fetched data

## Components and Interfaces

### GitHubService

**Purpose**: Handles all GitHub API interactions and data transformation

```javascript
class GitHubService {
  static async fetchUserRepositories(username, options = {})
  static async fetchRepositoryLanguages(username, repoName)
  static transformRepositoryData(rawRepos, languageData)
  static filterRepositories(repos, filters)
  static sortRepositories(repos, sortBy)
}
```

**Key Methods**:
- `fetchUserRepositories()`: Fetches public repositories for a user
- `fetchRepositoryLanguages()`: Gets language statistics for repositories
- `transformRepositoryData()`: Converts GitHub API response to component format
- `filterRepositories()`: Applies user-defined filters (archived, forks, etc.)
- `sortRepositories()`: Sorts by stars, updated date, or created date

### useGitHubProjects Hook

**Purpose**: Manages state, caching, and loading for GitHub projects data

```javascript
const useGitHubProjects = (username, config = {}) => {
  return {
    projects: [],
    loading: boolean,
    error: string | null,
    refetch: () => void
  }
}
```

**Features**:
- Automatic caching with configurable TTL (default: 1 hour)
- Loading states and error handling
- Retry logic with exponential backoff
- Rate limit detection and handling

### Enhanced ProjectsSection Component

**Purpose**: Renders GitHub projects while maintaining existing design

**Key Features**:
- Preserves terminal-themed styling
- Shows loading skeletons during fetch
- Displays error states gracefully
- Maintains responsive grid layout
- Adds GitHub-specific data (stars, forks, last updated)

### Configuration Interface

```javascript
const githubConfig = {
  username: 'your-github-username',
  filters: {
    excludeForked: true,
    excludeArchived: true,
    minStars: 0,
    includeTopics: [],
    excludeTopics: ['learning', 'tutorial']
  },
  sorting: {
    by: 'updated', // 'stars', 'created', 'updated', 'name'
    order: 'desc'
  },
  display: {
    maxProjects: 6,
    showStats: true,
    showLanguages: true
  },
  cache: {
    ttl: 3600000 // 1 hour in milliseconds
  }
}
```

## Data Models

### Repository Data Model

```javascript
const ProjectModel = {
  id: number,
  name: string,
  description: string,
  details: string, // Generated from README or description
  link: string, // GitHub repository URL
  homepage: string | null, // Live demo URL
  tech: string[], // Primary languages and topics
  stats: {
    stars: number,
    forks: number,
    watchers: number,
    lastUpdated: string
  },
  metadata: {
    isArchived: boolean,
    isFork: boolean,
    isPrivate: boolean,
    createdAt: string,
    language: string
  }
}
```

### Cache Data Model

```javascript
const CacheModel = {
  data: ProjectModel[],
  timestamp: number,
  username: string,
  config: object, // Configuration used for this cache
  etag: string | null // GitHub ETag for conditional requests
}
```

## Error Handling

### API Error Scenarios

1. **Rate Limit Exceeded**
   - Display cached data with "Using cached data" message
   - Show next refresh time
   - Implement exponential backoff for retries

2. **Network Failure**
   - Retry with exponential backoff (3 attempts)
   - Fall back to cached data if available
   - Show offline indicator

3. **Invalid Username**
   - Display user-friendly error message
   - Provide fallback to static projects
   - Log error for debugging

4. **API Response Errors**
   - Handle 404 (user not found)
   - Handle 403 (rate limited or private)
   - Handle 500 (GitHub server errors)

### Graceful Degradation

- Always attempt to show cached data when API fails
- Provide manual refresh button during error states
- Fall back to static project data as last resort
- Maintain loading states to prevent layout shifts

## Testing Strategy

### Unit Tests

1. **GitHubService Tests**
   - API request/response handling
   - Data transformation accuracy
   - Filter and sort logic
   - Error handling scenarios

2. **useGitHubProjects Hook Tests**
   - State management
   - Cache operations
   - Loading states
   - Error propagation

3. **Component Tests**
   - Rendering with different data states
   - Loading skeleton display
   - Error state rendering
   - User interaction handling

### Integration Tests

1. **API Integration**
   - Real GitHub API calls (with test account)
   - Rate limit handling
   - Cache invalidation
   - Network failure simulation

2. **End-to-End Tests**
   - Complete user flow from load to display
   - Configuration changes
   - Cache persistence across sessions
   - Mobile responsiveness

### Performance Tests

1. **Load Time Measurement**
   - Initial page load with cache
   - Cold start without cache
   - Large repository list handling

2. **Memory Usage**
   - Cache size monitoring
   - Component re-render optimization
   - Memory leak detection

## Implementation Considerations

### GitHub API Limits

- **Rate Limit**: 60 requests/hour for unauthenticated requests
- **Conditional Requests**: Use ETags to avoid unnecessary data transfer
- **Pagination**: Handle repositories beyond 30 items per page
- **Authentication**: Optional GitHub token for higher rate limits

### Performance Optimizations

- **Lazy Loading**: Only fetch data when projects section is visible
- **Debounced Requests**: Prevent rapid successive API calls
- **Selective Updates**: Only re-fetch when configuration changes
- **Image Optimization**: Lazy load repository owner avatars

### Security Considerations

- **API Key Storage**: Store GitHub tokens securely (environment variables)
- **Input Validation**: Validate username and configuration inputs
- **XSS Prevention**: Sanitize repository descriptions and names
- **CORS Handling**: Ensure proper cross-origin request handling

### Accessibility

- **Loading States**: Provide screen reader announcements
- **Error Messages**: Clear, actionable error descriptions
- **Keyboard Navigation**: Ensure all interactive elements are accessible
- **Focus Management**: Proper focus handling during state changes