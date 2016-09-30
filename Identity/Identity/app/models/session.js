var db = require('../db');
var uuid = require('node-uuid');


var Session = module.exports

Session.create = function (userId) {

  var newSession = { id: uuid(), user_id: userId }

  return db('sessions').insert(newSession)
    .then(function () {
      return newSession
    })
  }

Session.findById = function (sessionId) {

  return db('sessions').where({ id: sessionId })
    .then(function (rows) {
      return rows[0]
    })
  }

Session.destroy = function (sessionId) {
  return db('sessions').where({ id: sessionId }).del()
}
