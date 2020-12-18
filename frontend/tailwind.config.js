const colors = require('tailwindcss/colors')

module.exports = {
    purge: {
        layers: [],
        content: [],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            black: '#000',
            white: '#fff',
            gray: colors.blueGray,
            indigo: colors.indigo,
            red: colors.red,
            pink: colors.pink, // Debugging colors
        },
        extend: {},
    },
    variants: {
        extend: {
            borderColor: ['focus'],
            borderWidth: ['first', 'last'],
            borderRadius: ['first', 'last'],
            ringWidth: ['focus-visible'],
        },
    },
    plugins: [],
}
