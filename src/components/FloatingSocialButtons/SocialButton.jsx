import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { handleLinkClick } from './socialButtonsData';

/**
 * Individual social button component with cosmic theme styling and accessibility features
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - URL or file path for the button link
 * @param {React.Component} props.icon - Icon component to display
 * @param {string} props.label - Button label text
 * @param {React.Component} props.arrowIcon - Arrow icon component
 * @param {number} props.delay - Animation delay in milliseconds
 * @param {boolean} props.isExternal - Whether link opens in new tab
 * @param {string} props.ariaLabel - Accessibility label for screen readers
 * @param {string} props.description - Additional description for accessibility
 */
const SocialButton = ({ 
  href, 
  icon: Icon, 
  label, 
  arrowIcon: ArrowIcon,
  delay = 0,
  isExternal = true,
  ariaLabel,
  description 
}) => {
  // Check for reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for entrance animation
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
        damping: 15,
        delay: delay / 1000 // Convert ms to seconds
      }
    }
  };

  // Advanced hover animation variants
  const hoverVariants = {
    hover: {
      scale: shouldReduceMotion ? 1.02 : 1.08,
      rotateY: shouldReduceMotion ? 0 : 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: shouldReduceMotion ? 0.99 : 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  // Focus animation variants for keyboard navigation
  const focusVariants = {
    focus: {
      scale: shouldReduceMotion ? 1.02 : 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Handle click for proper link behavior with error handling
  const handleClick = (e) => {
    e.preventDefault();
    handleLinkClick(href, isExternal, label);
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverVariants.hover}
      whileTap={hoverVariants.tap}
      whileFocus={focusVariants.focus}
      className="group relative flex items-center overflow-hidden
                 /* Mobile: compact but touch-friendly (min 44px height for accessibility) */
                 gap-1.5 px-2 py-2.5 min-w-[100px] min-h-[44px] text-xs
                 /* Small mobile: slightly larger */
                 sm:gap-2 sm:px-3 sm:py-2.5 sm:min-w-[120px] sm:min-h-[48px]
                 /* Tablet and up: full size */
                 md:gap-3 md:px-4 md:py-3 md:min-w-[160px] md:min-h-[52px] md:text-sm
                 /* Terminal-style border matching existing components */
                 border border-cosmic-purple/30 rounded-lg md:rounded-xl
                 /* Background with proper cosmic theme colors */
                 bg-cosmic-dark/80 backdrop-blur-md
                 text-gray-300 font-mono
                 transition-all duration-300 ease-out
                 /* Enhanced hover states with cosmic theme */
                 hover:bg-cosmic-dark/90 hover:border-cosmic-purple/60
                 hover:shadow-lg hover:shadow-cosmic-purple/30
                 /* Focus states for accessibility */
                 focus:outline-none focus:ring-2 focus:ring-cosmic-blue/50 focus:ring-offset-2 focus:ring-offset-cosmic-dark
                 focus:border-cosmic-blue/60 focus:shadow-lg focus:shadow-cosmic-blue/30
                 transform-gpu"
      style={{
        boxShadow: shouldReduceMotion ? 
          '0 0 10px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)' : 
          '0 0 15px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
      aria-label={ariaLabel}
      aria-describedby={description ? `${label.replace(/\s+/g, '-').toLowerCase()}-desc` : undefined}
      role="link"
      tabIndex={0}
    >
      {/* Subtle cosmic glow effect - matches existing theme */}
      <motion.div 
        className="absolute inset-0 rounded-lg md:rounded-xl opacity-0 pointer-events-none"
        whileHover={{
          opacity: shouldReduceMotion ? 0.2 : 0.4,
          transition: { duration: 0.3 }
        }}
        whileFocus={{
          opacity: shouldReduceMotion ? 0.2 : 0.4,
          transition: { duration: 0.3 }
        }}
        style={{
          background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.2), 0 0 40px rgba(59, 130, 246, 0.1)'
        }}
      />

      {/* Icon with cosmic theme styling */}
      <motion.div
        whileHover={shouldReduceMotion ? {} : {
          scale: 1.1,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileFocus={shouldReduceMotion ? {} : {
          scale: 1.1,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <Icon 
          className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400 
                     group-hover:text-cosmic-blue group-focus:text-cosmic-green
                     transition-all duration-300
                     group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]
                     group-focus:drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]" 
          aria-hidden="true"
        />
      </motion.div>
      
      {/* Label text with cosmic theme styling */}
      <motion.span 
        className="relative z-10 flex-1 group-hover:text-gray-100 group-focus:text-gray-100 transition-all duration-300
                   truncate max-w-[60px] sm:max-w-none"
        whileHover={shouldReduceMotion ? {} : {
          x: 2,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileFocus={shouldReduceMotion ? {} : {
          x: 2,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        {label}
      </motion.span>
      
      {/* Arrow icon with cosmic theme styling */}
      <motion.div
        whileHover={shouldReduceMotion ? {} : {
          x: 3,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileFocus={shouldReduceMotion ? {} : {
          x: 3,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <ArrowIcon 
          className="relative z-10 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-gray-500 
                     group-hover:text-cosmic-blue group-focus:text-cosmic-green
                     transition-all duration-300" 
          aria-hidden="true"
        />
      </motion.div>


      
      {/* Hidden description for screen readers */}
      {description && (
        <span 
          id={`${label.replace(/\s+/g, '-').toLowerCase()}-desc`}
          className="sr-only"
        >
          {description}
        </span>
      )}
    </motion.a>
  );
};

export default SocialButton;