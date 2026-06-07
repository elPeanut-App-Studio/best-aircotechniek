/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6fb',
          100: '#d9e8f5',
          200: '#b3d1eb',
          300: '#7eb3db',
          400: '#4a94c9',
          500: '#2d76ad',
          600: '#245f8f',
          700: '#1f5279',
          800: '#1b4e79',
          900: '#153d5f',
          950: '#0f2d47',
        },
        gold: {
          50: '#fdf9eb',
          100: '#faf0c8',
          200: '#f5e08f',
          300: '#f0d061',
          400: '#e8b923',
          500: '#d4af37',
          600: '#b8942f',
          700: '#947625',
          800: '#7a6120',
          900: '#654f1b',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brand: '0 4px 14px rgba(27, 78, 121, 0.15)',
        gold: '0 4px 14px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
};
