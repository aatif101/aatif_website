import React, { useState, useEffect } from 'react';
import FloatingSocialButtons from './FloatingSocialButtons/FloatingSocialButtons';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const names = ['Aatif', 'عاطف', 'आतिफ', '阿提夫'];

  // Check if current name contains Hindi characters (for dynamic spacing)
  const currentName = names[currentIndex];
  const isHindiActive = currentName === 'आतिफ';

  // Name animation effect
  useEffect(() => {
    const currentName = names[currentIndex];
    const nameTypeSpeed = isDeleting ? 70 : 90;
    const pauseTime = isDeleting ? 500 : 2000;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        if (!isDeleting) {
          setIsDeleting(true);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % names.length);
        }
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    // Name animation timer
    const nameTimer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentName.length) {
          setDisplayText(currentName.slice(0, displayText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsPaused(true);
        }
      }
    }, nameTypeSpeed);

    return () => clearTimeout(nameTimer);
  }, [displayText, currentIndex, isDeleting, isPaused, names]);

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center relative ${isHindiActive ? 'pt-16' : 'pt-8'}`}>
      {/* Main Content Container - Better vertical centering */}
      <div className="flex flex-col items-center justify-center space-y-6 z-10">
        
        {/* Hello Wanderer */}
        <div className="text-center">
          <div className="text-lg md:text-xl text-gray-400 font-light">
            Hello Wanderer,
          </div>
        </div>

        {/* Main text - I am Aatif */}
        <div className="text-center">
          <div className={`text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-green ${isHindiActive ? 'leading-loose' : 'leading-relaxed'}`}>
            I am <span className="inline-block min-w-[240px] text-left" style={{ paddingTop: isHindiActive ? '0.5rem' : '0' }}>
              {displayText}<span className="animate-pulse">|</span>
            </span>
          </div>
        </div>

        {/* Social Buttons - positioned below the name */}
        <FloatingSocialButtons />

      </div>

      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 cosmic-gradient opacity-20"></div>
    </section>
  );
};

export default HeroSection; 