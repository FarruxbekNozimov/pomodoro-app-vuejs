// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#04090D',
        'light-bg': '#F2F9FF',
        'dark-text': '#153047',
        'light-text': '#F2F9FF',
        'sky-blue': '#4CACFF9E',
        'dark-black': '#04090D'
      },
      fontSize: {
        '10xl': '12em'
      }
    }
  }
}
