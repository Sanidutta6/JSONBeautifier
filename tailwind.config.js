/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "background-1": "#9DADE7",
        "background-2": "#2B1354",
        "background-3": "#F6F8FE",
        "color-1": "#4C2A85",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
