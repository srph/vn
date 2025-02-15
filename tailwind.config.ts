import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        questrial: ["var(--font-questrial)"],
        dmSerifDisplay: ["var(--font-dm-serif-display)"],
        funnelDisplay: ["var(--font-funnel-display)"],
      },
    },
  },
  plugins: [],
};
export default config;
