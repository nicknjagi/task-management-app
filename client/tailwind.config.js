/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", 'sans-serif'],
      },
      colors: {
        black: '#000112',
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        "very-dark-grey":'#20212C',
        "dark-grey":'#2B2C37',
        "light-grey":'#F4F7FD',
        "mid-grey":"#828fa3",
        "lines-dark":'#3E3F4E',
        "lines-light":'#E4EBFA',
        red:'#EA5555',
        "red-hover":'#FF9898',
      },
    },
  },
  plugins: [require("daisyui")],
}

