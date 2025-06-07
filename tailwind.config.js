/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        primary: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        secondary: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'sf-pro': ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'tighter': '-0.025em',
        'tight': '-0.015em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'widest': '0.05em',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.4',
        'relaxed': '1.6',
        'loose': '1.8',
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounce: {
          '0%, 20%, 53%, 80%, 100%': {
            transform: 'translate3d(0,0,0)',
          },
          '40%, 43%': {
            transform: 'translate3d(0, -30px, 0)',
          },
          '70%': {
            transform: 'translate3d(0, -15px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, -4px, 0)',
          },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      grayscale: {
        30: '30%',
      },
      brightness: {
        75: '.75',
      },
    },
  },
  plugins: [],
};