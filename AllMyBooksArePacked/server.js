// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');

// instantiatize express
const app = express();

// Express settings
const router  = express.Router();

//model controllers
const dataController = require('./controllers/dataController');

// Mongoose mpromise deprecated - use bluebird for promises
const Promise = require("bluebird");

mongoose.Promise = Promise;

// what to send based on route
app.use('/', dataController);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/boxPacker");
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
  db.dropDatabase();
});


const port = process.env.PORT || 3000;

// listen on port 3000 when local
app.listen(port, function(){
	console.log(`Listening on port: ${port}`);
})

// our module get's exported as app.
module.exports = app;