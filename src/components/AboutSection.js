import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="terminal-border rounded-lg p-8">
          <div className="flex items-center mb-6">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">cat about_me.txt</span>
          </div>
          
          <div className="space-y-6 text-gray-300 font-mono leading-relaxed">
            <h2 className="text-3xl font-bold text-terminal-green mb-8">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-400">
                  // Placeholder for about me content
                </p>
                <p className="text-gray-400">
                  // Passion for mathematics and technology
                </p>
                <p className="text-gray-400">
                  // Journey in software development
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl text-cosmic-blue font-semibold">Skills & Interests</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-cosmic-purple">// Mathematics</span>
                  <span className="text-cosmic-green">// Programming</span>
                  <span className="text-cosmic-orange">// Cloud Computing</span>
                  <span className="text-cosmic-pink">// AI/ML</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 