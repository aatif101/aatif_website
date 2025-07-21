/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#0a0a0f',
          darker: '#05050a',
          purple: '#6366f1',
          blue: '#3b82f6',
          green: '#10b981',
          orange: '#f59e0b',
          pink: '#ec4899',
        },
        terminal: {
          green: '#00ff41',
          amber: '#ffbf00',
          red: '#ff0040',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.3)',
            textShadow: '0 0 20px rgba(99, 102, 241, 0.8)'
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.8), 0 0 60px rgba(99, 102, 241, 0.5)',
            textShadow: '0 0 30px rgba(99, 102, 241, 1)'
          },
        },
      }
    },
  },
  plugins: [],
} 