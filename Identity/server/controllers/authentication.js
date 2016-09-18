const jwt = require('jwt-simple');
const User = require('../models/user'); //grab all users
const config = require('../config');


function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function (req,res,next){
  //User has already had their email and pwd auth'd
  //We just need to give them a token
  //req.user comes from passport in localSrtategy when return done(null,user) in success
  User.findOne({email:email},function(err,user) {
    if(err) { return next(err); }
    if(!user) { return res.status(422).send({error:'wrong email or password'}); }

    //compare passwords - is 'password' equal to user.password ?
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return next(err); }
      if(!isMatch) { return res.status(422).send({error:'wrong email or password'}); }

      return res.send({ token : tokenForUser(req.user) })
    })
  })

}


exports.signup = function (req,res,next) {
  //pull data out of the req
  const email = req.body.email;
  const password = req.body.password;


  if (!email || !password) {
    return res.status(422).send({error:'You must provide email and password'});
  }



  //See if a user with the given email exists look through all of our user(model class)
  User.findOne({email:email},function(err,existingUser) {
    if(err) { return next(err); }

    //If a user with email does exist, return an error

    if(existingUser){
      return res.status(422).send({error:'Email is in use'})
    }

    //If a user with email does NOT exist, create and save user record
    const user = new User ({
      email: email,
      password:password
    });

    //to save the user to the db
    user.save(function(err){
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.json({token: tokenForUser(user)});

    });
  })

};


  



  