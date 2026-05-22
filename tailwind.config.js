/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Spectral', 'Plantin', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        paper:    'var(--color-paper)',
        ink:      'var(--color-ink)',
        muted:    'var(--color-muted)',
        faint:    'var(--color-faint)',
        oxblood:  'var(--color-oxblood)',
        accent:   'var(--color-accent)',
        hairline: 'var(--color-hairline)',
        surface:  'var(--color-surface)',
      },
      maxWidth: {
        prose: 'var(--col-prose)',
        wide:  'var(--col-wide)',
      },
      lineHeight: {
        tight: 'var(--leading-tight)',
        snug:  'var(--leading-snug)',
        prose: 'var(--leading-prose)',
      },
      letterSpacing: {
        tight: 'var(--tracking-tight)',
        wide:  'var(--tracking-wide)',
        caps:  'var(--tracking-caps)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
    },
  },
  plugins: [],
}
