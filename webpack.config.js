const path = require('path');

module.exports = {
  entry: ['./app/Index.js', 'whatwg-fetch'],
  output: {
    filename: './public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-2']
        }
      }
    ]
  },
  devtool: 'source-map'
};
