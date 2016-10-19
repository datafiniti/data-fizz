'use strict';
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.Promise = require('bluebird');

// MongoDB setup
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/auth'; // or whatever name of database
mongoose.connect(mongoUrl, err => {
	console.log(err || `MongooseDB connected to ${mongoUrl}`);
});

// App setup
app.use(morgan('dev'));
app.use(cors()); // allow cors (requests from different domains)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router(app);

// Server setup
const PORT = process.env.PORT || 3080;
const server = http.createServer(app);
server.listen(PORT, err => {
	console.log(err || `Server listening on PORT ${PORT}`)
});
