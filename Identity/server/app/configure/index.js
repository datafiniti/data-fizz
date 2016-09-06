'use strict';
module.exports = function (app, db) {

    require('./static-middleware')(app);
    require('./parsing-middleware')(app);
    require('./authentication')(app, db);

};