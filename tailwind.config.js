/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#FFD66C",
        btnHover: "#edab03",
      },
    },
  },
  plugins: [require("daisyui")],
};
