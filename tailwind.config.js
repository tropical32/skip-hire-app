/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this covers your files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0037C1',
          dark: '#002da1',
          light: 'rgba(0, 55, 193, 0.1)',
        },
        dark: { // <--- This 'dark' object
          bg: '#121212',   // <--- This 'bg' key generates 'bg-dark-bg'
          card: '#1C1C1C',
          border: '#2A2A2A',
          hover: '#3A3A3A'
        },
        accent: {
          yellow: '#eab308',
          red: '#ef4444',
        }
      },
      keyframes: {
        // ... (keyframes should be fine)
      },
      animation: {
        // ... (animations should be fine)
      }
    },
  },
  plugins: [],
}
