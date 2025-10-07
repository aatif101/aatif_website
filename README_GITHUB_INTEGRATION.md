# GitHub Projects Integration

This portfolio website features automatic GitHub projects integration that dynamically fetches and displays your repositories.

## ✨ Features

- **Automatic Updates**: Projects sync automatically from your GitHub profile
- **Smart Filtering**: Show only your best work with customizable filters
- **Caching**: Efficient caching system to avoid rate limits
- **Responsive Design**: Looks great on all devices
- **Error Handling**: Graceful fallbacks when GitHub is unavailable
- **Rate Limit Aware**: Intelligent handling of GitHub API limits

## 🚀 Quick Setup

1. **Set your GitHub username**:
   ```bash
   # Create .env file
   REACT_APP_GITHUB_USERNAME=your-github-username
   ```

2. **Optional - Add GitHub token for higher limits**:
   ```bash
   REACT_APP_GITHUB_TOKEN=your-token-here
   ```

3. **Customize in `src/config/portfolioConfig.js`**:
   ```javascript
   export const portfolioConfig = {
     github: {
       preset: 'portfolio', // or 'starred-only', 'recent-activity'
       customConfig: {
         filters: {
           minStars: 2,
           excludeTopics: ['learning', 'tutorial']
         }
       }
     }
   };
   ```

## 📊 What Gets Displayed

Each project card shows:
- Repository name and description
- Programming languages and topics as tech badges
- GitHub stats (stars, forks, last updated)
- Links to GitHub repository and live demo (if available)

## 🎛️ Configuration Presets

### Portfolio (Default)
Perfect for showcasing your best work:
- Excludes learning/tutorial projects
- Requires descriptions
- Sorts by stars
- Shows 6 projects

### Starred Only
Shows only repositories with stars:
- Minimum 1 star
- Sorted by star count
- Great for highlighting popular projects

### Recent Activity
Shows your latest work:
- Projects from the last year
- Sorted by last updated
- Shows 10 projects

### Show All
Minimal filtering:
- Includes forks and archived repos
- Shows up to 20 projects
- Good for comprehensive portfolios

## 🔧 Advanced Configuration

### Custom Filters
```javascript
filters: {
  excludeForked: true,        // Hide forked repos
  excludeArchived: true,      // Hide archived repos
  minStars: 2,               // Minimum star count
  maxAge: 365,               // Max age in days
  includeTopics: ['react'],   // Must have these topics
  excludeTopics: ['learning'], // Exclude these topics
  requireDescription: true,   // Must have description
  requireHomepage: true      // Must have homepage URL
}
```

### Display Options
```javascript
display: {
  maxProjects: 6,           // Number of projects to show
  showStats: true,          // Show stars, forks, etc.
  showHomepage: true,       // Show live demo links
  showLastUpdated: true,    // Show update dates
  truncateDescription: 100, // Limit description length
  maxTechBadges: 5         // Max tech badges per project
}
```

### Sorting Options
```javascript
sorting: {
  by: 'stars',              // 'stars', 'updated', 'created', 'name'
  order: 'desc',            // 'asc' or 'desc'
  secondarySort: {          // Secondary sort criteria
    by: 'updated',
    order: 'desc'
  }
}
```

## 🔒 Privacy & Security

- **No sensitive data**: Only public repository information is accessed
- **Client-side only**: All API calls are made from the browser
- **Optional tokens**: GitHub tokens are optional and stored securely
- **No scopes needed**: Public repositories don't require special permissions

## 📱 Mobile Responsive

The integration is fully responsive:
- **Mobile**: Single column layout with optimized spacing
- **Tablet**: Two column grid with adjusted text sizes
- **Desktop**: Three column grid with full feature set

## ⚡ Performance

- **Caching**: 1-hour cache to minimize API calls
- **Rate Limiting**: Intelligent handling of GitHub's 60 requests/hour limit
- **Loading States**: Skeleton loaders for smooth UX
- **Error Recovery**: Automatic retries with exponential backoff

## 🛠️ Troubleshooting

### Common Issues

**"GitHub username not configured"**
- Add `REACT_APP_GITHUB_USERNAME` to your `.env` file

**Rate limit exceeded**
- Add a GitHub token to increase from 60 to 5000 requests/hour
- System will show cached data when rate limited

**No projects showing**
- Check filter settings (might be too restrictive)
- Verify GitHub username is correct
- Ensure you have public repositories

**Projects not updating**
- Clear browser localStorage to force refresh
- Wait for cache to expire (default: 1 hour)

### Getting Help

1. Check browser console for error messages
2. Verify GitHub username and token
3. Test with minimal configuration
4. Check [GitHub Status](https://githubstatus.com)

## 🔄 Cache Management

The system automatically manages caching:
- **TTL**: 1 hour by default
- **Storage**: Uses browser localStorage
- **Cleanup**: Automatically removes old entries
- **Conditional Requests**: Uses ETags to minimize data transfer

## 🎨 Customization

### Styling
The integration uses your existing CSS classes:
- `terminal-border` for card borders
- `cosmic-purple` for tech badges
- `terminal-green` for links
- Fully responsive with Tailwind CSS

### Animation
- Fade-in animations for project cards
- Skeleton loading states
- Hover effects on cards and links
- Respects `prefers-reduced-motion`

## 📈 Analytics

Track integration performance:
- Cache hit rates
- API response times
- Error frequencies
- User engagement with project links

## 🔮 Future Enhancements

Planned features:
- Repository README parsing
- Commit activity visualization
- Language statistics charts
- Project categorization
- Search and filtering UI

---

For detailed configuration options, see [GITHUB_INTEGRATION_SETUP.md](./GITHUB_INTEGRATION_SETUP.md)