/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      maxWidth: {
        3.5: '3.5rem',
      },
    },
  },
  plugins: [],
};
