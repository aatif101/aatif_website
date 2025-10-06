import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SocialButton from './SocialButton';
import socialButtonsData from './socialButtonsData';

/**
 * Main container component for floating social buttons
 * Implements fixed positioning with responsive layout and Framer Motion animations
 * 
 * Features:
 * - Vertical layout on desktop, horizontal on mobile
 * - Staggered entrance animations
 * - Fixed positioning that doesn't obstruct content
 * - Responsive design with proper z-index management
 */
const FloatingSocialButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Trigger entrance animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, shouldReduceMotion ? 100 : 500); // Faster entrance for reduced motion

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  // Container animation variants for staggered children
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? {
        duration: 0.3
      } : {
        staggerChildren: 0.1, // 100ms stagger between each button
        delayChildren: 0.2    // Additional delay before children start animating
      }
    }
  };

  // Individual button animation variants
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      x: shouldReduceMotion ? 0 : 100, 
      scale: shouldReduceMotion ? 1 : 0.8 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: shouldReduceMotion ? {
        duration: 0.2
      } : {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="z-40 
                 /* Centered below name with horizontal layout */
                 flex flex-row gap-3 justify-center items-center
                 /* Mobile: compact spacing */
                 mt-6 
                 /* Tablet and up: more spacing */
                 md:mt-8 md:gap-4
                 /* Desktop: optimal spacing */
                 lg:gap-5
                 /* Ensure proper width constraints */
                 max-w-full
                 /* Center alignment */
                 mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      role="navigation"
      aria-label="Social media and resume links"
    >
      {socialButtonsData.map((buttonData) => (
        <motion.div
          key={buttonData.id}
          variants={buttonVariants}
        >
          <SocialButton
            href={buttonData.href}
            icon={buttonData.icon}
            label={buttonData.label}
            arrowIcon={buttonData.arrowIcon}
            delay={buttonData.delay}
            isExternal={buttonData.isExternal}
            ariaLabel={buttonData.ariaLabel}
            description={buttonData.description}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FloatingSocialButtons;