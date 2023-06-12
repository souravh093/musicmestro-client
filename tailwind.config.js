/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "white"
        },
      },
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "black",
        },
      },
      "light",
      "dark",
    ],
  },
};
