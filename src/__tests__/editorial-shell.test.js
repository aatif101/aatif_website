import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditorialPortfolio from '../components/EditorialPortfolio';

/**
 * Smoke tests for the editorial shell.
 * These run after every build to catch legacy imports or missing sections.
 */

describe('EditorialPortfolio — section anchors', () => {
  beforeEach(() => {
    render(<EditorialPortfolio />);
  });

  it('renders the identity heading with "Aatif"', () => {
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Aatif');
  });

  it('renders the #about opening spread section', () => {
    expect(document.getElementById('about')).toBeInTheDocument();
  });

  it('renders the #experience section', () => {
    expect(document.getElementById('experience')).toBeInTheDocument();
  });

  it('renders the #projects section', () => {
    expect(document.getElementById('projects')).toBeInTheDocument();
  });

  it('renders the #education section', () => {
    expect(document.getElementById('education')).toBeInTheDocument();
  });

  it('renders the #skills section', () => {
    expect(document.getElementById('skills')).toBeInTheDocument();
  });

  it('renders the colophon footer', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders a skip link targeting #main', () => {
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toHaveAttribute('href', '#main');
  });

  it('renders the lede headline', () => {
    expect(screen.getByText(/building things that feel/i)).toBeInTheDocument();
  });
});

describe('EditorialPortfolio — no legacy terminal visuals', () => {
  it('does not import matrix or terminal components at the component level', () => {
    // Read the source file content and assert no terminal/matrix references
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(
      path.resolve(__dirname, '../components/EditorialPortfolio.jsx'),
      'utf8'
    );
    expect(src).not.toMatch(/matrix/i);
    expect(src).not.toMatch(/terminal/i);
    expect(src).not.toMatch(/cosmic/i);
    expect(src).not.toMatch(/rain/i);
    expect(src).not.toMatch(/framer.motion/i);
    expect(src).not.toMatch(/gsap/i);
    expect(src).not.toMatch(/lenis/i);
  });
});
