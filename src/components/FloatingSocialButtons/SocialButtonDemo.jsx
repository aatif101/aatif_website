import React from 'react';
import SocialButton from './SocialButton';
import socialButtonsData from './socialButtonsData';

/**
 * Demo component to showcase SocialButton functionality
 * This can be temporarily added to App.js for visual testing
 */
const SocialButtonDemo = () => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
      {socialButtonsData.map((buttonData) => (
        <SocialButton
          key={buttonData.id}
          href={buttonData.href}
          icon={buttonData.icon}
          label={buttonData.label}
          arrowIcon={buttonData.arrowIcon}
          delay={buttonData.delay}
          isExternal={buttonData.isExternal}
          ariaLabel={buttonData.ariaLabel}
          description={buttonData.description}
        />
      ))}
    </div>
  );
};

export default SocialButtonDemo;