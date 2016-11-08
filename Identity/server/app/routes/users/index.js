'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = require('../../../db').model('user');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: "grasshopperreporter@gmail.com",
        pass: "vEzu8_cHAbraxaz", //would hide in not testing environment
    }
}));

function findUserEmail(emailAddress){
    return User.findOne({
        where: {
            email: emailAddress
        }
    });
}
function updateUserInfo(user, updatedInfo){
    return user.update(updatedInfo);
}
function randomPassword(){ //creates random password when resetting password
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
function userLogIn(email, password){ //will return user if correct login, false if not
    var user;
    return findUserEmail(email)
    .then(function(foundUser){
        if(foundUser) {
            user=foundUser;
            return foundUser.checkPassword(password); //verify correct password
        } else {
            throw new Error('email not found');
        }
    })
    .then(function(isCorrect){
        if(isCorrect) return user;
        throw new Error('password not correct');
    });
}
function sendEmail(recipient, subject, body){
    var mailOptions = {
        from: '"Log in support team" <grasshopperreporter@gmail.com>', // sender address
        to: recipient, // list of receivers
        subject: subject,
        text: body
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) return console.log(error);
        console.log('Message sent: ' + info.response);
    });
}

router.post('/addUser', function (req, res) { //sign up route
    var userInfo = {
        email:req.body.email,
        password: req.body.password1
    };
    return User.findAll({
        where: {
            email: req.body.email
        }
    })
    .then(function(foundUsers){
        if(foundUsers.length>0) throw new Error('Email address already in use');
        return User.create(userInfo);
    })
    .then(function(user){
        res.status(201).send(user);
    })    
    .catch(function(err){
            res.send(err);
    });
});
router.get('/login', function (req, res) { //user login route
    return userLogIn(req.query.email, req.query.password)
    .then(function(response){
        res.send(response);
    })
    .catch(function(err){
        res.send(err);
    });
});
router.put('/emailreset', function(req, res){  //email reset route
    return userLogIn(req.body.oldEmail, req.body.password)
    .then(function(loggedInUser){
        return updateUserInfo(loggedInUser, {email: req.body.newEmail});
    })
    .then(function(updatedUser){
        res.status(200).send(updatedUser);
    })
    .catch(function(err){
        res.send(err);
    });

});

router.put('/pwreset', function(req, res){ //password reset route
	var userEmail= req.body.email;
	var newPassword = randomPassword();
    return findUserEmail(req.body.email)
	.then(function(foundUser){
        if(foundUser) return updateUserInfo(foundUser, {password: newPassword});
        throw new Error('email not found');
	})
    .then(function(updatedUser){ //sending email to user with new password
        var emailSubject = 'Your password has been reset';
        var emailBody = 'Hello! \n\nYour password has been reset to: \n\n' + newPassword + '\n\nPlease login using this password, you can choose to change your password after login.';
        sendEmail(userEmail, emailSubject, emailBody);
        res.status(201).send(updatedUser);
    })
    .catch(function(err){
		var statusCode;
        if(err=="Error: email not found") {
            statusCode=400;
        } else {
            statusCode=500;
        }
        res.status(statusCode).send(err);
    });
});
router.put('/pwUpdate', function(req, res){ //password update route
    return userLogIn(req.body.email, req.body.oldPassword)
    .then(function(loggedInUser){
        return updateUserInfo(loggedInUser, {password: req.body.newPassword1});
    })
    .then(function(updatedUser){
        res.status(201).send(updatedUser);
    })
    .catch(function(err){
        res.send(err);
    });
});

