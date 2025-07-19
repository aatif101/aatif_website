import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-cosmic-darker border-t border-cosmic-purple/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <span className="text-terminal-green font-mono">$</span>
            <span className="text-gray-300 font-mono ml-2">echo "Let's connect!"</span>
          </div>
          
          <div className="flex justify-center space-x-8">
            <a 
              href="#" 
              className="text-gray-400 hover:text-terminal-green transition-colors font-mono"
            >
              github
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-terminal-green transition-colors font-mono"
            >
              linkedin
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-terminal-green transition-colors font-mono"
            >
              email
            </a>
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