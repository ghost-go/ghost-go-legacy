module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:8090/assets'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  externals: {
    'react': "React"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
  //config.set({
    //preprocessors: {
      //'spec/**/*.js': ['babel'],
    //},
    //babelPreprocessor: {
      //options: {
        //presets: ['es2015'],
        //sourceMap: 'inline'
      //},
      //filename: function (file) {
        //return file.originalPath.replace(/\.js$/, '.es5.js');
      //},
      //sourceFileName: function (file) {
        //return file.originalPath;
      //}
    //}
  //});
}
