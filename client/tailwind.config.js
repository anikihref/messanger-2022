
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        content: ['Ubuntu'],
        title: ['Raleway'],
      },
      colors: {
        hot: {
          100: '#EE9B00',
          200: '#CA6702',
          300: '#BB3E03',
          400: '#AE2012',
          500: '#9B2226',
        },
        cold: {
          100: '#94D2BD',
          200: '#0A9396',
          300: '#005F73',
          400: '#001219',
        },
        neutral: '#E9D8A6'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem'
        },
        screens: {
          xl: '1240px'
        }
      },
      
    },
    plugins: [],
  },
};
