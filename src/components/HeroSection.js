import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const names = ['Aatif', 'عاطف', 'आतिफ', '阿提夫'];

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

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative pt-20">
      {/* Text Animation Section */}
      <div className="text-center z-10 mb-16">
        <div className="relative">
          {/* Hello Wanderer - positioned right above the "I" */}
          <div className="absolute -top-8 left-0 text-lg md:text-xl text-gray-400 font-light">
            Hello Wanderer,
          </div>
          {/* Main text - I am Aatif */}
          <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-green">
            I am <span className="inline-block min-w-[200px] text-left">{displayText}<span className="animate-pulse">|</span></span>
          </div>
        </div>
      </div>

      {/* Scrolling Logos Bar */}
      <div className="w-full overflow-hidden py-8">
        <div className="flex animate-scroll space-x-16">
          {/* First set of logos */}
          <div className="flex items-center space-x-16 shrink-0">
            {/* AWS */}
            <div className="h-12 w-20 flex items-center justify-center">
              <img src="/logos/aws.svg" alt="AWS" className="h-10 w-auto" />
            </div>

            {/* Kubernetes */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/kubernetes.svg" alt="Kubernetes" className="h-10 w-10" />
            </div>

            {/* Docker */}
            <div className="h-12 w-16 flex items-center justify-center">
              <img src="/logos/docker.svg" alt="Docker" className="h-10 w-auto" />
            </div>

            {/* Linux */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/linux.svg" alt="Linux" className="h-10 w-10" />
            </div>

            {/* Python */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/python.svg" alt="Python" className="h-10 w-10" />
            </div>

            {/* React */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/react.svg" alt="React" className="h-10 w-10" />
            </div>

            {/* Claude */}
            <div className="h-12 w-16 flex items-center justify-center">
              <img src="/logos/claude.svg" alt="Claude" className="h-10 w-auto" />
            </div>

            {/* Ansible */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/ansible.svg" alt="Ansible" className="h-10 w-10" />
            </div>

            {/* Jenkins */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/jenkins.svg" alt="Jenkins" className="h-10 w-10" />
            </div>

            {/* Grafana */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/grafana.svg" alt="Grafana" className="h-10 w-10" />
            </div>
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-16 shrink-0">
            {/* AWS */}
            <div className="h-12 w-20 flex items-center justify-center">
              <img src="/logos/aws.svg" alt="AWS" className="h-10 w-auto" />
            </div>

            {/* Kubernetes */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/kubernetes.svg" alt="Kubernetes" className="h-10 w-10" />
            </div>

            {/* Docker */}
            <div className="h-12 w-16 flex items-center justify-center">
              <img src="/logos/docker.svg" alt="Docker" className="h-10 w-auto" />
            </div>

            {/* Linux */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/linux.svg" alt="Linux" className="h-10 w-10" />
            </div>

            {/* Python */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/python.svg" alt="Python" className="h-10 w-10" />
            </div>

            {/* React */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/react.svg" alt="React" className="h-10 w-10" />
            </div>

            {/* Claude */}
            <div className="h-12 w-16 flex items-center justify-center">
              <img src="/logos/claude.svg" alt="Claude" className="h-10 w-auto" />
            </div>

            {/* Ansible */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/ansible.svg" alt="Ansible" className="h-10 w-10" />
            </div>

            {/* Jenkins */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/jenkins.svg" alt="Jenkins" className="h-10 w-10" />
            </div>

            {/* Grafana */}
            <div className="h-12 w-12 flex items-center justify-center">
              <img src="/logos/grafana.svg" alt="Grafana" className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 cosmic-gradient opacity-20"></div>
    </section>
  );
};

export default HeroSection; 