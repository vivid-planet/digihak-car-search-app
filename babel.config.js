module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        assets: './src/assets',
                        api: './src/api',
                        utils: './src/utils',
                        screens: './src/screens',
                    },
                },
            ],
        ],
    };
};
