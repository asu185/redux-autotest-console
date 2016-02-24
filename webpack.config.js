module.exports = {
  devtool: 'source-map',
  entry: {
    main: './public/src/main.js'
  },
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
  },  
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets:['es2015', 'react']
      }
    }]
  }
}
