let router = require('express').Router();
let nodemailer = require('nodemailer');
let path = require('path');

let db = require('../../db');
let User = db.model('user');
let Rreset = db.model('reset');

let env = require(path.join(__dirname, '../../env/development.js'));

router.post('/setcode', function(req, res, next) {
  let email = req.body.email;
  return User.findOne({where:{email:email}})
  .then(function(user) {
    let authcode = Math.floor(100000 + Math.random() * 900000);
    Rreset.create({authcode: authcode, userId: user.id})
    .then(function() {
      sendVerificationCode(req, res, authcode, email)
    })
  })
  .catch(next);
});

function sendVerificationCode(req, res, authcode, email) {
  let transporter = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
      user: 'data.finiti.identity@gmail.com',
      pass: env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: 'data.finiti.identity',
    to: email,
    subject: 'Password Reset Verifitication',
    html: '<h1>Password Reset Verification</h1> <div>Someone requested to reset your password. If you did not request to reset your password, please disregard this email.<div> <div>Please use the following verification code: '+authcode+' to reset your password.</div>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error) res.status(404).json(error);
    else res.json(info);
  });
}

router.put('/checkcode', function(req, res, next) {
  let passwordNew = req.body.passwordNew
  let authcode = req.body.authcode
  Rreset.findOne({where:{authcode:authcode}})
  .then(function(authcodeRow) {
    if (authcodeRow) {
      User.findOne({where:{id: authcodeRow.userId}})
      .then(function(user) {
        user.update({password:passwordNew})
        authcodeRow.destroy()
        res.json(user.sanitize())
      })
    } else res.status(403).send()
  })
  .catch(next)
})

module.exports = router;