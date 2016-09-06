'use strict';

let router = require('express').Router();

router.use('/user', require('./user'));
router.use('/reset', require('./reset'));

router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;