const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'HelloCanvas': './src/ch2/HelloCanvas.js',
        'HelloPoint1': './src/ch2/HelloPoint1/HelloPoint1.js',
        'HelloPoint2': './src/ch2/HelloPoint2/HelloPoint2.js',
        'ClickPoint': './src/ch2/ClickPoint/ClickPoint.js',
        'ColoredPoints': './src/ch2/ColoredPoints/ColoredPoints.js',
        'MultiPoints': './src/ch3/MultiPoints/MultiPoints.js',
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
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['ClickPoint'],
            bundle: 'ClickPoint',
            filename: 'ch1/ClickPoint.html',
            template: 'src/template.html',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['ColoredPoints'],
            bundle: 'ColoredPoints',
            filename: 'ch1/ColoredPoints.html',
            template: 'src/template.html',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            chunks: ['MultiPoints'],
            bundle: 'MultiPoints',
            filename: 'ch2/MultiPoints.html',
            template: 'src/template.html',
        }),
    ]
};