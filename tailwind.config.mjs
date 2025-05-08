// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      './src/pages/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {
        fontFamily: {
          outfit: ['Outfit', 'sans-serif'],
          inter: ['inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  
  export default config
  