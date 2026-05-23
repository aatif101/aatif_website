import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoolThings from '../components/editorial/CoolThings';
import EditorialPortfolio from '../components/EditorialPortfolio';

describe('CoolThings', () => {
  it('renders editorial links with external-link safety attributes', () => {
    render(
      <CoolThings
        items={[
          {
            title: 'Low Tech Magazine',
            url: 'https://solar.lowtechmagazine.com/',
            caption: 'Durable technology with visible constraints.',
            kind: 'technology',
          },
        ]}
      />
    );

    const list = screen.getByLabelText(/things i find cool/i);
    const link = within(list).getByRole('link', { name: /low tech magazine/i });

    expect(within(list).getByRole('article')).toBeInTheDocument();
    expect(within(list).getByText('01')).toBeInTheDocument();
    expect(within(list).getByText(/durable technology/i)).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://solar.lowtechmagazine.com/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a quiet empty state for empty or broken data', () => {
    const { rerender } = render(<CoolThings items={[]} />);

    expect(screen.getByRole('status')).toHaveTextContent(/taste ledger is being edited/i);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();

    rerender(<CoolThings items={[null, {}, { caption: 'missing title' }]} />);

    expect(screen.getByRole('status')).toHaveTextContent(/taste ledger is being edited/i);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('keeps malformed link entries readable instead of crashing', () => {
    render(<CoolThings items={[{ title: 'A printed footnote', url: '', caption: 'No URL yet.' }]} />);

    expect(screen.getByRole('heading', { level: 3, name: /a printed footnote/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /a printed footnote/i })).not.toBeInTheDocument();
    expect(screen.getByText(/no url yet/i)).toBeInTheDocument();
  });
});

describe('EditorialPortfolio — Things I Find Cool integration', () => {
  it('renders the cool-things editorial section with seeded taste items', () => {
    render(<EditorialPortfolio />);

    const section = document.getElementById('cool-things');
    expect(section).toBeInTheDocument();
    expect(within(section).getByRole('heading', { level: 2, name: /a taste ledger/i })).toBeInTheDocument();
    expect(within(section).getByRole('link', { name: /the marginalian/i })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
    expect(within(section).getByText(/literary, humane essays/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cool things/i })).toHaveAttribute('href', '#cool-things');
  });
});
