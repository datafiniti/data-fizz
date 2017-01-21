// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const logger = require('morgan')
// instantiatize express
const app = express();

// Express settings
const router  = express.Router();

//model controllers
const bookController = require('./controllers/bookController');
const boxController = require('./controllers/boxController');

// Mongoose mpromise deprecated - use bluebird for promises
const Promise = require("bluebird");

mongoose.Promise = Promise;

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// what to send based on route
app.use('/', bookController);
app.use('/boxes', boxController);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/boxPacker");
// log all queries that mongoose fires in the application
// mongoose.set('debug', true);
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
  // used to drop the database every time a save is done while using nodemon
  // db.dropDatabase();
});

const port = process.env.PORT || 3000;

// listen on port 3000 when local
app.listen(port, function(){
	console.log(`Listening on port: ${port}`);
})
