'use strict';
var path = require('path');
var express = require('express');
var app = express();

module.exports = function (db) {

    require('./configure')(app, db);
    app.use('/api', require('./routes'));

    app.use(function (req, res, next) {
        if (path.extname(req.path).length > 0) {
            res.status(404).end();
        } else {
            next(null);
        }
    });

    app.get('/*', function (req, res) {
        res.sendFile(app.get('indexHTMLPath'));
    });

    // Error catching endware.
    app.use(function (err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });

    return app;

};

