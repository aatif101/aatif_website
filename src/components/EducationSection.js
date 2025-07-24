import React from 'react';

const EducationSection = () => {
  const timelineItems = [
    {
      year: "2025",
      title: "Secretary @ TEDxUSF",
      description: "Managed team of 28, organized entire TEDx event",
      icon: "🎤"
    },
    {
      year: "2024",
      title: "Tech Lead @ Students of India Association",
      description: "Led web team, built event systems for 1000+ attendees",
      icon: "👨‍💻"
    },
    {
      year: "2023",
      title: "Ethics Committee @ USF Student Government",
      description: "Participated in formal reviews, voted on censure decisions",
      icon: "⚖️"
    },
    {
      year: "2022",
      title: "B.S. in Computer Science — University of South Florida",
      description: "GPA: 3.65 | Dean's List",
      icon: "📚"
    }
  ];

  return (
    <section id="education" className="py-20 px-6 bg-cosmic-darker">
      <div className="container mx-auto max-w-4xl">
        <div className="terminal-border rounded-lg p-8">
          <div className="flex items-center mb-12">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">history --grep=education</span>
          </div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-cosmic-purple/30"></div>
            
            <div className="space-y-8">
              {timelineItems.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 flex items-center justify-center">
                    <div className="w-4 h-4 bg-terminal-green rounded-full border-4 border-cosmic-dark shadow-lg"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 ml-6">
                    <div className="terminal-border rounded-lg p-6 hover:border-cosmic-purple transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="px-3 py-1 text-xs bg-terminal-green/20 text-terminal-green rounded font-mono font-bold">
                          [{item.year}]
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-cosmic-blue font-mono mb-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-400 font-mono text-sm">
                        → {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection; 