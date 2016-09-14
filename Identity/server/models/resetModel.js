var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var Util = require('./helpers/util.js');
var User = require('../schemas/User.js');
var serverConfig = require('../server-config.js');

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: 'datafizznotifications@gmail.com',
      pass: 'identity'
  }
};


/************************ API *******************************/


function createResetSession(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) throw err;
    else {

    //Create jwt token
    var token = jwt.sign({ email: user.email }, serverConfig.resetSecret, { expiresIn: '5m' })

      // Set Up Nodemailer then send email
      var mailOptions = {
        from:'"DataFizz" <datafizznotifications@gmail.com>',
        to: user.email,
        subject: 'DataFizz Sign In Notification',
        text: 'You have requested for a reset token to be sent to you. Your token is: ' + token +' . Please copy and paste the token into the reset token field. This token expires in 5 minutes.'
      };
      var transport = nodemailer.createTransport(smtpConfig);
      transport.sendMail(mailOptions, function(err, info) {
        if (err) console.log(error);
        console.log('Message sent: ' + info.response);
        res.json({ success: true, message: 'Email has been successfuly sent. The token will expire in 5 minutes.'});
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

  // Check if passwords match and then verify the reset session token
  if (newPassword === confirmPassword) {
    jwt.verify(token, serverConfig.resetSecret, function(err, decoded) {   

      //Handle verification error   
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } 

      //Else lookup user, hash the password, then save the new user object.
      else {
        User.findOne({ email: email }, function(err, user) {
          Util.hashPassword(newPassword)
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