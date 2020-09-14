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
  mode: 'production',
  devtool: 'cheap-module-source-map',
  externals: {
    //忽略包名 --npm包名
    //不打包jquery
    jquery: 'jQuery'
  }
}
