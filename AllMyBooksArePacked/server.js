'use strict';

var StaticServer = require('static-server');


const server = new StaticServer({
  rootPath: './data/',
  name: 'amazon-books',
  port: 8080,
});

server.start( () => {
  console.log('Server running in: ', server.port);
});
