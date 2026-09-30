/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'siena-tostado': {
          DEFAULT: '#A0522D',
          hover: '#863F1E',
          light: '#F7EFE9',
        },
        'verde-salvia': {
          DEFAULT: '#87A96B',
          bg: '#EFF5EC',
          dark: '#628248',
        },
        'alabastro': {
          calido: '#F5E6D3',
          light: '#FAF4EC',
          tint: '#FCFAF7',
        },
        'vara-de-oro': '#D4A437',
        'rosa-polvoriento': '#C47A6D',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
