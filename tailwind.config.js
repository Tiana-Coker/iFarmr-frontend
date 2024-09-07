/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px", // Small screens (e.g., phones)
        md: "768px", // Medium screens (e.g., tablets)
        lg: "1024px", // Large screens (e.g., laptops)
        xl: "1280px", // Extra large screens (e.g., desktops)
        "2xl": "1536px", // 2xl screens (e.g., large desktops)
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'], // Add Raleway font
      },
      fontSize: {
        'custom-lg': '16px', // Custom font size
        'custom-xl': '23px', // Custom font size for large headings
        'custom-sm': '14px',
        'custom-big': '18px',
      },
      lineHeight: {
        'custom-lg': '18.78px', // Custom line height
        'custom-xl': '27px', // Custom line height for large headings
        'custom-h' : '24px',
      },
      fontWeight: {
        'medium': 500, // Custom font weight
        'verylight': 400,
        'thick': 700, // Custom font weight for headings
      },
      colors: {
        'custom-green': '#00563E', // Custom color for text
        'custom-bg': '#2F580F', // Custom background color
        'custom-writing':  '#4F4F4F', // Custom color for writing
    
      },
    },
  },
  plugins: [],
}
