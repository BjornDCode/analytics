const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            gray: colors.blueGray,
            pink: colors.pink, // Debugging colors
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
