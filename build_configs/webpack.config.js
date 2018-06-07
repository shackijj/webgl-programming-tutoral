const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'HelloCanvas': './src/ch1/HelloCanvas.js',
    },
    output: {
        path: path.resolve(__dirname, '../public/'),
        filename: 'js/[name].bundle.js',
        library: 'main'
    },
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        publicPath: '/',
        port: 9000,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['HelloCanvas'],
            bundle: 'HelloCanvas',
            filename: 'ch1/HelloCanvas.html',
            template: 'src/template.html',
        }),
    ]
};