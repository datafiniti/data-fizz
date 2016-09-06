var path = require('path');
var webpack = require('webpack');

 
module.exports = {
  entry: './src/routes.js',
  output: { 
    path: '/dist',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /.js?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] }},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loaders: ['style-loader','css-loader?sourceMap']},
      { test: /\.(jpg|png)$/, loader: 'url?limit=25000' }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  progress: true
};