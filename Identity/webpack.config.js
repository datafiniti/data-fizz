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
      { test: /.js?$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: [ 'es2015','stage-0','react'] }},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=2' },
      {
  test: /\.(jpeg|png)$/,
  loader: 'url-loader'
}
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