// tailwind.config.js (replace existing)
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  "#fff8f0",
          100: "#ffecd4",
          200: "#ffd4a0",
          300: "#ffb566",
          400: "#ff9933", // primary
          500: "#f07800",
          600: "#c45f00",
        },
        gold: {
          300: "#f5d67a",
          400: "#e8b923", // accent
          500: "#c9980a",
        },
        spiritual: {
          dark:  "#1a0f00",
          warm:  "#3d2200",
          cream: "#fdf6ec",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body:    ["'DM Sans'", "sans-serif"],
        nepali:  ["'Noto Serif Devanagari'", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #ff9933 0%, #e8b923 100%)",
        "dark-gradient": "linear-gradient(180deg, #1a0f00 0%, #3d2200 100%)",
      },
    },
  },
  plugins: [],
};