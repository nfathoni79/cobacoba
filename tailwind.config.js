/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Comic Neue', 'ui-sans-serif'],
      },
      colors: {
        'green-custom': '#00bf62',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

