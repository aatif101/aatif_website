import React from 'react';

const ResumeSection = () => {
  return (
    <section id="resume" className="py-20 px-6 bg-cosmic-darker">
      <div className="container mx-auto max-w-4xl">
        <div className="terminal-border rounded-lg p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">wget resume.pdf</span>
          </div>
          
          <h2 className="text-3xl font-bold text-terminal-green mb-8 font-mono">
            Resume
          </h2>
          
          <p className="text-gray-400 font-mono mb-8">
            // Download my resume to learn more about my experience
          </p>
          
          <button className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-mono font-semibold text-cosmic-dark bg-terminal-green rounded-lg transition-all duration-300 hover:bg-terminal-amber hover:shadow-lg hover:shadow-terminal-green/50">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cosmic-purple to-cosmic-blue rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></span>
            <span className="relative flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </span>
          </button>
          
          <div className="mt-6 text-sm text-gray-500 font-mono">
            // resume_aatif.pdf
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection; 