const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        ch1: './src/ch1/index.js',
        ch2: './src/ch2/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        publicPath: '/assets/',
        port: 9000,
        open: true,
    },
}