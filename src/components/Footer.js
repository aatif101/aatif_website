import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-cosmic-darker border-t border-cosmic-purple/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">echo "Let's connect!"</span>
          </div>
          
          <div className="space-y-3 font-mono text-gray-300">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <a 
                href="https://github.com/yourhandle" 
                className="text-gray-400 hover:text-terminal-green transition-colors"
              >
                GitHub: github.com/yourhandle
              </a>
              <a 
                href="https://linkedin.com/in/yourhandle" 
                className="text-gray-400 hover:text-terminal-green transition-colors"
              >
                LinkedIn: linkedin.com/in/yourhandle
              </a>
            </div>
            <div className="flex justify-center">
              <a 
                href="mailto:aatif@example.com" 
                className="text-gray-400 hover:text-terminal-green transition-colors"
              >
                Email: aatif@example.com
              </a>
            </div>
          </div>
          
          {/* Fun closing line */}
          <div className="pt-6">
            <div className="flex items-center justify-center mb-4">
              <span className="text-terminal-green font-mono">$</span>
              <span className="text-terminal-green font-mono ml-2">sudo hire aatif</span>
            </div>
          </div>
          
          <div className="pt-6 border-t border-cosmic-purple/20">
            <p className="text-gray-500 font-mono text-sm">
              © 2024 aatif | Built with React & Tailwind CSS
            </p>
            <p className="text-gray-600 font-mono text-xs mt-2">
              // Crafted with mathematical precision and cosmic inspiration
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 