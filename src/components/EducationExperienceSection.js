import React from 'react';

const EducationExperienceSection = () => {
  const coursework = [
    "Data Structures & Algorithms",
    "Operating Systems", 
    "Computer Security",
    "Database Design",
    "Intro to AI",
    "Software Engineering"
  ];

  const experiences = [
    {
      year: "2025",
      organization: "TEDxUSF",
      role: "Secretary",
      description: "Managed team of 28, coordinated the full TEDx event"
    },
    {
      year: "2024", 
      organization: "Students of India Association",
      role: "Tech Lead",
      description: "Built event platform, handled digital ops for 1000+ users"
    },
    {
      year: "2023",
      organization: "USF Student Government", 
      role: "Senator",
      description: "Participated in official hearings, helped with formal proceedings"
    },
    {
      year: "2022",
      organization: "USF IT",
      role: "Student AV Technician", 
      description: "Handled classroom AV setups and tech troubleshooting"
    }
  ];

  return (
    <section id="education" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column - Education */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-8">Education</h2>
              
              <div className="bg-cosmic-dark/50 rounded-lg p-6 border border-cosmic-purple/20">
                <h3 className="text-xl font-semibold text-cosmic-blue mb-3">
                  University of South Florida (USF)
                </h3>
                <div className="space-y-2 text-gray-300">
                  <p>B.S. in Computer Science, 2022–2026</p>
                  <p>GPA: 3.65</p>
                  <p>Dean's List (multiple semesters)</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
                    📘 Relevant Coursework
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {coursework.map((course, index) => (
                      <div 
                        key={index}
                        className="px-3 py-2 bg-cosmic-purple/10 text-cosmic-purple rounded-lg text-sm border border-cosmic-purple/20"
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Leadership & Experience */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-8">Leadership & Experience</h2>
              
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline line */}
                    {index !== experiences.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-cosmic-purple/30"></div>
                    )}
                    
                    {/* Year badge */}
                    <div className="flex-shrink-0 w-12 h-12 bg-terminal-green rounded-full flex items-center justify-center text-cosmic-dark font-bold text-sm">
                      {exp.year.slice(-2)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 ml-6">
                      <div className="bg-cosmic-dark/50 rounded-lg p-6 border border-cosmic-purple/20 hover:border-cosmic-purple/40 transition-colors">
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-cosmic-blue">
                            {exp.organization}
                          </h3>
                          <p className="text-terminal-green font-medium">
                            {exp.role}
                          </p>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default EducationExperienceSection; 