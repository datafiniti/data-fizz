var db = require('../db');


var Click = module.exports

Click.create = function (link_id) {
  return db('clicks').insert({ link_id: link_id })
    .then(function() {
      return db('links')
        .where({ id: link_id })
        .increment('visits', 1)
    });
}
