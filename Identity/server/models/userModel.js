var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var Util = require('../util.js');
var User = require('../schemas/User.js');


function changePassword(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var newPassword = req.body.newPassword;
  var confirmPassword = req.body.confirmPassword;

  //Database Lookup using email sent in request
  //If error will send a response to client notifying the failure
  User.findOne({ email: email }, function(err, user) {
  	if(err) res.json({ success: false, message: 'There are no users associated with the email submitted.'});
  	else if( newPassword != confirmPassword ) {
  		res.json({ success: false, message: 'Your new password and confirmed password do not match.' });
  	}
    //Compare the current password sent with the password stored in the database
    Util.comparePassword(password, user.password)
    .then(function(bool) { 
      if(bool) {
        //If successful, it will take the modified user object and hash the  new password then proceed to save to the db
        user.password = newPassword;
        Util.hashPassword(user)
        .then(function(hash) {
          user.password = hash;
      		user.save(function(err) {
      			if (err) {
              res.json({ success: false, message: 'There has been an error during the process of changing your password.' });
      				throw err;
      			}
      			else {
      				res.json({ success: true, message: 'You have successfully changed your password!' });
      			}
      		})
        })
      }
      else {
        res.json({ success: false, message: 'You have submitted the incorrect password for this user.' });
      }
    })
    .catch(function(err) {
      console.log(err);
    })
  })
}

function changeEmail(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var newEmail = req.body.newEmail;
  var confirmEmail = req.body.confirmEmail;

  if( newEmail != confirmEmail ) {
    res.json({ success: false, message: 'Your new email and confirmed email do not match.' });
  }
  else {
    User.findOne({ email: email }, function(err, user) {
      if(err) {
        res.json({ success: false, message: 'There are no users associated with the email submitted.'});
      }
      else {
        Util.comparePassword(password, user.password)
        .then(function(bool) {
          if(bool) {
            user.email = newEmail;
            user.save(function(err) {
              if (err) {
                res.json({ success: false, message: 'There has been an error during the process of changing your email.' });
                throw err;
              }
              else {
                res.json({ success: true, email: newEmail, message: 'You have successfully changed your email!' });
              }
            })
            .catch(function(err) {
              console.log(err);
            })
          }
          else {
            res.json({ success: false, message: 'You have submitted the incorrect password for this user.' });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    });
  }
}


module.exports = {
	changePassword: changePassword,
  changeEmail: changeEmail
}