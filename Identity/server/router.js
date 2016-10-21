'use strict';
const Authentication = require('./controllers/authentication');
const User = require('./models/user');

module.exports = app => {
  app.get('/account', Authentication.authorize, (req, res) => {
    res.send(req.user);
  });
  app.put('/account/edit', Authentication.authorize, (req, res) => {
  	User.findByIdAndUpdate(req.user._id, req.body.user, { new: true }, (err, user) => {
  		res.status(err ? 400 : 200).send(err || user);
  	});
  });
  app.put('/account/edit/password', Authentication.editPassword);
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
