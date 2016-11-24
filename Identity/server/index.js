'use strict';

var app = require('./app');
var db = require('./db');

var port = 8080;
var server = app.listen(port, function (err) {
  if (err) throw err;
  console.log('HTTP server listening on port', port);
  db.sync()
  .then(function () {
    console.log('postgres server is connected');
  });
});

module.exports = server;
