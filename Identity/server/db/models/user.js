'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {
  return db.define('user', {
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      isAdmin : {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }

  }, {
      instanceMethods: {
        sanitize: function () {
            return _.omit(this.toJSON(), ['password', 'salt']);
        },
        correctPassword: function (candidatePassword) {
            return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
        },
        takeoutPassword: function () {
            this.password = "";
            return this
        }
      },
      classMethods: {
        generateSalt: function () {
            return crypto.randomBytes(16).toString('base64');
        },
        encryptPassword: function (plainText, salt) {
            var hash = crypto.createHash('sha1');
            hash.update(plainText);
            hash.update(salt);
            return hash.digest('hex');
        }
      },
      hooks: {
        beforeCreate: function (user) {
          user.salt = user.Model.generateSalt();
          user.password = user.Model.encryptPassword(user.password, user.salt);
        },
        beforeUpdate: function (user) {
          if (user.changed('password')) {
            user.salt = user.Model.generateSalt();
            user.password = user.Model.encryptPassword(user.password, user.salt);
          }
        }
      }
  });
};