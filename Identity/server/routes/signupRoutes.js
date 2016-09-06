var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var User = require('../schemas/User.js');
var serverConfig = require('../server-config.js')


var app = express();
var signupRoutes = express.Router();
var saltRounds = 10;

app.set('secret', serverConfig.secret);

function hashPassword(user) {
	return new Promise(function(resolve, reject){
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      if (err) reject(err)
      else resolve(hash)
    });
  });
}

function checkEmail(email) {
	User.findOne({ email: email }, function(err, user) {
		if (err) throw err;
		if(user) {
			return true;
		}
	})
}

function signup(req, res) {
  var user = new User({ 
    email: req.body.email, 
    password: req.body.password
  });

  if(checkEmail(req.body.email)) {
  	return res.json({ success: false, message: "This email is already associated with a user."})
  }

  hashPassword(req.body)
  	.then(function(hash) {
      user.password = hash;
    })
    .catch(function(err) {
    	throw err;
    });


  user.save(function(err) {
    if (err) throw err;
    res.json({ success: true });
  });
});
