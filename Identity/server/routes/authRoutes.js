var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/User.js');
var serverConfig = require('../server-config.js')


var app = express();
var authRoutes = express.Router();

app.set('secret', serverConfig.secret);

var authenticate = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
  	console.log(user);
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'No User with that email' });
    } 
    else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Incorrect Password.' });
      } 
      else {
        var token = jwt.sign(user, app.get('secret'), { expiresIn: '1 day' });
        res.json({ success: true, token: token });
      }   
    }
  });
}

authRoutes.post('/authenticate', authenticate);