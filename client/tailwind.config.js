
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    require('tailwind-scrollbar'),
  ],
  theme: {
    extend: {
      fontFamily: {
        content: ['Ubuntu'],
        title: ['Raleway'],
      },
      colors: {
        blue: {
          100: '#4CC9F0',
          200: '#4895EF',
          300: '#4361EE',
          400: '#3F37C9',
          500: '#3A0CA3',
        },
        purple: {
          100: '#F72585',
          200: '#B5179E',
          300: '#7209B7',
          400: '#560BAD',
          500: '#480CA8',
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem'
        },
        screens: {
          xl: '1240px'
        }
      },
      
    },
    plugins: [],
  },
};
