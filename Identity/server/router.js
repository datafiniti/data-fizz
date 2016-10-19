'use strict';
const Authentication = require('./controllers/authentication');

module.exports = app => {
  app.get('/', Authentication.authorize, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/signup', Authentication.signup);
  app.post('/signin', Authentication.signin);
  app.post('/feature', Authentication.authorize);
}
