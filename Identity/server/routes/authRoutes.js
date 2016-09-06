var express = require('express');
var app = express();
var authRoutes = express.Router();

var authenticate = require('../models/authModel.js');

authRoutes.post('/login', authenticate.login);
authRoutes.use(authenticate.verify);
authRoutes.get('/', function(req, res) {
  res.json({ message: 'Testing' });
});

module.exports = authRoutes;

