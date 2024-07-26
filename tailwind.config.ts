import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      fontFamily: {
        roboto: ["var(--font-roboto-mono)"],
        scp: ["var(--font-source-code-pro)"],
      },
      height: {
        content: "calc(100% - 3.5rem)",
        section: "calc(100vh - 3.5rem)",
      },
      maxHeight: {
        content: "calc(100% - 3.5rem)",
      },
      boxShadow: {
        neon: "0 0 2px #fff, inset 0 0 2px #fff, 0 0 5px #10b981, 0 0 15px #10b981, 0 0 30px #10b981",
        card: "inset -26px -26px 62px #bcbcbc, inset 26px 26px 62px #ffffff",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
