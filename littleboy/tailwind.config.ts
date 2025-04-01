import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enable dark mode support
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Add this plugin
} satisfies Config;
