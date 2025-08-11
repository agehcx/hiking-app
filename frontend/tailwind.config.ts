import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { 
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'sans': ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Main CI Colors
        primary: {
          50: '#eaf5ea',
          100: '#d9edd9',
          200: '#c4e4c5',
          300: '#a5d6a7', // Light Green
          400: '#7cc68a',
          500: '#4caf50', // Main Green
          600: '#3c8f40',
          700: '#2f7033',
          800: '#225426',
          900: '#173b1b',
        },
        // Additional theme colors
        secondary: {
          50: '#f5f7f6',
          100: '#e3e8e3',
          200: '#c7d2c8',
          300: '#a4b9a6',
          400: '#7a9b7d',
          500: '#5a7f5e',
          600: '#46634a',
          700: '#384f3b',
          800: '#2f422f',
          900: '#263626',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scroll-reveal': 'scrollReveal 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -8px, 0)' },
          '70%': { transform: 'translate3d(0, -4px, 0)' },
          '90%': { transform: 'translate3d(0, -2px, 0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(76, 175, 80, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(76, 175, 80, 0.5)' },
        },
        scrollReveal: {
          '0%': { opacity: '0', transform: 'translateY(50px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      transitionProperty: {
        'colors-transform': 'color, background-color, border-color, text-decoration-color, fill, stroke, transform',
        'colors-shadow': 'color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
} satisfies Config;
