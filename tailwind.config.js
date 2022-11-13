/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/js/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#61dafb",

        bg1: "#20232a",
        bg2: "#282c34",
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
