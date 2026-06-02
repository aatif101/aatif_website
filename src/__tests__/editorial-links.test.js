import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoolThings from '../components/editorial/CoolThings';
import Colophon from '../components/editorial/Colophon';
import EditorialPortfolio from '../components/EditorialPortfolio';

describe('Editorial links and landmarks', () => {
  it('keeps CoolThings external links safe and the list label accessible', () => {
    render(
      <CoolThings
        items={[
          {
            title: 'The Marginalian',
            url: 'https://www.themarginalian.org/',
            caption: 'Literary essays with a humane pace.',
            kind: 'reading',
          },
        ]}
      />
    );

    const coolList = screen.getByLabelText('Things I find cool');
    const externalLink = within(coolList).getByRole('link', { name: 'The Marginalian' });

    expect(coolList).toBeInTheDocument();
    expect(within(coolList).getByRole('article')).toBeInTheDocument();
    expect(externalLink).toHaveAttribute('href', 'https://www.themarginalian.org/');
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps Colophon as a named contentinfo landmark with contact links intact', () => {
    render(
      <Colophon
        identity={{ name: 'Mohammad Aatif Shaikh', location: 'Tampa, FL' }}
        contact={{
          email: 'mohammadaatif@usf.edu',
          linkedin: 'https://linkedin.com/in/shaikhaatif',
          github: 'https://github.com/aatif101',
        }}
      />
    );

    const footer = screen.getByRole('contentinfo', { name: 'Contact and colophon' });

    expect(footer).toHaveAttribute('id', 'contact');
    expect(within(footer).getByText(/contact \/ colophon/i)).toBeInTheDocument();
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
  });

  it('keeps portfolio navigation, section landmarks, and footer anchor connected', () => {
    render(<EditorialPortfolio />);

    const pageNavigation = screen.getByRole('navigation', { name: 'Page sections' });
    const contactFooter = screen.getByRole('contentinfo', { name: 'Contact and colophon' });

    expect(within(pageNavigation).getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#contact'
    );
    expect(within(pageNavigation).queryByRole('link', { name: 'Cool things' })).not.toBeInTheDocument();
    expect(document.getElementById('cool-things')).not.toBeInTheDocument();
    expect(contactFooter).toHaveAttribute('id', 'contact');
  });
});
