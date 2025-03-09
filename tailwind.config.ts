import daisyui from "daisyui";

const TailwindConfig = {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        background: "#171717", // Cor de fundo
        text: "#ffffff", // Cor do texto
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // Fonte padrão Montserrat
      },
      animation: {
        bottomAnimationFadIn: "bottomAnimationFadIn 1s ease-in-out",
      },
    },
    screens: {
      md: "768px", // Breakpoint para tablet
      lg: "1024px", // Breakpoint para desktop
      xl: "1280px", // Breakpoint para desktop grande
      "2xl": "1536px", // Breakpoint para desktop grande
    },
  },
};

export default TailwindConfig;
