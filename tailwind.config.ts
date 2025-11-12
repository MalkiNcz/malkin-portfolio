/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        vibur: ['"Vibur"', 'cursive'],
      },
      keyframes: {
        blink: {
          '78%': { color: 'inherit', textShadow: 'inherit' },
          '79%': { color: '#333', textShadow: 'none' },
          '80%': { textShadow: 'none' },
          '81%': { color: 'inherit', textShadow: 'inherit' },
          '82%': { color: '#333', textShadow: 'none' },
          '83%': { color: 'inherit', textShadow: 'inherit' },
          '92%': { color: '#333', textShadow: 'none' },
          '92.5%': { color: 'inherit', textShadow: 'inherit' },
        },
      },
      animation: {
        blink2s: 'blink 2s linear infinite',
        blink3s: 'blink 3s linear infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities } : any) {
      addUtilities({
        '.text-shadow-neon': {
          textShadow:
            '0 -40px 100px, 0 0 2px, 0 0 1em #ff4444, 0 0 0.5em #ff4444, 0 0 0.1em #ff4444, 0 10px 3px #000',
        },
      });
    },
  ],
};
