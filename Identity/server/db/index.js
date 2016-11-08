'use strict';

var Sequelize = require('sequelize');
var crypto = require('crypto');
var _ = require('lodash');


var db = new Sequelize('postgres://localhost:5432/datafiniti_test', {
  logging: false
});

var users = function(db){
    var userTable = db.define('user', {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING(1234)
        },
        encryptedPassword: {
            type: Sequelize.STRING(1234)
        }
    }, {
        instanceMethods:{
            checkPassword: function(password){
                return this.Model.encryptPassword(password, this.salt)===this.encryptedPassword;                   
            }
        },
        classMethods:{
            generateSalt: function(){
                return crypto.randomBytes(64).toString('base64');
            },
            encryptPassword: function(password, salt){
                var hash = crypto.createHash('sha256');
                hash.update(password+salt);
                return hash.digest('hex');
            }
        },
        hooks: {
            beforeCreate: function(user){
                    user.salt = user.Model.generateSalt();
                    user.encryptedPassword = user.Model.encryptPassword(user.password, user.salt);                                          
            },
            afterUpdate: function(user){
                if(user.changed("password")){
                    var salt = user.Model.generateSalt();
                    var encrypt = user.Model.encryptPassword(user.password, salt);   
                    user.update({
                        salt: salt,
                        encryptedPassword: encrypt
                    }).then(function() {
                        console.log('password updated')
                    });     
                }                                               
            }
        }
    });
};
var sessions = function(db){
    var sessionTable = db.define('session', {
        deviceType: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    },{
        classMethods: {
            createToken: function(){
                return crypto.randomBytes(48).toString('hex');
            }
        },
        hooks: {
            beforeCreate: function(session){
                session.token = session.Model.createToken();
            }
        }
    });
};

var Users = users(db);
var Sessions = sessions(db);

module.exports = db;


