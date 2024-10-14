/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        themeFont: ['raleway', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        cardShadow: '0 .125rem .25rem rgba(0, 0, 0, .075);'
      },
      colors: {
        primary50: '#923EB91A',
        primary100: '#923EB9',
        neutral0: '#FFFFFF',
        neutral20: '#F2F4FF',
        neutral50: '#B0AFAF',
        neutral100: '#5F5F5F',
        neutral150: '#4C5258',
        neutral200: '#212529',
        cardBorderLight: '#e2e3e4',
        modal: '#0a1e4266'
      }
    }
  },
  plugins: []
};
