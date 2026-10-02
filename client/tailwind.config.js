/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: {
          DEFAULT: '#111827',
          elevated: '#1a2236',
          card: '#161f30',
          border: '#27354f',
        },
        brand: {
          DEFAULT: '#6366f1', // Indigo
          hover: '#4f46e5',
          light: '#818cf8',
          accent: '#06b6d4', // Cyan accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
