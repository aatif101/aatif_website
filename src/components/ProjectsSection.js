import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      description: "// Finalist @ KnightHacks 2024",
      details: "// Used LangChain + GPT to help users understand legal documents",
      link: "#",
      tech: ["LangChain", "GPT-3.5", "Python", "React"]
    },
    {
      id: 2,
      name: "Project Beta", 
      description: "// AI teaching assistant with voice + RAG",
      details: "// Streamlined Q&A using Whisper + Pinecone",
      link: "#",
      tech: ["FastAPI", "Whisper", "Tailwind", "RAG"]
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "// Serverless portfolio analytics tool",
      details: "// Tracks user visits using Lambda + DynamoDB",
      link: "#",
      tech: ["AWS Lambda", "Go", "Terraform"]
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
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="terminal-border rounded-lg p-6 hover:border-cosmic-purple transition-colors group">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-cosmic-blue font-mono mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed mb-2">
                  {project.description}
                </p>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  {project.details}
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-xs text-gray-500 font-mono mb-2">Tags:</p>
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
                <span>→ View GitHub</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 