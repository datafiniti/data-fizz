'use strict';
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const PORT = process.env.PORT || 3080;
const app = express();

// MongoDB setup
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/auth'; // or whatever name of database
mongoose.connect(mongoUrl, err => {
	console.log(err || `MongooseDB connected to ${mongoUrl}`);
});

// App setup
app.use(cors()); // allow cors (requests from different domains)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router(app);

// Server setup
// const server = http.createServer(app);
app.listen(PORT, err => {
	console.log(err || `Server listening on PORT ${PORT}`)
});
