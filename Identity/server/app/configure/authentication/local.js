module.exports = function(app, db) {
  var User = db.model('user');
  var Session = db.model('session');
  var crypto = require('crypto');

  function checkCreds(credentials) {
    return User.findOne({where: {email: credentials.email}})
    .then(function(user) {
      if (!user || !user.correctPassword(credentials.password)) return null;
      else return user.sanitize();
    })
  }

  function setUserSession(req, user) {
    return Session.findOne({where:{ sid:req.session.id}})
    .then(function(session) {
      req.session.userId = user.id;
      return session.update({userId: user.id});
    })
  }

  app.post('/login', function(req, res, next) {
    checkCreds(req.body)
    .then(function(user) {
      if (user) {
        setUserSession(req, user)
        .then(()=> {
          res.json(user);
        })
      }
      else res.status(404).send();
    })
  });

  function checkExistingEmail(req, res, next) {
    User.findOne({where:{email:req.body.email}})
    .then(function(user) {
      if (!user) {
        next();
      } else {
        res.status(403).json('Email already in use!').end()
      }
    })
  }

  app.use('/signup', checkExistingEmail);

  app.post('/signup', function(req, res, next) {
    User.create(req.body)
    .then(function(newUser) {
      if (newUser) {
        newUser.sanitize();
        setUserSession(req, newUser)
        .then(()=> {
          res.json(newUser);
        })
      } else res.status(500).send();
    })
    .catch(next);
  });

}
