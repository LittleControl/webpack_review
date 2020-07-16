const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
HMR: hot module replacemnet
样式文件: 可以使用HMR功能,因为style-loader内部实现了
js文件和html文件默认不使用HMR功能
*/

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/index.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                exclude: /\.(css|html|js)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8090,
        open: true
    }
}
