'use strict';
var Sequelize = require('sequelize');

module.exports = function (db) {
  return db.define('reset', {
    authcode: {
      type: Sequelize.STRING
    }
  },
  {

  });
}