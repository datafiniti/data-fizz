const Authentication = require('./controllers/authentication');



module.exports = function (app){

  app.post('/login', Authentication.login);
  app.post('/logout', Authentication.logout);
  app.post('/signup', Authentication.signup);
  app.put('/resetPwd', Authentication.resetPwd);
  app.put('/changePwd', Authentication.changePwd);


}