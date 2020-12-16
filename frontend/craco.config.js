module.exports = {
    plugins: [
        {
            plugin: require('craco-alias'),
            options: {
                aliases: {
                    '~': './src',
                    '@': './src/components',
                },
            },
        },
    ],
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
                require('css-has-pseudo/postcss'),
            ],
        },
    },
}
