
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D45D00', // Orange principal
        'primary-dark': '#000000', // Noir
        secondary: '#112C56', // Bleu principal
        'secondary-dark': '#112C56', // Bleu foncer
        'orange-burnt' : 'rgba(212, 93, 1, 0.1)' // Orange bruler
      },
      // screens: {
      //   xs : {max : '720px'}, 
      //   sm: '720px' , // sm : jusqu à 1200px
      //   md: '1024px', // md : à partir de 1200px
      //   lg: '1024px', // lg : aussi à partir de 1200px (meme seuil que md)
      // },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }
  
        md: '768px',
        // => @media (min-width: 768px) { ... }
  
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }
  
        xl: '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};