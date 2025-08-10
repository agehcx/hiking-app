import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { 
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'sans': ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    } 
  },
  plugins: [],
} satisfies Config;
