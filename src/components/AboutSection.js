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
          
          <div className="space-y-8">
            {/* About Me Section */}
            <div className="space-y-4">
              <h3 className="text-xl text-cosmic-blue font-semibold font-mono mb-6">// About Me</h3>
              <div className="space-y-4 text-gray-300 font-mono text-sm leading-relaxed">
                <p>
                  Hey, I'm Mohammad Aatif Shaikh — but most people just call me Aatif. I'm an international student at the University of South Florida, majoring in Computer Science and graduating in May 2026.
                </p>
                <p>
                  I'm not backed by fancy-name internships (yet), but I'm backed by obsession. I love fast-paced environments, debugging until 3 AM, and building things that actually <span className="text-terminal-green font-bold">*work*</span>.
                </p>
                <p>
                  If you're a founder who needs an engineer to take ideas from "draft" to "done," I'm all in.
                </p>
                <p> If you're a recruiter, I might not have the brand logos, but I promise I'm worth your time.
                </p>
              </div>
            </div>
            
            {/* Interests Section */}
            <div className="space-y-4">
              <h3 className="text-xl text-cosmic-blue font-semibold font-mono mb-6">// Interests</h3>
              <div className="text-gray-300 font-mono text-sm">
                <p>DevOps  |  Cloud Infra  |  AI/ML  |  Security  |  Systems Thinking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 