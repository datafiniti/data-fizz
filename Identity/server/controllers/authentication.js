const jwt = require('jwt-simple');
const User = require('../models/user'); //grab all users
const config = require('../config');
const nodemailer = require('nodemailer');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret)
}

exports.login = function (req,res,next){
  //User has already had their email and pwd auth'd
  //We just need to give them a token
  //req.user comes from passport in localSrtategy when return done(null,user) in success
  User.findOne({email:req.body.email},function(err,user) {
    if(err) { return next(err); }
    if(!user) { return res.status(422).send({error:'wrong email or password'}); }
    //compare passwords - is 'password' equal to user.password ?
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) { return next(err); }
      if(!isMatch) { return res.status(422).send({error:'wrong email or password'}); }
      return res.send({ 
        token : tokenForUser(user),
        id : user._id 
      })
    })
  })

}


exports.signup = function (req,res,next) {
  console.log("Received POST at /signup");
  //pull data out of the req
  const name = req.body.name
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
      name: name,
      email: email,
      password: password
    });

    //to save the user to the db
    user.save(function(err){
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.json({
        token: tokenForUser(user),
        id : user._id
      });

    });
  })

};

exports.resetPwd = function (req,res,next) {
  console.log("Received PUT at /resetPwd");
  const  email = req.body.email
    User.findOne({email:email},function(err,existingUser) {
    if(err) { return next(err); }
    if(!existingUser){
      return res.status(422).send({error:'Email does not exist, please try with another email '})
    }

    //generate a random password of 
    const newPassword = Math.random().toString(36).slice(2);

    //send new password to the user
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth : {
        user: 'datafinititest@gmail.com',
        pass: 'datafinitipwd'
      }
    });

    const mailOptions = {
    from: `"Datafiniti Challenge 👥" <datafinititest@gmail.com>`, // sender address
    to: `datafinititest@gmail.com`, // list of receivers
    subject: `Reset Password from Datafiniti Challenge`, // Subject line
    text: `Hi`, // plaintext body
    html: `<h1> Hello ${existingUser.name},  </h1>
    <p>Please find below your new password : <ul><li><strong>${newPassword}</strong></li></ul></p>
    <p> Regards,</p>
    <p>Team Datafiniti Challenge 🐴</p>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


    existingUser.updatePassword(newPassword, function(err,hashedPwd){
      if (err) { return next(err); }
      User.findOneAndUpdate({ _id : existingUser.id }, { $set: {password : hashedPwd}},function(err, newUserPwd){
        if(err) { return next(err); }
        console.log(hashedPwd,'hashed on reset')
        return res.status(204)        
      } )

    })

  })
}

exports.changePwd = function (req,res,next) {
  console.log("Received PUT at /changePwd");
  console.log(req.body,'BOOOOODY')
  const id = req.body.id;
  const newPassword = req.body.password; 

    User.findOne({ _id: id },function(err,user) {
    if(err) { return next(err); }
    if(!user){
      return res.status(422).send({error:'No user for this id'})
    }

    user.updatePassword(newPassword, function(err,hashedPwd){
      if (err) { return next(err); }
      User.findOneAndUpdate({ _id : id }, { $set: {password : hashedPwd}},function(err, newUserPwd){
        if(err) { return next(err); }
        console.log(hashedPwd,'hashed')
        return res.status(204)        
      } )

    })

  })
}


  



  