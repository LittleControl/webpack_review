const { resolve } = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    // entry: ['./src/js/index.js', './src/index.html'],
    entry: './src/js/index.js',
    // entry: {
    //     //多入口,有一个入口,最终输出就有一个bundle
    //     main: './src/js/index.js',
    //     utils: './src/js/utils.js'
    // },
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWepackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
    ],
    /* 
        可以将node_modules中代码单独打包为一个chunk最终输出
        自动分析多入口chunk中,有没有公共的文件,如果有,会单独打包成一个chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production',
}
