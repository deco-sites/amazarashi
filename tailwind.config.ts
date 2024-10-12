import daisyui from "daisyui";
import { Config, PluginCreator } from "./node_modules/tailwindcss/types/config.d.ts";

const TailwindConfig: Config = {
  plugins: [daisyui as unknown as PluginCreator],
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
      lg: "1024px", // Breakpoint para desktop
    },
  },
};

export default TailwindConfig;
