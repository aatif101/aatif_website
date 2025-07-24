import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // New state for phrase animation
  const [phraseText, setPhraseText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPhraseDeleting, setIsPhraseDeleting] = useState(false);
  const [isPhrasePaused, setIsPhrasePaused] = useState(false);

  const names = ['Aatif', 'عاطف', 'आतिफ', '阿提夫'];
  const phrases = [
    'i build stuff.',
    'i can solve your math homework.',
    'i can help you with your project.',
    'please hire me.',
    'a good guy.'
  ];

  // Name animation effect
  useEffect(() => {
    const currentName = names[currentIndex];
    const typeSpeed = isDeleting ? 100 : 150;
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

    const timer = setTimeout(() => {
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
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, isPaused, names]);

  // Phrase animation effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typeSpeed = isPhraseDeleting ? 60 : 100;
    const pauseTime = isPhraseDeleting ? 800 : 2500;

    if (isPhrasePaused) {
      const pauseTimer = setTimeout(() => {
        setIsPhrasePaused(false);
        if (!isPhraseDeleting) {
          setIsPhraseDeleting(true);
        } else {
          setIsPhraseDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isPhraseDeleting) {
        if (phraseText.length < currentPhrase.length) {
          setPhraseText(currentPhrase.slice(0, phraseText.length + 1));
        } else {
          setIsPhrasePaused(true);
        }
      } else {
        if (phraseText.length > 0) {
          setPhraseText(phraseText.slice(0, -1));
        } else {
          setIsPhrasePaused(true);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [phraseText, phraseIndex, isPhraseDeleting, isPhrasePaused, phrases]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative">
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
          <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-green">
            I am <span className="inline-block min-w-[200px] text-left">{displayText}<span className="animate-pulse">|</span></span>
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