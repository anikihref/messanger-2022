const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        content: ['Ubuntu'],
        title: ['Raleway']

      },
      colors: {
        blue: {
          100: '#EDF2F4',
          200: '#8D99AE',
          300: '#2B2D42'
        },
        red: {
          100: '#EF233C',
          200: '#D90429'
        },

      }
    },
  },
  plugins: [],
}