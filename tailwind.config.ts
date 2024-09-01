import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Add this line to include any files in a src directory
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'navy-blue': '#003366',
        'slate-gray': '#6C757D',
        'sky-blue': '#87CEEB',
        'light-gray': '#F5F5F5',
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light"],
  }
};

export default config;
