/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    colors: {
      primary: '#4E8D6E',
      textFieldBorder: '#D4D6DC',
      textFieldColor: '#7C7C7C',
      success: '#3699FF',
      white: '#FFFFFF',
      red: '#FF0000',
      secondary: '#FFC007',
      light: '#F5F5F5',
      textLight: '#A1A5B7',
      textDark: '#414354',
      dashboardBg: '#F6F6F6',
      sidebarBorder: '#EAEAEE',
      routersTextColor: '#434349',
    },
  },
  plugins: [],
};
