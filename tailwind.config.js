/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: '#00d8ff',
          blue: '#007bff',
        },
        accent: {
          purple: '#6c63ff',
        },
        background: {
          dark: '#0a0a0a',
        },
        text: {
          white: '#ffffff',
          gray: '#b0b0b0',
        },
      },
      gradientColorStops: {
        hero: ['#00d8ff', '#007bff'],
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
        glow: '0 0 20px rgba(0, 216, 255, 0.5)',
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
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
