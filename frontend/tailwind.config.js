export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFC107", // Jaune Construction
        secondary: "#212121", // Noir
        lightGray: "#F5F5F5", // Gris Clair
        deepBlue: "#004A99", // Bleu Profond
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
