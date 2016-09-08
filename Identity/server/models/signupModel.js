var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var Util = require('../util.js');
var User = require('../schemas/User.js');


function checkEmail(email) { 
  return new Promise(function(resolve, reject){
    return User.find({ email: email }, function(err, user) {
      if (err) throw (err);
      if (user.length > 0 ) resolve(true);
      else resolve(false);
    });
  });
}

function create(req, res) {
  var emailFound;
  var user = new User({ 
    email: req.body.email, 
    password: req.body.password
  });
  // Check for identical emails to prevent duplicates.
  checkEmail(req.body.email)
  //Set emailFound
  .then(function(bool) {
    emailFound = bool;
  })
  .catch(function(err) {
    console.log(err);
  })
  // If found then send appropriate response.
  // Otherwise hash the password and save to the database.
  .then(function(){
    if(emailFound) res.json({ success: false, message: "This email is associated with another user"});
    else {
      Util.hashPassword(req.body)
    	.then(function(hash) {
        user.password = hash;
      })
      .then(function(err) {
        user.save(function(err) {
          if (err) throw err;
          res.json({ success: true, message: "You have successfuly signed up! Now you can go ahead and sign in." });
        });
      })
      .catch(function(err) {
        console.log(err);
        res.json({ success: false, message: "An error has occurred in the process of signing up." });
      })
    }
  })
};

module.exports = {
  create: create
}