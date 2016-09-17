// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express() // create an instance of express
const router = require('./router');


// App Setup
app.use(bodyParser.json({type:'*/*'}));
router(app);



//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listenning on: ', port);

