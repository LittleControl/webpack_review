const { resolve } = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

/*
PWA: 渐进式网络开发应用程序(离线可访问)
    workbox -> workbox-webpack-plugin

*/

// 定义nodejs环境变量,决定使用browerlist的哪个环境
process.env.NODE_ENV = 'production'

module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        // loader: 'style-loader'
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    filename: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '60'
                                        }
                                    }
                                ]
                            ],
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    }
                ]
            },
            {
                exclude: /\.(js|css|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new HtmlWepackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            /* 
                帮助servicework快速启动
                删除旧的servicework

                生成一个servicework配置文件
            */
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8090,
        open: true,
        hot: true
    },
    devtool: 'source-map'
}
