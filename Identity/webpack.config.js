const path = require('path');
const webpack = require('webpack');

const PATHS = {
	app: path.join(__dirname, 'app'),
	dist: path.join(__dirname, 'dist'),
	test: path.join(__dirname, 'test')
};

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		app: PATHS.app
	},

	output: {
		filename: '[name].chunk.js',
		publicPath: '/',
		path: path.join(PATHS.dist)
	},

	modules: {
		rules: [
			{
				test: /\.(jsx|js)?$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'test'),
				use: 'babel-loader'
			},

			{
				test: /\.json$/,
				use: 'json-loader'

			}
		]	
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json']
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

