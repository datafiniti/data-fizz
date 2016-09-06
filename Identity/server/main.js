'use strict';
require('babel-register');
var chalk = require('chalk');
var server = require('http').createServer();

// var app = require('./app');
var db = require('./db');

var createApplication = function () {
  var app = require('./app')(db);
  server.on('request', app);
};

var startServer = function () {
  var PORT = process.env.PORT || 8080;
  server.listen(PORT, function () {
      console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
  });
};

db.sync({force: false})
.then(createApplication)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});