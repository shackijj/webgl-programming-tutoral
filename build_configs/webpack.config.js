const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'ch1': './src/ch1/index.js',
        'ch2': './src/ch2/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../public/'),
        filename: 'js/[name].bundle.js'
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
            chunks: ['ch1'],
            bundle: 'ch1',
            filename: 'ch1/index.html',
            template: 'src/template.html',
          }),
          new HtmlWebpackPlugin({
            inject: false,
            chunks: ['ch2'],
            bundle: 'ch2',
            filename: 'ch2/index.html',
            template: 'src/template.html'
          })
    ]
}