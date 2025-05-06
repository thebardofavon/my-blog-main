/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#faf6f2',
          100: '#f2e9e1',
          200: '#e0d2c3',
          300: '#cdbbac',
          400: '#b29880',
          500: '#9c7a5e',
          600: '#88634a',
          700: '#674a38', 
          800: '#573e2e',
          900: '#483426',
        },
      },
    },
  },
  plugins: [],
}

