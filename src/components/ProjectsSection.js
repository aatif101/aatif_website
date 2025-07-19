import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      description: "// Placeholder for first project description",
      link: "#",
      tech: ["React", "Node.js", "AWS"]
    },
    {
      id: 2,
      name: "Project Beta",
      description: "// Placeholder for second project description",
      link: "#",
      tech: ["Python", "Docker", "ML"]
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "// Placeholder for third project description",
      link: "#",
      tech: ["JavaScript", "APIs", "Cloud"]
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">ls -la ~/projects/</span>
          </div>
          <h2 className="text-3xl font-bold text-terminal-green font-mono">
            Featured Projects
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="terminal-border rounded-lg p-6 hover:border-cosmic-purple transition-colors group">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-cosmic-blue font-mono mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-cosmic-purple/20 text-cosmic-purple rounded border border-cosmic-purple/30 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <a 
                href={project.link}
                className="inline-flex items-center text-terminal-green font-mono text-sm hover:text-terminal-amber transition-colors group-hover:translate-x-1 transform duration-200"
              >
                <span>View Project</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 