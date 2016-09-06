'use strict'
let path = require('path');
let crypto = require('crypto');

module.exports = function(app, db) {

  let Session = db.model('session');
  let User = db.model('user');

  function getSession(req) {
    let cookie = req.headers.cookie.split(' ');
    let sid = salty(cookie[0].split('=')[1], "tempsalt");
    return Session.findOrCreate({where:{ sid:sid }})
  }

  let setSession = function(req, res, next) {
    return getSession(req)
    .then(function(session) {
      let sessionObj = {
        id: session[0].sid,
        expires: session[0].expires,
        userId: session[0].userId
      }
      req.session = sessionObj;
      next();
    })
    .catch(next);
  }

  app.use(setSession)

  function salty(sid, secret) {
    let hash = crypto.createHash('sha1');
    hash.update(sid);
    hash.update(secret);
    return hash.digest('hex');
  }

  function sessionLogout(req) {
    let cookie = req.headers.cookie.split(' ');
    let sid = salty(cookie[0].split('=')[1], "tempsalt")
    return Session.destroy({where:{sid: sid}})
  }

  app.get('/logout', function(req, res, next) {
    return sessionLogout(req)
    .then(()=> {
      res.status(200).end();
    })
  });

  require(path.join(__dirname, 'local'))(app, db);
  require(path.join(__dirname, 'multiplelogins'))(app, db);

  db.sync();
}
