import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 terminal-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-terminal-green font-mono font-bold">
            ~/aatif
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#about" className="text-gray-300 hover:text-terminal-green transition-colors font-mono text-sm">
              about
            </a>
            <a href="#education" className="text-gray-300 hover:text-terminal-green transition-colors font-mono text-sm">
              timeline
            </a>
            <a href="#projects" className="text-gray-300 hover:text-terminal-green transition-colors font-mono text-sm">
              projects
            </a>
            <a href="#resume" className="text-gray-300 hover:text-terminal-green transition-colors font-mono text-sm">
              resume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 