var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');

function comparePassword(attemptedPassword, hashedPassword) {
  return new Promise(function(resolve, reject){
    console.log('attemptedPassword', hashedPassword);
    bcrypt.compare(attemptedPassword, hashedPassword, function(err, res) {
      if(err) throw err
      else resolve(res)
    });
  });
}

function hashPassword(password) {
  var saltRounds = 4;
	return new Promise(function(resolve, reject){
    return bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) throw (err)
      else resolve(hash)
    });
  });
}

module.exports = {
	comparePassword: comparePassword,
	hashPassword: hashPassword
}


