const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      red: '#dc2626',
      orange: '#f97316',
      yellow: '#fde047',
      yellow2: '#f5d537',
      green: '#16a34a',
      blue: '#2563eb',
      indigo: '#4338ca',
      darkIndigo: '#17015b',
      violet: '#6d28d9',
      white: '#ffffff',
      black: '#000000',
      grey: '#808080',
      dark_grey: '#5A5A5A',
    },
    screens: {
      xxs: '512px',
      ...defaultTheme.screens,
      ml: '875px',
      customBP: '1200px',
    },
    extend: {
      scale: {
        '-100': '-1',
      },
      fontFamily: {
        sans: ['--font-carmen-sans', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        '3xl': '1792px',
        '4xl': '2048px',
        '5xl': '2304px',
        '6xl': '2560px',
        '7xl': '2816px',
        '8xl': '3072px',
        '9xl': '3328px',
        '10xl': '3584px',
        '11xl': '3840px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
