const { resolve } = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: ['./src/js/index.js', './index.html'],
  output: {
    filename: 'js/built.js',
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
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         presets: [
      //           [
      //             '@babel/preset-env',
      //             {
      //               useBuiltIns: 'usage',
      //               corejs: {
      //                 version: 3
      //               },
      //               targets: {
      //                 chrome: '60',
      //                 firefox: '60'
      //               }
      //             }
      //           ]
      //         ]
      //       }
      //     },
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         fix: true
      //       }
      //     }
      //   ]
      // },
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
      template: './index.html',
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
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 8090,
    open: true,
    hot: true
  },
  devtool: 'cheap-module-source-map'
  /* 
      [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
      source-map: 一种提供源代码构建后映射技术(如果构建出错了,通过映射饿可以追踪源代码错误信息)

      内联和外部的区别: 外部生成了文件,内联没有; 内联构建速度更快
      source-map 外部
          错误代码精确信息和源代码错误位置
      inline-source-map 内联,只生成一个内联source-map文件
          错误代码精确信息和源代码错误位置
      hidden-source-map 外部
          错误代码错误原因和构建后代码的错误位置,不能追踪源代码错误位置
      eval-source-map 内联,每一个文件都生成对应的source-map
          错误代码精确信息和源代码错误位置(多了一个哈希值)
      nosources-source-map 外部
          错误代码精确信息,但是不能跳转到源代码
      cheap-source-map 外部
          错误代码精确信息和源代码错误位置(只能精确到行)
      cheap-module-source-map 外部
          错误代码精确信息和源代码错误位置(只能精确到行)
          module会将loader的source map加入

      内联和外部的区别: 外部生成了文件,内联没有; 内联构建速度更快

      开发环境: 速度快,调试更友好 
          速度快: eval > inline > cheap
              eval-cheap-source-map
              eval-source-map
          调试友好
              source-map
              cheap-module-source-map
              cheap-source-map
          => eval-source-map / eval-cheap-module-source-map
      生产环境: 源代码要不要隐藏,调试要不要更友好
          内联会让代码体积变大,所以在生产模式下一般不使用内联
          nosources-source-map 全部隐藏
          hidden-source-map   只隐藏源代码,会提示构建后代码错误信息
          source-map

          => source-map / cheap-module-source-map
  */
}
