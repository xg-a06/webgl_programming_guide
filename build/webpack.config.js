/*
 * @Description: 
 * @Author: xg-a06
 * @Date: 2019-05-20 23:11:06
 * @LastEditTime: 2019-07-22 18:55:29
 * @LastEditors: xg-a06
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('./config')
const version = require('../package.json').version
function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  target: 'web',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? '' : 'cheap-module-eval-source-map',
  entry: {
    sdk: resolve('src/sdk.js'),
    'demo/test': resolve('demo/index.js')
  },
  output: {
    filename: '[name].js',
    path: resolve(`dist`),
    library: '[name]',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'happypack/loader?id=happy-babel',
        include: [resolve('src'), resolve('demo')]
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('demo/index.html'),
      filename: 'demo/index.html',
      inject: 'body',
      minify: true,
      chunks: ['demo/test']
    }),
    new HappyPack({
      id: 'happy-babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true // 启用缓存
          }
        }
      ],
      threadPool: HappyPack.ThreadPool({ size: os.cpus().length })
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_PATH: JSON.stringify(config[process.env.BUILD_ENV].API_PATH)
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('demo/public'),
        to: resolve(`dist/demo/static`),
        ignore: ['.*'],
      },
    ]),
  ]
}

module.exports = () => {
  let exConfig = {}
  if (process.env.NODE_ENV === 'local') {
    exConfig = {
      devServer: config.devServer
    }
  } else {
    exConfig = {
      output: {
        publicPath: `/${version}/${process.env.BUILD_ENV}/`
      },
      optimization: {
        minimizer: [
          new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS: {
              output: {
                comments: false,
                beautify: false
              },
              compress: {
                drop_console: false,
                collapse_vars: true,
                reduce_vars: true
              }
            }
          })
        ]
      },
      plugins: [
        new CleanWebpackPlugin([`dist/${version}/${process.env.BUILD_ENV}`], {
          root: resolve('.'),
          verbose: true
        }),
        new ProgressBarPlugin({
          format:
            '  build [:bar] ' +
            chalk.green.bold(':percent') +
            ' (:elapsed seconds)'
        })
      ]
    }
  }
  return merge(baseConfig, exConfig)
}
