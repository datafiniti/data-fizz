var path = require('path')
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var mongoose = require('mongoose');

//Config
var app = express();
var serverConfig = require('./server-config.js');
var webpackConfig = require('../webpack.config.js');
var compiler = webpack(webpackConfig);

// Start DB connection
mongoose.connect(serverConfig.database);

//Body Parser and Webpack Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
	publicPath: '/dist'
}));
app.use(webpackHotMiddleware(compiler));

//Index Route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//Set Express to start listening to requests
app.listen(3000, () => console.log('listening on 3000'));