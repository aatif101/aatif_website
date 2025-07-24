import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="terminal-border rounded-lg p-8">
          <div className="flex items-center mb-8">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">cat about_me.txt</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - About Me */}
            <div className="space-y-4">
              <h3 className="text-xl text-cosmic-blue font-semibold font-mono mb-6">About Me</h3>
              <div className="space-y-3 text-gray-300 font-mono text-sm leading-relaxed">
                <p className="text-gray-400">
                  // Indian computer science student based in Florida
                </p>
                <p className="text-gray-400">
                  // Passionate about DevOps, automation, and clean infra
                </p>
                <p className="text-gray-400">
                  // Open source contributor (Mozilla, Bugzilla)
                </p>
                <p className="text-gray-400">
                  // Documented, tested, and deployed pipelines
                </p>
                <p className="text-gray-400">
                  // Former math nerd, still love solving problems
                </p>
              </div>
            </div>
            
            {/* Right Column - Skills & Interests */}
            <div className="space-y-4">
              <h3 className="text-xl text-cosmic-blue font-semibold font-mono mb-6">Skills & Interests</h3>
              <div className="space-y-3 text-gray-300 font-mono text-sm leading-relaxed">
                <p className="text-gray-400">// DevOps</p>
                <p className="text-gray-400">// Cloud Computing</p>
                <p className="text-gray-400">// AI/ML</p>
                <p className="text-gray-400">// Mathematics</p>
                <p className="text-gray-400">// Security</p>
                <p className="text-gray-400">// Open Source</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 