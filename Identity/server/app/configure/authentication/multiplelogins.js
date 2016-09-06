'use strict';

module.exports = function(app, db) {

  let nodemailer = require('nodemailer');
  let path = require('path');

  let Session = db.model('session');
  let User = db.model('user');

  let env = require(path.join(__dirname, '../../../env/development.js'));

  app.get('/checkIfSession', function(req, res, next) {
    let userId = req.session.userId
    return Session.findAll({where:{userId:req.session.userId}})
    .then(function(sessions) {
      if (sessions.length > 1) handleEmail(req, res, userId);
      else res.status(200).send();
    });
  });

  function handleEmail(req, res, userId) {
    let transporter = nodemailer.createTransport("SMTP",{
      service: 'Gmail',
      auth: {
        user: 'data.finiti.identity@gmail.com',
        pass: env.EMAIL_PASS
      }
    });
    return User.findOne({where:{id: userId}})
    .then(function(user) {
      let mailOptions = {
        from: 'data.finiti.identity',
        to: user.email,
        subject: 'Already Signed In!',
        html: '<h1>You are already signed in!</h1> <div>You are signed in on more than one device!<div>'
      };
      return mailOptions
    })
    .then(function(mailOptions) {
      transporter.sendMail(mailOptions, function(error, info){
        if(error) res.status(404).json(error);
        else res.json(info);
      });
    })
  }
}
