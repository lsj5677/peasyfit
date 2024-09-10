import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainPurple: "#7F27FF",
        mainOrange: "#FF8911",
        mainYellow: "#FFFB73",
        subPurple: "#9F70FD",
        subOrange: "#FDBF60",
        subYellow: "#FFF8C9",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
