const { resolve } = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

/*
tree shaking: 
    前提: 使用ES6模块; 使用production环境
    作用: 减少代码体积

    在package.json中配置
    sideEffects: false 
        所有代码都没有副作用, 都可以进行tree shaking
        问题: 科恩跟会把css / @babel/polyfill(副作用) 文件干掉
        sideEffects: ['*.css', '*.less']
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
                    /* 
                        开启多进程打包
                        进程启动大概600ms,进程通行也有开销
                        只有工作消耗时间比较长,才需要多进程打包
                    */
                    // 'thread-loader',
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2 //进程 2
                        }
                    },
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
        new OptimizeCssAssetsWebpackPlugin()
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
