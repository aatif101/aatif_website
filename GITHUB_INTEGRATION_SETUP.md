# GitHub Projects Integration Setup Guide

This guide will help you configure the GitHub Projects Integration feature for your portfolio website.

## Quick Start

1. **Set your GitHub username** in the environment variables or configuration file
2. **Optional**: Add a GitHub token for higher rate limits
3. **Customize** filtering and display options
4. **Deploy** and enjoy automatic project updates!

## Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Required: Your GitHub username
REACT_APP_GITHUB_USERNAME=your-github-username

# Optional: GitHub Personal Access Token for higher rate limits (60 → 5000 requests/hour)
REACT_APP_GITHUB_TOKEN=your-github-token-here
```

### Creating a GitHub Token (Optional but Recommended)

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Portfolio Website"
4. Select expiration (recommend 1 year)
5. **No scopes needed** for public repositories
6. Copy the token and add it to your `.env` file

## Configuration Options

### Basic Configuration

The simplest way to configure the integration is by setting your username:

```javascript
// In your component
<ProjectsSection 
  config={{ username: 'your-github-username' }}
/>
```

### Using Presets

Choose from predefined configurations:

```javascript
// Show only starred projects
<ProjectsSection preset="starred-only" />

// Show recent activity
<ProjectsSection preset="recent-activity" />

// Show major projects (recommended for portfolios)
<ProjectsSection preset="portfolio" />

// Show all projects
<ProjectsSection preset="show-all" />
```

### Custom Configuration

For full control, provide a custom configuration:

```javascript
<ProjectsSection 
  config={{
    username: 'your-github-username',
    filters: {
      excludeForked: true,
      excludeArchived: true,
      minStars: 2,
      excludeTopics: ['learning', 'tutorial', 'practice'],
      requireDescription: true
    },
    sorting: {
      by: 'stars',
      order: 'desc'
    },
    display: {
      maxProjects: 6,
      showStats: true,
      showHomepage: true
    }
  }}
/>
```

## Configuration Reference

### Filtering Options (`filters`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `excludeForked` | boolean | `true` | Exclude forked repositories |
| `excludeArchived` | boolean | `true` | Exclude archived repositories |
| `excludePrivate` | boolean | `true` | Exclude private repositories |
| `minStars` | number | `0` | Minimum star count |
| `maxAge` | number | `null` | Maximum age in days (null = no limit) |
| `minSize` | number | `0` | Minimum repository size in KB |
| `maxSize` | number | `null` | Maximum repository size in KB |
| `includeTopics` | array | `[]` | Topics that must be present |
| `excludeTopics` | array | `['learning', 'tutorial', ...]` | Topics to exclude |
| `includeLanguages` | array | `[]` | Languages that must be present |
| `excludeLanguages` | array | `[]` | Languages to exclude |
| `requireDescription` | boolean | `false` | Only include repos with descriptions |
| `requireHomepage` | boolean | `false` | Only include repos with homepage URLs |

### Sorting Options (`sorting`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `by` | string | `'updated'` | Sort by: 'stars', 'created', 'updated', 'name', 'size', 'forks' |
| `order` | string | `'desc'` | Sort order: 'asc' or 'desc' |
| `secondarySort` | object | `null` | Secondary sort criteria |

### Display Options (`display`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxProjects` | number | `6` | Maximum number of projects to show |
| `showStats` | boolean | `true` | Show stars, forks, etc. |
| `showLanguages` | boolean | `true` | Show programming languages as tech badges |
| `showLastUpdated` | boolean | `true` | Show last updated date |
| `showDescription` | boolean | `true` | Show repository description |
| `showHomepage` | boolean | `true` | Show homepage link if available |
| `showCreatedDate` | boolean | `false` | Show repository creation date |
| `showSize` | boolean | `false` | Show repository size |
| `showOpenIssues` | boolean | `false` | Show open issues count |
| `truncateDescription` | number | `100` | Max characters for description (0 = no limit) |
| `maxTechBadges` | number | `5` | Maximum number of tech badges to show |

