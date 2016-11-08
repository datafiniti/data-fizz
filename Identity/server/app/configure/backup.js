'use strict';
module.exports = function (app, db) {

var path = require('path');

var rootPath = path.join(__dirname, '../../../');
var indexPath = path.join(rootPath, './server/app/index.html');


var appVar = function (app) {
    app.setValue('projectRoot', rootPath);
    app.setValue('indexHTMLPath', indexPath);
};


var express = require('express');

var staticVar = function (app) {

    var root = app.getValue('projectRoot');

    var npmPath = path.join(root, './node_modules');
    var publicPath = path.join(root, './public');
    var browserPath = path.join(root, './browser');

    app.use(express.static(npmPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));

};
    appVar(app);
    require('./static-middleware')(app);
    require('./parsing-middleware')(app);

};
