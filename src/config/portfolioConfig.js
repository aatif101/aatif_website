/**
 * Portfolio Configuration
 * Customize your GitHub projects integration here
 */

import { createConfigPreset } from './githubConfig';

// Main portfolio configuration
export const portfolioConfig = {
  // GitHub integration settings
  github: {
    // Your GitHub username (can also be set via REACT_APP_GITHUB_USERNAME)
    username: process.env.REACT_APP_GITHUB_USERNAME || 'aatif101',
    
    // Use a preset configuration (recommended)
    preset: 'recent-activity', // 'portfolio', 'starred-only', 'recent-activity', 'show-all'
    
    // Custom overrides (optional)
    customConfig: {
      filters: {
        minStars: 0,                    // Show repos with any number of stars
        requireDescription: false,      // Don't require descriptions (for now)
        excludeTopics: ['learning', 'homework', 'assignment'], // Exclude learning repos
        excludeForked: true,           // Still exclude forks
        excludeArchived: true,         // Still exclude archived repos
        // Custom filter to show only specific repos
        customFilter: (repo) => {
          const showcaseRepos = [
            'medflow', 
            'healthhacks-project', 
            'rush', 
            'aatif_website',        // Your portfolio site
            'linkedinwrapped',      // LinkedIn analytics
            'stock-analyzer',       // Stock analysis project
            'stockanalyzer',        // Alternative naming
            'cppclr_stockanalyzer'  // C++ CLR Stock Analyzer
          ];
          return showcaseRepos.includes(repo.name.toLowerCase());
        }
      },
      display: {
        maxProjects: 8,                // Show up to 8 projects
        showStats: true,
        showHomepage: true,
        showDescription: true,
        showLastUpdated: true,
      }
    }
  }
};

/**
 * Get the final GitHub configuration for the ProjectsSection
 * @returns {Object} Complete configuration object
 */
export function getGitHubConfig() {
  const presetConfig = createConfigPreset(portfolioConfig.github.preset);
  
  return {
    ...presetConfig,
    username: portfolioConfig.github.username,
    ...portfolioConfig.github.customConfig,
    filters: {
      ...presetConfig.filters,
      ...portfolioConfig.github.customConfig?.filters
    },
    display: {
      ...presetConfig.display,
      ...portfolioConfig.github.customConfig?.display
    }
  };
}

export default portfolioConfig;