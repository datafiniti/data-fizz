var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');


function removeSessions(email, token) {
  User.findOne({ email: email }, function(err, user) {
    user.sessions = user.sessions.filter(function(session, index) {
      return session !== token;
    })

    user.invalidSessions.push(token);
    user.save(function(err) {
      if (err) console.log(err);
    });
  })
}

function removeInvalidSessions(email) {
  User.findOne({ email: email }, function(err, user) {
    //Remove any sessions that have now expired from the blacklist
    user.invalidSessions.map(function(session, index) {
      jwt.verify(session, serverConfig.apiSecret, function(err, decoded) {
        if(err) {
          user.invalidSessions.splice(index, 1);
        }
      });
    });
    //Save the new user object
    user.save(function(err) {
      if (err) throw err;
    })
  })
}

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
  removeSessions: removeSessions,
  removeInvalidSessions: removeInvalidSessions,
	comparePassword: comparePassword,
	hashPassword: hashPassword
}


