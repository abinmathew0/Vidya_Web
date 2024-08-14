/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkRed: "#9A3B3B",
        burntOrange: "#C08261",
        softYellow: "#E2C799",
        lightCream: "#F2ECBE",
      },
    },
  },
  plugins: [],
};
