'use strict';
const Authentication = require('./controllers/authentication');

module.exports = app => {
  app.post('/signup', Authentication.signup);
  app.post('/login', Authentication.login);
  app.post('/feature', Authentication.authorize);
}
