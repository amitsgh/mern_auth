/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#171645",
      secondary: "#F1F1F7",
      tertiary: "#FFFFFF",
      slate: "#627AD1",
      warning: '#d30f3f'
    },
    // width: {
    //     button: '13rem',
    // },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    extend: {},
  },
  plugins: [],
};
