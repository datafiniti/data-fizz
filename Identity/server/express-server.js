var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var mongoose = require('mongoose');

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