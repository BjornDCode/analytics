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
    eslint: {
        enable: false,
    },
    webpack: {
        configure: webpackConfig => {
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }) =>
                    constructor && constructor.name === 'ModuleScopePlugin'
            )

            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)
            return webpackConfig
        },
    },
}
