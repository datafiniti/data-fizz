var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../schemas/User.js');
var serverConfig = require('../server-config.js')

var saltRounds = 10;

function comparePassword(attemptedPassword, hashedPassword) {
  return new Promise(function(resolve, reject){
    bcrypt.compare(attemptedPassword, hashedPassword, function(err, res) {
      console.log('comparePassword', res);
      if(err) reject(err)
      else resolve(res)
    });
  });
}

function login(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
  	console.log(user);
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'No User with that email' });
    } 
    else if (user) {
      comparePassword(req.body.password, user.password)
      .then(function(bool){
        if (!bool) {
          res.json({ success: false, message: 'Incorrect Password.' });
        } 
        else {
          var token = jwt.sign(user, serverConfig.secret, { expiresIn: '1 day' });
          res.json({ success: true, token: token, message: "You are now logged in."});
        }   
      });
    }
  });
}

function verify(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, serverConfig.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } 
      else {
        req.decoded = decoded;    
        next();
      }
    });
  } 
  else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
};


module.exports = {
  login: login,
  verify: verify
}