var path = require('path');
var webpack = require('webpack');

 
module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/routes.js'
  ],
  output: { 
    path: '/dist',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      { test: /.js?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] }},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loaders: ['style-loader','css-loader?sourceMap']}
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  progress: true,
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin()
  ]
};