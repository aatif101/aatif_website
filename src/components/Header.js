import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 terminal-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-terminal-green font-mono font-bold">
            ~/aatif
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-300 hover:text-terminal-green transition-colors">
              about
            </a>
            <a href="#resume" className="text-gray-300 hover:text-terminal-green transition-colors">
              resume
            </a>
            <a href="#projects" className="text-gray-300 hover:text-terminal-green transition-colors">
              projects
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 