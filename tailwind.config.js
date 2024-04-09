/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#fc4747",
        dark: "#10141e",
        gray: "#5a698f",
        darkBlue: "#161d2f",
      },
      fontFamily: {
        outfit: ['"Outfit", sans-serif'],
      },
    },
  },
  plugins: [],
};
