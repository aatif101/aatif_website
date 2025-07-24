import React from 'react';

const CourseworkSection = () => {
  const courses = [
    { name: "data_structures", ext: "cpp" },
    { name: "operating_systems", ext: "c" },
    { name: "ai", ext: "py" },
    { name: "db", ext: "sql" },
    { name: "security", ext: "c" },
    { name: "software_engineering", ext: "md" }
  ];

  const getFileColor = (ext) => {
    switch (ext) {
      case 'cpp': return 'text-blue-400';
      case 'c': return 'text-gray-400';
      case 'py': return 'text-yellow-400';
      case 'sql': return 'text-orange-400';
      case 'md': return 'text-green-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <section id="coursework" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="terminal-border rounded-lg p-8">
          <div className="flex items-center mb-12">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">nano classes.md</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="flex items-center p-4 rounded-lg bg-cosmic-dark/50 border border-cosmic-purple/20 hover:border-cosmic-purple/40 transition-colors group"
              >
                <div className="flex items-center space-x-3 font-mono">
                  <span className="text-cosmic-purple">-rw-r--r--</span>
                  <span className="text-gray-500">1</span>
                  <span className="text-gray-500">aatif</span>
                  <span className="text-gray-500">staff</span>
                  <span className={`${getFileColor(course.ext)} group-hover:text-terminal-green transition-colors`}>
                    {course.name}.{course.ext}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 font-mono text-sm">
              // Recent coursework in Computer Science
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseworkSection; 