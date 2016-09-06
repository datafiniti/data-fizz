let router = require('express').Router();
let db = require('../../db');
let User = db.model('user');
let Session = db.model('session');

let validatePassword = function(req, res, next) {
  let password = req.body.password || req.body.passwordOld;
  return User.findOne({where: { id: req.body.id }})
  .then(function(user) {
    if (!user || !user.correctPassword(req.body.password)) {
      res.status(403).send();
    } else {
      next();
    }
  })
  .catch(next)
}

function checkExistingEmail(req, res, next) {
  User.findOne({where:{email:req.body.emailNew}})
  .then(function(user) {
    if (!user) {
      next();
    } else {
      res.status(403).json('Email already in use!').end()
    }
  })
}

router.use(validatePassword)
router.use('/update/email', checkExistingEmail);

router.put('/update/email', function(req, res, next) {
  let userId = req.body.id;
  let newEmail = req.body.emailNew;
  User.findOne({where:{id:userId}})
  .then(function(user) {
    return user.update({
      email: newEmail
    })
  })
  .then(function(update) {
    res.json(update)
  })
  .catch(next);
})

router.put('/update/password', function(req, res, next) {
  let userId = req.body.id;
  let newPassword = req.body.passwordNew;
  console.log("password", req.body)
  User.findOne({where:{id:userId}})
  .then(function(user) {
    return user.update({
      password: newPassword
    })
  })
  .then(function(update) {
    res.json(update)
  })
  .catch(next);
})

module.exports = router;