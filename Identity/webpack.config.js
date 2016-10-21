const webpack = require('webpack');
const path = require('path');

let config = {};

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  config = {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    noInfo: false,
    entry: [
      'webpack-hot-middleware/client?reload=true',
      './src/index',
    ],
    target: 'web',
    output: {
      path: path.join(__dirname, '/dist'),
      publicPath: `http://localhost:${port}/`,  //  absolute path is a necessary workaround for css sourcemaps and background-images
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: '/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: path.join(__dirname, 'src'),
          loaders: ['babel'],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.d+)?$/,
          loader: 'file',
        },
        // {
        //   test: /\.(woff|woff2)$/,
        //   loader: 'url?prefix=font/&limit=5000',
        // },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff',
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader',
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'file?name=[name].[ext]',
        },
        {
          test: /(\.css|\.scss)$/,
          loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
  };
} else {
  config = {
    devtool: 'source-map',

    entry: [
      './src/index',
    ],

    target: 'web',
    output: {
      path: path.join(__dirname, 'production/client'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: path.join(__dirname, 'src'),
          loaders: ['babel'],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.d+)?$/,
          loader: 'file',
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff',
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader',
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'file?name=[name].[ext]',
        },
        {
          test: /(\.css|\.scss)$/,
          loaders: ['style', 'css', 'sass'],
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
  };
}

module.exports = config;
