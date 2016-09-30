var db = require('../db');

var util = require('../../lib/utility');
var crypto = require('crypto');


var Link = module.exports

Link.all = function () {
  return db('links').select('*')
}

Link.create = function (incomingAttrs) {
  var attrs = Object.assign({}, incomingAttrs)

  var titlePromise = attrs.title
    ? Promise.resolve(attrs.title)
    : util.getUrlTitle(attrs.url)

  return titlePromise
    .then(function (title) {

      attrs.title = title
      attrs.visits = 0

      // Create shortlink token
      var shasum = crypto.createHash('sha1');
      shasum.update( attrs.url );
      attrs.code = shasum.digest('hex').slice(0, 5);

      return db('links').insert(attrs)
    })
    .then(function (results) {
      attrs.id = results[0]
      return attrs
    })
}

Link.findByUrl = function (url) {
  return db('links').where({ url: url }).limit(1)
    .then(function (rows) {
      return rows[0]
    })
}

Link.findByCode = function (code) {
  return db('links').where({ code: code }).limit(1)
    .then(function (rows) {
      return rows[0]
    })
}
