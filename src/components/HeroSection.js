import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Phrase animation uses same timing states as name animation
  const [phraseText, setPhraseText] = useState('');

  const names = ['Aatif', 'عاطف', 'आतिफ', '阿提夫'];
  const phrases = [
    'i build stuff',
    'hire me maybe?',
    'clean code, bad jokes.',
    'good guy. great engineer.'
  ];

  // Check if current name contains Hindi characters (for dynamic spacing)
  const currentName = names[currentIndex];
  const isHindiActive = currentName === 'आतिफ';

  // Synchronized animation effect for both name and phrase
  useEffect(() => {
    const currentName = names[currentIndex];
    const currentPhrase = phrases[currentIndex % phrases.length];
    const nameTypeSpeed = isDeleting ? 100 : 150;
    const phraseTypeSpeed = isDeleting ? 40 : 70; // Faster phrase animation
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

    // Phrase animation timer (starts after name begins typing)
    const phraseTimer = setTimeout(() => {
      if (!isDeleting) {
        // Only start phrase after name has typed at least 2 characters
        if (displayText.length >= 2 && phraseText.length < currentPhrase.length) {
          setPhraseText(currentPhrase.slice(0, phraseText.length + 1));
        }
      } else {
        if (phraseText.length > 0) {
          setPhraseText(phraseText.slice(0, -1));
        } else {
          // Reset phrase when both animations complete
          setPhraseText('');
        }
      }
    }, phraseTypeSpeed);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(phraseTimer);
    };
  }, [displayText, phraseText, currentIndex, isDeleting, isPaused, names, phrases]);

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

        {/* Phrase Animation Section */}
        <div className="text-center mt-4">
          <div className="text-lg md:text-xl font-mono text-gray-300 min-h-[1.5rem] flex items-center justify-center">
            <span className="inline-block min-w-[320px] text-center">
              {phraseText}<span className="animate-pulse text-green-400 font-bold">|</span>
            </span>
          </div>
        </div>

      </div>

      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 cosmic-gradient opacity-20"></div>
    </section>
  );
};

export default HeroSection; 