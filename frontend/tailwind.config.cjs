/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0091AE",
        "primary-dark": "#001D23",
        "primary-darker": "#000E11",
        "accent": "#EE3124",
        "light": "#FFFFFF",
        "dark": "#000000",
        "danger": "#EE3124",
        "success": "#00A651",
        "warning": "#FFC107",
        "info": "#0091AE",
      },
      transitionDuration: "0.5s",
    },
  },
  safelist: [
    {
      pattern: /^.+-(primary|accent|secondary|info|success|warning|danger|dark|light|pink)/,
    },
  ],
  plugins: [],
}

