'use strict';
const Authentication = require('./controllers/authentication');
const User = require('./models/user');

module.exports = app => {
  app.get('/account', Authentication.authorize, (req, res) => {
    res.send(req.user);
  });
  app.put('/account/edit', Authentication.authorize, (req, res) => {
  	User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
  		res.status(err ? 400 : 200).send(err || user);
  	});
  });
  app.put('/account/edit/password', Authentication.editPassword);
  app.post('/account/request/password/reset', Authentication.requestPasswordReset);
  app.post('/signup', Authentication.signup);
  app.post('/signin', Authentication.signin);
  app.post('/signout', Authentication.signout);
  /* ---                          NOTE for scaling                                  --- */
  /* --- Below is a potential admin route, requiring tweaking the authorize         --- */
  /* --- middleware to take an add'tl optional parameter of level of authorization  --- */
  /* --- required and DB storage of isAdmin boolean and JWT specifying in payload   --- */
  // app.get('/', Authentication.authorize({ isAdmin: true }), (req, res) => {
  //   User.find({}, (err, users) => {
  //     res.send(users);
  //   });
  // });
}
