module.exports = {
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#501F08",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      backdropBlur: {
        xl: "40px",
      },
    },
  },
};
