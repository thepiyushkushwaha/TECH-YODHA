/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a9f7',
          500: '#0c8de9',
          600: '#006ec7',
          700: '#0058a3',
          800: '#054b86',
          900: '#0a3f6f',
          950: '#072849',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        ayush: {
          50: '#f4fbf7',
          100: '#e1f5eb',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan 2s ease-in-out infinite alternate',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '5%' },
          '100%': { top: '90%' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.0)' },
        }
      }
    },
  },
  plugins: [],
}
