module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [[
        'react-native-reanimated/plugin'
    ], [
        'module-resolver',
        {
            extensions: [
                '.ios.js',
                '.android.js',
                '.ios.jsx',
                '.android.jsx',
                '.js',
                '.jsx',
                '.json',
                '.ts',
                '.tsx',
                '.png',
                '.jpg',
                '.jpeg',
                '.gif',
                '.svg'
            ],
            root: ['.'],
            alias: {
                '@': './src',
                '@src': './src'
            }
        }
    ]]
};
