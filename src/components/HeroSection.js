import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="text-center z-10">
        {/* Central Sun - Name */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-green animate-pulse-glow">
            aatif
          </h1>
        </div>
        
        {/* Subtitle */}
        <div className="mt-12 space-y-2">
          <p className="text-xl md:text-2xl text-gray-300 font-mono">
            <span className="text-terminal-green">$</span> mathematician.developer.dreamer
          </p>
          <p className="text-sm md:text-base text-gray-500 font-mono">
            // Exploring the intersection of mathematics and technology
          </p>
        </div>
      </div>
      
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 cosmic-gradient opacity-20"></div>
    </section>
  );
};

export default HeroSection; 