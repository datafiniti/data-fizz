'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var User = require('../api/users/user.model.js');


app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use(session({
	secret: 'shunTheBandersnatch',
}));

app.use(require('./statics.middleware'));


app.use(function(req, res, next){
  console.log('user: ', req.session);
  next();
})

app.post('/login', function (req, res, next) {
  User.findOne({
    where: {
      email: req.body.email,
    }
  })
  .then(function (user) {
    if (!user || !user.correctPassword(req.body.password)) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.send(200)
    }
  })
  .catch(next);
});

app.post('/signup', function (req, res, next) {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  })
  .then(function (user) {
      req.session.userId = user.id;
      res.send(200)
  })
  .catch(next);
});

app.delete('/logout', function(req, res, next){
  delete req.session.userId
  res.sendStatus(204)
});

app.get('/me', function(req, res, next){
  res.json(req.user)
})

// app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
