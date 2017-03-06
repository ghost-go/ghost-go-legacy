var webpack = require('webpack')
var precss = require('precss')
const autoprefixer = require('autoprefixer')
const dotenv = require('dotenv')

const dotEnvVars = dotenv.config()
const envVariables = Object.assign({}, dotEnvVars)
const HtmlWebpackPlugin = require('html-webpack-plugin')

const defines =
  Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key])
    memo[`__${key.toUpperCase()}__`] = val
    return memo
  }, {})

module.exports = {
  entry: {
    bundle: [
      'whatwg-fetch',
      './assets/javascripts/app.js'
    ]
    //puzzle: './assets/javascripts/puzzle.js'
  },
  output: {
    path: 'dist',
    filename: '[name].[hash].js',
    publicPath: '/dist/'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.DefinePlugin(defines),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer, precss]
      }
    }),
    new HtmlWebpackPlugin({
      title: 'GhostGo - A modern website to learn Go,Weiqi,Baduk - beta',
      filename: 'index.html',
      template: 'templates/index_pro.ejs',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'es2017', 'stage-0']
          },
        }]
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
          }
        }],
      }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
