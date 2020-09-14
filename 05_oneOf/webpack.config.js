const { resolve } = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    outputDir: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                //一下loader只会匹配一个
                //不可以有两个配置处理同一种类型文件类型
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            // 'style-loader',
                            //将css文件提取为单独的文件
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            //css兼容性处理
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => [
                                        require('postcss-preset-env')()
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        test: /\.html$/,
                        use: 'html-loader',
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    name: '[hash:10]:[ext]',
                                    outputPath: 'img',
                                    limit: 8 * 1024,
                                    esModule: false,
                                },
                            },
                        ],
                    },
                    {
                        exclude: /\.(html|css|js|png|jpg|gif)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[hash:10]:[ext]',
                                    outputPath: 'media',
                                },
                            },
                        ],
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                //js兼容性处理
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
                                                    firefox: '60',
                                                    ie: '9',
                                                    safari: '10',
                                                    edge: '17'
                                                }
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWepackPlugin({
            template: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    development: 'production',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8090,
        open: true
    },
    devtool: 'source-map'
}