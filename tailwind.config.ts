import type { Config } from "tailwindcss";

// Все цвета и шрифты бренда собраны здесь — если бренд пришлёт
// готовый логотип и фирменный стиль, палитру и шрифты нужно менять
// только в этом файле.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F6F2EA", // основной молочный фон
        graphite: "#2A2724", // основной текст
        bordeaux: "#6E2A34", // акцентный цвет (действия, ссылки, кнопки)
        cocoa: "#5C4433", // вторичный акцент (тёплые детали, hover)
        line: "#DAD3C7", // разделители, обводки, тонкие рамки
        sand: "#EDE6D8", // альтернативный фон секций
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
