module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        youtube: {
          red: "#FF0000",
          black: "#0F0F0F",
          dark: "#181818",
          gray: "#717171",
          lightGray: "#AAAAAA",
          hover: "#272727",
          sidebar: "#212121",
          border: "#303030",
          white: "#FFFFFF",
          blue: "#3EA6FF",
        },
      },
    },
  },
  plugins: [],
};
