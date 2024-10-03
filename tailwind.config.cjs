/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        themeFont: ['raleway', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
