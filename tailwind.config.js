/**
 * Tailwind CSS configuration.
 *
 * This file tells Tailwind where to look for class usage and extends the
 * default theme. Colours and other design tokens can be customised here
 * to fit the DronHub brand. You can find more options in Tailwind's
 * documentation: https://tailwindcss.com/docs/configuration.
 */
// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#1e40af',
        },
        secondary: {
          DEFAULT: '#14b8a6',
          light: '#5eead4',
          dark: '#0f766e',
        },
        // Incluimos la paleta de grises para que existan clases como bg-gray-50
        gray: colors.gray,
      },
    },
  },
  plugins: [],
};
