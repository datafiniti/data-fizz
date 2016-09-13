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


/************************ Helpers *******************************/

function removeSession(email, token) {
  User.findOne({ email: email }, function(err, user) {
    if(err) throw err;
    else {
      console.log('user', user);
      user.sessions.splice(user.sessions.indexOf(token), 1);
      user.save(function(err) {
        if(err) console.log(err);
      });
    }
  })
}


function removeExpiredSessions(email) {
  User.findOne({ email: email }, function(err, user) {
    user.sessions = user.sessions.filter(function(session, index) {
      jwt.verify(session, serverConfig.apiSecret, function(err, decoded) {
        if(err) return false;
        else return true;
      })
    });

    user.save(function(err) {
      if (err) console.log(err);
    });
  });
}


function createAPISession(user, res) {
  //Initialize nodemailer object and mailOptions
  var mailOptions = {
    from:'"Frankie Vithayathil" <frankievx@gmail.com>',
    to: user.email,
    subject: 'DataFizz Sign In Notification',
    text: 'We would like to inform you that you have just been signed into more than one location. If you have not signed into this app from more than one location then you may have unauthorized use of your account and we recommend that you change you password.'
  };
  var transport = nodemailer.createTransport(smtpConfig);

  //Create jwt token
  jwt.sign({email: user.email}, serverConfig.apiSecret, { expiresIn: '10m' }, function(err, token) {
    if(err) {
      console.log(err);
      res.json({ success: false, message: "There has been an error in the process of creating a session token."})
    }
    else {
      //On login check for any expired sessions and then remove them, then add a new session
      removeExpiredSessions(user.email);
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
  });
}



/************************ API *******************************/

function verifySession(req, res, next) {
  var email = req.headers['x-access-email'];
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (email && token) {
    jwt.verify(token, serverConfig.apiSecret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } 
      else {
        console.log('move to dashboard');
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

function login(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'No User with that email' });
    } 
    else if (user) {
      Util.comparePassword(req.body.password, user.password)
      .then(function(bool){
        if (!bool) {
          res.json({ success: false, message: 'Incorrect Password.' });
        } 
        else {
          createAPISession(user, res);
        }   
      })
      .catch(function(err) {
        console.log(err);
        res.json({ success: false, message: 'There has been an error in the process of logging in.'});
      })
    }
  });
};

function logout(req, res) {
  var email = req.headers['x-access-email'];
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  removeSession(email, token);
  res.json({ success: true, message: "You have been signed out." });
};


module.exports = {
  login: login,
  verify: verifySession,
  logout: logout
}