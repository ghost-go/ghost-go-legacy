var webpack = require('webpack')
var path = require('path')
var precss = require('precss')
const autoprefixer = require('autoprefixer')
const dotenv = require('dotenv')
const join = path.join
const resolve = path.resolve

const dotEnvVars = dotenv.config()
const envVariables = Object.assign({}, dotEnvVars)

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
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/static/'
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
