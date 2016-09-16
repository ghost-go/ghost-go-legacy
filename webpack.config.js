/**
 * WEBPACK CONFIG
 *
 * Notes on config properties:
 *
 * 'entry'
 * Entry point for the bundle.
 *
 * 'output'
 * If you pass an array - the modules are loaded on startup. The last one is exported.
 *
 * 'resolve'
 * Array of file extensions used to resolve modules.
 *
 * 'webpack-dev-server'
 * Is a little node.js Express server, which uses the webpack-dev-middleware to serve a webpack bundle.
 * It also has a little runtime which is connected to the server via Socket.IO.
 *
 * 'webpack/hot/dev-server'
 * By adding a script to your index.html file and a special entry point in your configuration
 * you will be able to get live reloads when doing changes to your files.
 *
 * devtool: 'eval-source-map'
 * http://www.cnblogs.com/Answer1215/p/4312265.html
 * The source map file will only be downloaded if you have source maps enabled and your dev tools open.
 *
 * HotModuleReplacementPlugin()
 * Hot Module Replacement (HMR) exchanges, adds or removes modules while an application is running without page reload.
 *
 * NoErrorsPlugin()
 * Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server since it eliminates page reloads
 * altogether and recovers after syntax errors.
 *
 * 'react-hot'
 * React Hot Loader is a plugin for Webpack that allows instantaneous live refresh without losing state
 * while editing React components.
 *
 * 'babel'
 * Babel enables the use of ES6 today by transpiling your ES6 JavaScript into equivalent ES5 source
 * that is actually delivered to the end user browser.
 */

/* eslint-disable no-var */
const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const dotenv = require('dotenv')
const join = path.join
const resolve = path.resolve

// ENV variables
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
      'webpack-dev-server/client?http://localhost:5000',
      'webpack/hot/dev-server',
      'whatwg-fetch',
      './index.js'
    ]
    //puzzle: './assets/javascripts/puzzle.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.DefinePlugin(defines),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'es2016', 'es2017', 'stage-3']
        }
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000'
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  }
}
