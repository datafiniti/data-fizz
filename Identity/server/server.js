const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express() 
const router = require('./router');
const mongoose = require('mongoose');

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth')// create a file called auth in our db

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);



//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listenning on: ', port);

