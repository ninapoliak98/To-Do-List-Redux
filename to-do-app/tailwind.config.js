/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js,jsx,ts,tsx}',
    './components/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sweetpurple: '#C8B6FF',
        pastelpink: '#FFD6FF',
        lilac: '#E7C6FF',
        babyblue: '#B8C0FF',
        skyblue: '#BBD0FF'

      }
    }

  },
  plugins: [],
}

