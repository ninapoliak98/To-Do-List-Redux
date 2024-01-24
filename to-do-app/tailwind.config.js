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
        skyblue: '#BBD0FF',
        mbpink: '#B07C9E',
        lightcoral: '#D9727A',
        rosybrown: '#B59194',
        pinklavender: '#D2A1B8',
        frenchlavender: '#6622CC',
        shark: {
          '50': '#f3f7f8',
          '100': '#e1e9ec',
          '200': '#c6d5db',
          '300': '#9eb7c2',
          '400': '#6f92a1',
          '500': '#547686',
          '600': '#486272',
          '700': '#3f525f',
          '800': '#394751',
          '900': '#333e46',
          '950': '#1f272e',
        },
      }
    }

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

