var util = require('./lib/utility');
var partials = require('express-partials');

var db      = require('./app/db');
var User    = require('./app/models/user');
var Link    = require('./app/models/link');
var Click   = require('./app/models/click');
var Session = require('./app/models/session');

var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var express = require('express');


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());

app.use( bodyParser.json() ); 
app.use( cookieParser() );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.get('/', getSignedInUser, function(req, res) {
  res.render('index');
});

app.get('/create', getSignedInUser, function(req, res) {
  res.render('index');
});

app.get('/links', getSignedInUser, function(req, res) {
  Link.all()
    .then(function(links) {
      res.send(200, links);
    });
});

app.post('/links', getSignedInUser, function(req, res) {
  var uri = req.body.url;

  if ( ! util.isValidUrl(uri) ) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.findByUrl(uri)
    .then(function(link) {
      if (link) {
        res.send(link);
      } else {

        Link.create({
          url: uri,
          base_url: req.headers.origin
        })
          .then(function(newLink) {
            res.status(201).send(newLink);
          })
          .catch(function (err) {
            console.log('Error reading URL heading: ', err);
            return res.status(404).send(err);
          })
      }
    });
});



app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findByUsername( username )
    .then(function(user) {

      if ( ! user ) {
        res.redirect('/login');
      }
      else {
        User.comparePassword( user.password_hash, password )
          .then(function (isMatch) {

            if ( ! isMatch ) {
              console.log("Incorrect password")
              res.redirect('/login');

            } else {
              Session.create( user.id )
                .then(function (newSession) {
                  // http://expressjs.com/en/api.html#res.cookie
                  res.cookie('sessionId', newSession.id);
                  return res.redirect('/');
                })
            }
          });
      }
    });
});

app.get('/logout', function(req, res) {
  Session.destroy( req.cookies.sessionId )
    .then(function () {
      res.clearCookie('sessionId');
      res.redirect('/login');
    })
});

app.get('/signup', function(req, res) {
  res.render('signup');
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findByUsername( username )
    .then(function(user) {
      if ( user ) {
        console.log('Account already exists');
        res.redirect('/signup');
      }
      else {
        User.create({
          username: username,
          password: password
        })
          .then(function(newUser) {
            return Session.create(newUser.id);
          })
          .then(function (newSession) {
            // http://expressjs.com/en/api.html#res.cookie
            res.cookie('sessionId', newSession.id);
            return res.redirect('/');
          })
      }
    })
});

function getSignedInUser (req, res, next) {
  var sessionId = req.cookies && req.cookies.sessionId

  if ( ! sessionId ) {
    res.redirect('/login');
  }
  else {
    //
    // This could be simplified to one query / db call.
    // See if you can find out how!
    //
    Session.findById( sessionId )
      .then(function (session) {
        if ( ! session ) {
          console.log("invalid session")
          res.redirect('/login')
        }
        else {
          return User.findById( session.user_id )
            .then(function (user) {
              if ( ! user ) {
                console.log("invalid session (no such user)")
                res.redirect('/login')
              }
              else {
                req.user = user
                next();
              }
            })
        }
      })
  }
};

app.get('/*', function(req, res) {
  Link.findByCode( req.params[0] )
    .then(function(link) {
      if (!link) {
        res.redirect('/');
      } else {
        Click.create( link.id )
          .then(function() {
            return res.redirect(link.url);
          });
      }
    });
});


if ( process.env.NODE_ENV === 'test' ) {
  module.exports = app;
}
else {
  db.ensureSchema();
  console.log('Shortly is listening on 4568');
  app.listen(4568);
}
