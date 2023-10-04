/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#FFD66C",
        btnHover: "#edab03",
        violetLight: "#a36ee0",
        black: "#a36ee0",
        violetDark: "#1f1132",
      },
      fontFamily: {
        sofadi: ["Sofadi One", "cursive"],
        roboto: ["Roboto Condensed", "sans-serif"],
        notSerif: ["Noto Serif JP", "seri"],
      },
    },
  },
  plugins: [require("daisyui")],
};
