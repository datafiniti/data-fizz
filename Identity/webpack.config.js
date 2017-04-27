const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
	app: path.join(__dirname, 'app'),
	dist: path.join(__dirname, 'dist'),
	test: path.join(__dirname, 'test')
};

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: path.join(PATHS.app, 'index.jsx')
	},

	output: {
		filename: '[name].js',
		publicPath: '/',
		path: path.join(PATHS.dist)
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			},

			{
				test: /\.(jsx|js)?$/,
				use: 'eslint-loader',
				enforce: 'pre',
				include: PATHS.app
			},

			{
				test: /\.json$/,
				use: 'json-loader'

			},

			{
				test: /\.sass$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},

			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
		]	
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json', '.sass', '.css'],
		alias: {
			styles: path.resolve('./app/static/styles'),
			images: path.resolve('./app/static/images'),
			auth: path.resolve('./app/components/auth'),
			shared: path.resolve('./app/components/shared'),
			users: path.resolve('./app/components/users'),
		}
	},

	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		stats: 'errors-only',
		host: 'localhost',
		port: 3000,
		proxy: {
			'*': "http://localhost:8000"
		}
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),

		new webpack.HotModuleReplacementPlugin()
	]
};

