var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var User = require('../schemas/User.js');

function comparePassword(attemptedPassword, hashedPassword) {
  return new Promise(function(resolve, reject){
    bcrypt.compare(attemptedPassword, hashedPassword, function(err, res) {
      if(err) throw err
      else resolve(res)
    });
  });
}

function hashPassword(user) {
  var saltRounds = 4;
  return new Promise(function(resolve, reject){
    return bcrypt.hash(user.password, saltRounds, function(err, hash) {
      if (err) throw (err)
      else resolve(hash)
    });
  });
}


function changePassword(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var newPassword = req.body.newPassword;
  var confirmPassword = req.body.confirmPassword;

  //Database Lookup using email sent in request
  //If error will send a response to client notifying the failure
  User.findOne({ email: email }, function(err, user){
  	if(err) res.json({ success: false, message: 'There are no users associated with the email submitted.'});
  	else if( newPassword != confirmPassword ) {
  		res.json({ success: false, message: 'Your new password and confirmed password do not match.' });
  	}
    //Compare the current password sent with the password stored in the database
    comparePassword(password, user.password)
    .then(function(bool) { 
      if(bool) {
        //If successful, it will take the modified user object and hash the  new password then proceed to save to the db
        user.password = newPassword;
        hashPassword(user)
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
        res.json({ success: false, message: 'You have submitted the incorrect password.' });
      }
    })
    .catch(function(err) {
      console.log(err);
    })
  })
}


module.exports = {
	changePassword: changePassword
}