### Cache Options (`cache`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ttl` | number | `3600000` | Cache TTL in milliseconds (1 hour) |
| `autoRefresh` | boolean | `false` | Auto-refresh when cache expires |
| `maxEntries` | number | `10` | Maximum number of cache entries to keep |

### API Options (`api`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `perPage` | number | `30` | Repositories per API request |
| `maxRetries` | number | `3` | Maximum retry attempts |
| `retryDelay` | number | `1000` | Base retry delay in milliseconds |
| `timeout` | number | `10000` | Request timeout in milliseconds |
| `fetchLanguages` | boolean | `true` | Whether to fetch language data |

## Example Configurations

### Portfolio Showcase
Perfect for showcasing your best work:

```javascript
const portfolioConfig = {
  filters: {
    minStars: 2,
    requireDescription: true,
    excludeTopics: ['learning', 'tutorial', 'practice', 'homework']
  },
  sorting: {
    by: 'stars',
    order: 'desc',
    secondarySort: { by: 'updated', order: 'desc' }
  },
  display: {
    maxProjects: 6,
    showStats: true,
    showHomepage: true
  }
};
```

### Recent Work
Show your latest activity:

```javascript
const recentConfig = {
  filters: {
    maxAge: 365, // Last year
    excludeArchived: true
  },
  sorting: {
    by: 'updated',
    order: 'desc'
  },
  display: {
    maxProjects: 10,
    showLastUpdated: true
  }
};
```

### Open Source Contributions
Highlight your contributions:

```javascript
const openSourceConfig = {
  filters: {
    minStars: 1,
    excludeForked: false, // Include forks to show contributions
    includeTopics: ['open-source', 'contribution']
  },
  sorting: {
    by: 'stars',
    order: 'desc'
  },
  display: {
    maxProjects: 12,
    showStats: true
  }
};
```

## Troubleshooting

### Common Issues

1. **"GitHub username not configured"**
   - Make sure `REACT_APP_GITHUB_USERNAME` is set in your `.env` file
   - Or pass the username in the config prop

2. **Rate limit exceeded**
   - Add a GitHub token to increase limits from 60 to 5000 requests/hour
   - The system will automatically cache data and show cached results

3. **No projects showing**
   - Check your filter settings (they might be too restrictive)
   - Verify your GitHub username is correct
   - Make sure you have public repositories

4. **Projects not updating**
   - Clear your browser's localStorage to force a cache refresh
   - Or wait for the cache TTL to expire (default: 1 hour)

### Performance Tips

1. **Use caching**: Keep the default cache settings to avoid hitting rate limits
2. **Optimize filters**: Use specific filters to reduce API calls
3. **Limit projects**: Don't show too many projects at once
4. **Use a token**: GitHub tokens significantly increase rate limits

### Security Notes

- GitHub tokens are stored in environment variables (not in code)
- No sensitive scopes are required for public repositories
- Tokens are only used for authentication, not stored in localStorage
- All API calls are made from the client side (no server required)

## Advanced Usage

### Custom Filter Functions

You can provide custom filter logic:

```javascript
const customConfig = {
  filters: {
    customFilter: (repo) => {
      // Custom logic here
      return repo.name.includes('portfolio') || repo.stats.stars > 10;
    }
  }
};
```

### Multiple Configurations

Show different project sections:

```javascript
// Featured projects
<ProjectsSection 
  preset="portfolio" 
  config={{ display: { maxProjects: 3 } }}
/>

// Recent work
<ProjectsSection 
  preset="recent-activity"
  config={{ display: { maxProjects: 6 } }}
/>
```

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your GitHub username and token
3. Test with a minimal configuration first
4. Check GitHub's API status at [githubstatus.com](https://githubstatus.com)

For more help, refer to the GitHub API documentation or create an issue in the project repository.