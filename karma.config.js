var webpack = require('karma-webpack')

module.exports = function (config) {
  config.set({
    frameworks: [ 'jasmine' ],
    files: [
      'tests/**/*_spec.js'
    ],
    plugins: [
      webpack,
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-spec-reporter'
    ],
    browsers: [ 'Chrome' ],
    preprocessors: {
      'tests/**/*_spec.js': ['webpack'],
      'assets/javascripts/**/*.js': ['webpack']
    },
    reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'react', 'es2017', 'stage-0'],
                plugins: ['transform-decorators-legacy']
              },
            }],
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
          },
        ],
      }
    },
    webpackMiddleware: { noInfo: true }
  })
}
