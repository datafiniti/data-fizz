var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var User = require('../schemas/User.js');
var serverConfig = require('../server-config.js')


function comparePassword(attemptedPassword, hashedPassword) {
  return new Promise(function(resolve, reject){
    bcrypt.compare(attemptedPassword, hashedPassword, function(err, res) {
      if(err) throw err
      else resolve(res)
    });
  });
}

function checkInvalidSessions(email, token) {
  var found = false;
  User.findOne({ email: email }, function(err, user) {
    if(err) console.log(err)
    // Set found to be returned either true or false
    else {
      if (user.invalidSessions.includes(token)) found = true;
    }
  })
  return found;
}

function removeInvalidSessions(email) {
  User.findOne({ email: email }, function(err, user) {
    //Remove any sessions that have now expired from the blacklist
    user.invalidSessions.map(function(session, index) {
      jwt.verify(session, serverConfig.secret, function(err, decoded) {
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

function createSession(user, res) {
  //Create jwt token
  var token = jwt.sign(user, serverConfig.secret, { expiresIn: '1 day' });
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
    from:'"Frankie Vithayathil" <frankievx@gmail.com>',
    to: user.email,
    subject: 'DataFizz Sign In Notification',
    text: 'We would like to inform you that you have just been signed into more than one location. If you have not signed into this app from more than one location then you may have unauthorized use of your account and we recommend that you change you password.'
  };
  var transport = nodemailer.createTransport(smtpConfig);

  //Add new session.
  user.sessions.push(token);

  // If there is more than one session then send an email
  if(user.sessions.length > 1) {
    transport.sendMail(mailOptions, function(err, info) {
      if (err) console.log(error);
      console.log('Message sent: ' + info.response);
    })
  }

  //Save user and send success response to the client
  user.save(function(err) {
    if (err) console.log(err);
    res.json({ success: true, email: user.email, token: token, message: "You are now logged in." });
  });
}

function removeSessions(email, token) {
  User.findOne({ email: email }, function(err, user) {
    user.sessions = user.sessions.filter(function(session, index) {
      console.log(session)
      return session !== token;
    })
    user.invalidSessions.push(token);
    user.save(function(err) {
      if (err) console.log(err);
    });
  })
}

function login(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
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
          createSession(user, res);
        }   
      })
      .catch(function(err) {
        console.log(err);
      })
    }
  });
}

function verify(req, res, next) {
  var email = req.headers['x-access-email'];
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('email', email, 'token', token);
  if (email && token) {
    jwt.verify(token, serverConfig.secret, function(err, decoded) {      
      if (err || checkInvalidSessions(email, token)) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } 
      else {
        req.decoded = decoded;
        next();
      }
    });
  } 
  else {
    return res.send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
};

function logout(req, res) {
  var email = req.headers['x-access-email'];
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  removeSessions(email, token);
  removeInvalidSessions(email);
  res.json({ success: true, message: "You have been signed out." });
}


module.exports = {
  login: login,
  verify: verify,
  logout: logout
}