import React from 'react';
import { render, screen } from '@testing-library/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SocialButton from './SocialButton';

// Basic smoke test to ensure component renders without crashing
describe('SocialButton Component', () => {
  const defaultProps = {
    href: 'https://github.com/test',
    icon: FaGithub,
    label: 'My Github',
    arrowIcon: FaExternalLinkAlt,
    delay: 0,
    isExternal: true,
    ariaLabel: 'Visit my GitHub profile',
    description: 'View my code repositories'
  };

  test('renders without crashing', () => {
    render(<SocialButton {...defaultProps} />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  test('displays correct label text', () => {
    render(<SocialButton {...defaultProps} />);
    expect(screen.getByText('My Github')).toBeInTheDocument();
  });

  test('has correct accessibility attributes', () => {
    render(<SocialButton {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Visit my GitHub profile');
    expect(link).toHaveAttribute('href', 'https://github.com/test');
  });
});