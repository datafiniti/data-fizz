var express = require('express');
var app = express();
var authRoutes = express.Router();

var authenticate = require('../models/authModel.js');

authRoutes.get('/', function(req, res) {
  res.json({ message: 'Testing' });
});
authRoutes.post('/login', authenticate.login);
authRoutes.use(authenticate.verify);

module.exports = authRoutes;

