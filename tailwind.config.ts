import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ccit: { black: "#000000", violet: "#7D39EB", lime: "#C6FF33", white: "#FFFFFF" } } } }, plugins: [] };
export default config;
