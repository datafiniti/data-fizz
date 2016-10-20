'use strict';
const Authentication = require('./controllers/authentication');
const User = require('./models/user');

module.exports = app => {
  app.get('/profile', Authentication.authorize, (req, res) => {
    res.send(req.user);
  });
  app.post('/signup', Authentication.signup);
  app.post('/signin', Authentication.signin);
  app.post('/signout', Authentication.signout);
  /* potential for admin route if JWT specifies isAdmin boolean in payload */
  // app.get('/', Authentication.authorize, (req, res) => {
  //   User.find({}, (err, users) => {
  //     res.send(users);
  //   });
  // });
}
