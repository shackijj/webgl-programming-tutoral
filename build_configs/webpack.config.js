const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'HelloCanvas': './src/ch1/HelloCanvas.js',
        'HelloPoint1': './src/ch1/HelloPoint1/HelloPoint1.js',
        'HelloPoint2': './src/ch1/HelloPoint2/HelloPoint2.js',
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
    module: {
        rules: [
            {
                test: /\.glsl$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['HelloCanvas'],
            bundle: 'HelloCanvas',
            filename: 'ch1/HelloCanvas.html',
            template: 'src/template.html',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['HelloPoint1'],
            bundle: 'HelloPoint1',
            filename: 'ch1/HelloPoint1.html',
            template: 'src/template.html',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['HelloPoint2'],
            bundle: 'HelloPoint2',
            filename: 'ch1/HelloPoint2.html',
            template: 'src/template.html',
        }),
    ]
};