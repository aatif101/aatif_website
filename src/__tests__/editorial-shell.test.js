import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditorialPortfolio from '../components/EditorialPortfolio';

/**
 * Smoke tests for the editorial shell.
 * These run after every build to catch legacy imports or missing sections.
 */

describe('EditorialPortfolio — section anchors and trusted content', () => {
  beforeEach(() => {
    render(<EditorialPortfolio />);
  });

  it('renders the identity heading with Aatif’s full trusted name', () => {
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Mohammad Aatif Shaikh');
  });

  it('renders the #about opening spread section from the content module', () => {
    expect(document.getElementById('about')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /building applied ai systems with security taste and shipping urgency/i,
      })
    ).toBeInTheDocument();
  });

  it('renders exactly two pinned selected-work spreads: Reliu and NazScan', () => {
    const section = document.getElementById('selected-work');
    expect(section).toBeInTheDocument();

    const articles = within(section).getAllByRole('article');
    expect(articles).toHaveLength(2);
    expect(within(section).getByText('Reliu')).toBeInTheDocument();
    expect(within(section).getByText('NazScan')).toBeInTheDocument();
    expect(within(section).getByText(/TestFlight-ready build in 3 days/i)).toBeInTheDocument();
    expect(within(section).getByText(/one-command security scanner for vibe-coded repos/i)).toBeInTheDocument();
  });

  it('renders the GitHub activity annual-report spread from the static artifact', () => {
    const section = document.getElementById('github-activity');
    expect(section).toBeInTheDocument();

    expect(
      within(section).getByRole('heading', { level: 2, name: /a public engineering ledger/i })
    ).toBeInTheDocument();
    expect(within(section).getByLabelText(/github activity report/i)).toBeInTheDocument();
    expect(within(section).getByText(/live public artifact|fallback data visible/i)).toBeInTheDocument();
    expect(within(section).getByRole('heading', { level: 3, name: /recent public marks/i })).toBeInTheDocument();
    expect(within(section).getByRole('heading', { level: 3, name: /active repositories/i })).toBeInTheDocument();
  });

  it('renders experience, education, and leadership in one dense timeline', () => {
    const section = document.getElementById('timeline');
    expect(section).toBeInTheDocument();

    expect(within(section).getByText(/AI\/ML Extern/i)).toBeInTheDocument();
    expect(within(section).getByText(/CacheAi/i)).toBeInTheDocument();
    expect(within(section).getByText(/B\.S\. Computer Science/i)).toBeInTheDocument();
    expect(within(section).getByText(/USF Student Government/i)).toBeInTheDocument();
  });

  it('renders typographic contact details and site colophon notes in the footer', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveAttribute('aria-label', 'Contact and colophon');
    expect(within(footer).getByText(/contact \/ colophon/i)).toBeInTheDocument();
    expect(within(footer).getByText(/tampa, fl/i)).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: 'mohammadaatif@usf.edu' })).toHaveAttribute(
      'href',
      'mailto:mohammadaatif@usf.edu'
    );
    expect(within(footer).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/shaikhaatif'
    );
    expect(within(footer).getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/aatif101'
    );
    expect(within(footer).getByText(/set in spectral/i)).toBeInTheDocument();
    expect(within(footer).queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a skip link targeting #main', () => {
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toHaveAttribute('href', '#main');
  });

  it('does not render a separate Skills section or skill tags surface', () => {
    expect(document.getElementById('skills')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /^Craft$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^Skills$/i })).not.toBeInTheDocument();
  });
});

describe('EditorialPortfolio — no legacy terminal visuals or unsupported placeholders', () => {
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

  it('does not render unsupported selected-work placeholders', () => {
    render(<EditorialPortfolio />);
    expect(screen.queryByText(/MedFlow/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/LinkedInWrapped/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/LawyerUp/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Autoscaler/i)).not.toBeInTheDocument();
  });
});
