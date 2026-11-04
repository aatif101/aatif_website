import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  document.documentElement.dataset.theme = 'light';
  window.matchMedia = () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  });
});

test('the work grid leads directly to the projects', () => {
  render(<App />);
  expect(screen.getAllByRole('article')).toHaveLength(4);
  expect(screen.getByRole('link', { name: 'Live site ↗' }).href).toBe('https://easya.fyi/');
  expect(screen.getByRole('link', { name: 'Resume TODO' }).pathname).toMatch(/\/resume\.pdf$/);
});

test('the dark mode control persists an explicit choice', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: 'Dark mode' });
  fireEvent.click(toggle);
  expect(toggle.getAttribute('aria-pressed')).toBe('true');
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('portfolio-theme')).toBe('dark');
});
