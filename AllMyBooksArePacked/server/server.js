//We need to create a server to host our html files, otherwise Chrome won't
//allow us to access them due to security reasons

var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./");

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

console.log('Listening on port 8000')
server.listen(8000);