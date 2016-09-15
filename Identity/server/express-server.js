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

//Routes and Models
var signup = require('./models/userModel.js');
var session = require('./models/sessionModel.js');
var apiRoutes = require('./routes/apiRoutes.js');
var resetRoutes = require('./routes/resetRoutes.js');


// Start DB connection
mongoose.connect(serverConfig.database);

//Body Parser and Webpack Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(process.env.NODE_ENV != "production") {
	app.use(webpackDevMiddleware(compiler, {
		publicPath: '/dist'
	}));
	app.use(webpackHotMiddleware(compiler));
}

//Static Route
app.use('/dist', express.static('dist'));

//Index Route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
});
app.post('/signin', session.login);
app.post('/signup', signup.createUser);
app.use('/reset', resetRoutes);
app.use('/api', apiRoutes);



app.get('*', function(req, res) {
	res.redirect('/');
})

//Set Express to start listening to requests
app.listen(8081, () => console.log('listening on 8081'));