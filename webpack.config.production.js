var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var precss = require('precss')

module.exports = {
  entry: {
    bundle: [
      'whatwg-fetch',
      './index.js'
    ]
    //puzzle: './assets/javascripts/puzzle.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    //new webpack.DefinePlugin({
      //__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
      //__PRO__: JSON.stringify(JSON.parse(process.env.BUILD_PRO || 'true'))
    //}),
    //new webpack.DefinePlugin({
      //'process.env': {
        //'NODE_ENV': JSON.stringify('production')
      //}
    //}),
    //new webpack.optimize.UglifyJsPlugin({
      //compress: {
        //warnings: false
      //}
    //})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
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
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss]
  }
}
