'use strict';
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

module.exports = function (db) {
// module.exports = function () {

    // Pass our express application pipeline into the configuration
    // function located at server/app/configure/index.js
    require('./configure')(app, db);

    // Routes that will be accessed via AJAX should be prepended with
    // /api so they are isolated from our GET /* wildcard.
    var rootPath = path.join(__dirname, '../../');
    var browserPath = path.join(rootPath, './app');
    var publicPath = path.join(rootPath, './public');
    var npmPath = path.join(rootPath, './node_modules');
    var indexHTMLPath = path.join(rootPath, './server/views/index.html');

    app.use(express.static(npmPath));
    app.use(express.static(publicPath));

    app.use('/api', require('./routes'));

    // console.log("did I get to here?")
    app.get('/*', function (req, res) {
      res.sendFile(indexHTMLPath);
    });

    /*
     This middleware will catch any URLs resembling a file extension
     for example: .js, .html, .css
     This allows for proper 404s instead of the wildcard '/*' catching
     URLs that bypass express.static because the given file does not exist.
     */
    app.use(function (req, res, next) {

        if (path.extname(req.path).length > 0) {
            res.status(404).end();
        } else {
            next(null);
        }

    });


    // Error catching endware.
    app.use(function (err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });

    return app;
};