/** @type {import('tailwindcss').Config} */

// Every colour reads a CSS variable defined in src/index.css, so the dark theme
// (default) and the light theme share one set of class names.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Original token names, kept so the design language stays recognisable
        primary: {
          cyan: token('accent'),
          blue: token('accent-2'),
        },
        accent: {
          purple: token('violet'),
        },
        background: {
          dark: token('deep'),
        },
        text: {
          white: token('ink'),
          gray: token('muted'),
        },
        // Surfaces and text
        page: token('page'),
        section: token('section'),
        card: token('card'),
        glass: token('glass'),
        line: token('line'),
        ink: token('ink'),
        body: token('body'),
        muted: token('muted'),
        subtle: token('subtle'),
        signal: token('signal'),
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(90deg, rgb(var(--c-accent)), rgb(var(--c-accent-2)))',
        'gradient-hero-br': 'linear-gradient(135deg, rgb(var(--c-accent)), rgb(var(--c-accent-2)))',
      },
      spacing: {
        container: '1440px',
        section: '120px',
      },
      borderRadius: {
        pill: '9999px',
        card: '16px',
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        icon: 'var(--shadow-icon)',
      },
      animation: {
        pulse: 'pulse 2s infinite',
        'pulse-once': 'pulse-once 2s ease-in-out forwards',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'pulse-once': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
