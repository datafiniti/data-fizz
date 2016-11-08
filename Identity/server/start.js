'use strict';
var chalk = require('chalk');
var db = require('./db');

var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app')(db);
    server.on('request', app); 
};

var startServer = function () {

    var PORT = 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

db.sync().then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
