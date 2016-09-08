var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var Util = require('../util.js');
var User = require('../schemas/User.js');
var serverConfig = require('../server-config.js');


function createResetSession(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) throw err;
    else {
      //Create jwt token
    var token = jwt.sign(user, serverConfig.resetSecret, { expiresIn: '5m' }).catch(function(err) {
    res.json({ success: false, message: "There has been an error in the process of creating a reset token."})
    });
      //Initialize nodemailer object and mailOptions
      var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'datafizznotifications@gmail.com',
            pass: 'identity'
        }
      };
      var mailOptions = {
        from:'"DataFizz" <datafizznotifications@gmail.com>',
        to: user.email,
        subject: 'DataFizz Sign In Notification',
        text: 'You have requested for a reset token to be sent to you. I apologize for it being exruciatingly long. Your token is: ' + token +' . Please copy and paste into the field reset token field. This token expires in 5 minutes.'
      };
      var transport = nodemailer.createTransport(smtpConfig);
      transport.sendMail(mailOptions, function(err, info) {
        if (err) console.log(error);
        console.log('Message sent: ' + info.response);
        res.json({ success: true, message: 'Email has been successfuly sent.'});
      });
    }
  })
  .catch(function(err) {
    res.json({ success: false, message: 'There is no user associated with this email.'});
  });
}


function resetPassword(req, res) {
  var email = req.body.email;
  var token = req.body.token;
  var newPassword = req.body.newPassword;
  var confirmPassword = req.body.confirmPassword;

  if (email && token && newPassword === confirmPassword) {
    jwt.verify(token, serverConfig.resetSecret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } 
      else {
        User.findOne({ email: email }, function(err, user) {
          Util.hashPassword(user)
          .then(function(hashedPassword) {
            user.password = hashedPassword;
            user.save(function(err) {
              if(err) throw err
              else res.json({ success: true, message: 'You have successfully reset your password! You can now sign in!'})
            });
          })
          .catch(function(err) {
            console.log(err);
            res.json({ success: false, message: 'There is no user associated with this email.'})
          })
        });
      }
    });
  } 
}

module.exports = {
  password: resetPassword,
  create: createResetSession
}