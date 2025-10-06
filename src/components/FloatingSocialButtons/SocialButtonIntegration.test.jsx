import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialButton from './SocialButton';
import socialButtonsData from './socialButtonsData';

// Integration test to verify SocialButton works with actual data
describe('SocialButton Integration', () => {
  test('renders correctly with socialButtonsData', () => {
    const buttonData = socialButtonsData[0]; // GitHub button
    
    render(
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
    );

    // Verify the component renders with the data
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(buttonData.label)).toBeInTheDocument();
  });

  test('all social buttons data can be rendered', () => {
    socialButtonsData.forEach((buttonData, index) => {
      const { container } = render(
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
      );
      
      // Verify each button renders without errors
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});