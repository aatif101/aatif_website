import React, { useMemo } from 'react';
import useGitHubProjects from '../hooks/useGitHubProjects';
import { 
  ProjectsGridSkeleton, 
  ProjectsError, 
  ProjectsEmpty, 
  CacheIndicator, 
  RateLimitWarning 
} from './LoadingSkeleton';
import githubConfig, { createConfigPreset } from '../config/githubConfig';
import { getGitHubConfig } from '../config/portfolioConfig';

const ProjectsSection = ({ config = {}, preset = null }) => {
  // Memoize the configuration to prevent infinite re-renders
  const finalConfig = useMemo(() => {
    // Use portfolio config by default, or custom config if provided
    const defaultConfig = preset ? createConfigPreset(preset) : getGitHubConfig();
    
    return {
      ...githubConfig,
      ...defaultConfig,
      ...config,
      filters: { 
        ...githubConfig.filters, 
        ...defaultConfig.filters, 
        ...config.filters 
      },
      display: { 
        ...githubConfig.display, 
        ...defaultConfig.display, 
        ...config.display 
      }
    };
  }, [config, preset]);

  const {
    projects,
    loading,
    error,
    refetch,
    fromCache,
    lastUpdated,
    rateLimitInfo
  } = useGitHubProjects(finalConfig.username, finalConfig);

  // Fallback projects for when GitHub integration fails
  const fallbackProjects = [
    {
      id: 1,
      name: "Project Alpha",
      description: "// Finalist @ KnightHacks 2024",
      details: "// Used LangChain + GPT to help users understand legal documents",
      link: "#",
      homepage: null,
      tech: ["LangChain", "GPT-3.5", "Python", "React"],
      stats: { stars: 0, forks: 0, lastUpdated: new Date().toISOString() },
      metadata: { language: "Python" }
    },
    {
      id: 2,
      name: "Project Beta", 
      description: "// AI teaching assistant with voice + RAG",
      details: "// Streamlined Q&A using Whisper + Pinecone",
      link: "#",
      homepage: null,
      tech: ["FastAPI", "Whisper", "Tailwind", "RAG"],
      stats: { stars: 0, forks: 0, lastUpdated: new Date().toISOString() },
      metadata: { language: "Python" }
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "// Serverless portfolio analytics tool",
      details: "// Tracks user visits using Lambda + DynamoDB",
      link: "#",
      homepage: null,
      tech: ["AWS Lambda", "Go", "Terraform"],
      stats: { stars: 0, forks: 0, lastUpdated: new Date().toISOString() },
      metadata: { language: "Go" }
    }
  ];

  // Use fallback projects if GitHub integration fails and no cached data
  const displayProjects = projects.length > 0 ? projects : 
    (error && !fromCache ? fallbackProjects : []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Unknown';
    }
  };

  const truncateText = (text, maxLength) => {
    if (!maxLength || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const ProjectCard = ({ project }) => {
    const maxTechBadges = finalConfig.display.maxTechBadges;
    const displayTech = project.tech.slice(0, maxTechBadges);
    const hasMoreTech = project.tech.length > maxTechBadges;

    return (
      <div className="terminal-border rounded-lg p-4 md:p-6 hover:border-cosmic-purple transition-colors group h-full flex flex-col">
        <div className="mb-4 flex-grow">
          <h3 className="text-lg md:text-xl font-bold text-cosmic-blue font-mono mb-3 break-words">
            {project.name}
          </h3>
          
          {finalConfig.display.showDescription && (
            <p className="text-gray-400 font-mono text-xs md:text-sm leading-relaxed mb-2 break-words">
              // {finalConfig.display.truncateDescription > 0 
                ? truncateText(project.description, finalConfig.display.truncateDescription)
                : project.description}
            </p>
          )}
        </div>
        
        {/* Tech badges */}
        <div className="mb-4 md:mb-6">
          <p className="text-xs text-gray-500 font-mono mb-2">
            {finalConfig.display.showLanguages ? 'Tech:' : 'Tags:'}
          </p>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {displayTech.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-cosmic-purple/20 text-cosmic-purple rounded border border-cosmic-purple/30 font-mono whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
            {hasMoreTech && (
              <span className="px-2 py-1 text-xs bg-gray-700/20 text-gray-500 rounded border border-gray-700/30 font-mono whitespace-nowrap">
                +{project.tech.length - maxTechBadges}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        {finalConfig.display.showStats && project.stats && (
          <div className="mb-4 flex flex-wrap gap-2 md:gap-4 text-xs font-mono">
            {project.stats.stars > 0 && (
              <div className="flex items-center gap-1 text-yellow-400 whitespace-nowrap">
                <span>⭐</span>
                <span>{project.stats.stars}</span>
              </div>
            )}
            {project.stats.forks > 0 && (
              <div className="flex items-center gap-1 text-blue-400 whitespace-nowrap">
                <span>🔀</span>
                <span>{project.stats.forks}</span>
              </div>
            )}
            {finalConfig.display.showLastUpdated && project.stats.lastUpdated && (
              <div className="flex items-center gap-1 text-gray-500 whitespace-nowrap">
                <span>📅</span>
                <span className="hidden sm:inline">{formatDate(project.stats.lastUpdated)}</span>
                <span className="sm:hidden">{formatDate(project.stats.lastUpdated).split(',')[0]}</span>
              </div>
            )}
            {finalConfig.display.showSize && project.metadata?.size && (
              <div className="flex items-center gap-1 text-gray-500 whitespace-nowrap">
                <span>💾</span>
                <span>{Math.round(project.metadata.size / 1024)}KB</span>
              </div>
            )}
            {finalConfig.display.showOpenIssues && project.metadata?.openIssues > 0 && (
              <div className="flex items-center gap-1 text-red-400 whitespace-nowrap">
                <span>🐛</span>
                <span>{project.metadata.openIssues}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-auto">
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center sm:justify-start text-terminal-green font-mono text-sm hover:text-terminal-amber transition-colors group-hover:translate-x-1 transform duration-200 py-1"
          >
            <span>→ View GitHub</span>
          </a>
          
          {finalConfig.display.showHomepage && project.homepage && (
            <a 
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center sm:justify-start text-cosmic-purple font-mono text-sm hover:text-cosmic-blue transition-colors py-1"
            >
              <span>🔗 Live Demo</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">ls -la ~/projects/</span>
          </div>
          <div className="mb-6">
            <p className="text-gray-400 font-mono text-xs md:text-sm">
              // this project list is fetched from my own github (no manual inputs here :))
            </p>
          </div>
        </div>

        {/* Subtle refresh button (hidden by default) */}
        {error && (
          <div className="text-center mb-4">
            <button 
              onClick={() => {
                console.log('🔄 Manual refetch triggered');
                refetch();
              }}
              className="px-3 py-1 text-xs bg-terminal-green/20 text-terminal-green border border-terminal-green/30 rounded font-mono hover:bg-terminal-green/30"
            >
              🔄 Retry Loading Projects
            </button>
          </div>
        )}

        {/* Cache and rate limit indicators */}
        <CacheIndicator fromCache={fromCache} lastUpdated={lastUpdated} />
        <RateLimitWarning rateLimitInfo={rateLimitInfo} />
        
        {/* Loading state */}
        {loading && (
          <ProjectsGridSkeleton count={finalConfig.ui.loadingSkeletonCount} />
        )}
        
        {/* Error state */}
        {error && !loading && displayProjects.length === 0 && (
          <ProjectsError 
            error={error} 
            onRetry={finalConfig.ui.errorRetryButton ? refetch : null}
            showRetry={finalConfig.ui.errorRetryButton}
          />
        )}
        
        {/* Empty state */}
        {!loading && !error && displayProjects.length === 0 && (
          <ProjectsEmpty message="No projects match the current filters" />
        )}
        
        {/* Projects grid */}
        {!loading && displayProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayProjects.map((project, index) => (
              <div
                key={project.id}
                className={finalConfig.ui.animateOnLoad ? 
                  `animate-fade-in-up` : ''}
                style={finalConfig.ui.animateOnLoad ? {
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                } : {}}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {/* Fallback notice */}
        {error && displayProjects === fallbackProjects && (
          <div className="text-center mt-8">
            <p className="text-gray-500 font-mono text-xs">
              Showing sample projects due to GitHub API issues
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection; 