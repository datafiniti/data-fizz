'use strict';
var crypto = require('crypto');
var Sequelize = require('sequelize');

module.exports = function (db) {
  return db.define('session', {
    sid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    expires: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.STRING
    }
  },
  {
      instanceMethods: {
        salty: function (sid, secret) {
          var hash = crypto.createHash('sha1');
          hash.update(sid);
          hash.update(secret);
          return hash.digest('hex');
        }
      },
      classMethods: {
        saltysid: function (sid, secret) {
          var hash = crypto.createHash('sha1');
          hash.update(sid);
          hash.update(secret);
          return hash.digest('hex');
        }
      }
  });
}
