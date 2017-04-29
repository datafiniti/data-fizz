const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackStrip = require('strip-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist'),
};


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: path.join(PATHS.app, 'index.jsx'),
    },

    output: {
        filename: '[name]-[hash:8].js',
        chunkFilename: '[name]-[chunkhash:8].js',
        publicPath: '/',
        path: path.join(PATHS.dist),
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: WebpackStrip.loader('debug', 'console.log'),
            }, 

            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', {
                                modules: false,
                            }],

                            'react',
                        ],

                        plugins: [
                            'transform-class-properties',
                            'transform-decorators-legacy',
                            'syntax-dynamic-import',
                        ],
                    },
                },
            },

            {
                test: /\.json$/,
                use: 'json-loader',
            },

            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                }),
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
            'react': 'preact-compat',
            'react-dom': 'preact-compat',
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),

        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: 2,
            async: true,
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }), 

        new ExtractTextPlugin('style-[contenthash:8].css'),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async',
        }),

        new PreloadWebpackPlugin({
            rel: 'prefetch',
        }),

         new UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                conditionals: true,
                unused: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },

            output: {
                comments: false,
            },

            minimize: true,
        }), 

        new SWPrecacheWebpackPlugin({
            cacheId: 'Identity-App',
            filename: 'sw.js',
            maximumFileSizeToCacheInBytes: 800000,
            mergeStaticsConfig: true,
            minify: true,
            runtimeCaching: [
                {
                    handler: 'cacheFirst',
                    urlPattern: /(.*?)/,
                },
            ],
        }),

        new HtmlWebpackPlugin({
            template: './app/static/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        //new webpack.optimize.AggressiveMergingPlugin(),
    ],
}