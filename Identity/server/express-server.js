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
var signup = require('./models/signupModel.js');
var authenticate = require('./models/authModel.js');
var authRoutes = require('./routes/authRoutes.js');

// Start DB connection
mongoose.connect(serverConfig.database);

//Body Parser and Webpack Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
	publicPath: '/dist'
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, '..', 'dist')));



//Index Route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.post('/signin', authenticate.login);
app.post('/signup', signup.create);
app.use('/auth', authRoutes);
app.get('*', function(req, res) {
	res.redirect('/');
})

//Set Express to start listening to requests
app.listen(3000, () => console.log('listening on 3000'));