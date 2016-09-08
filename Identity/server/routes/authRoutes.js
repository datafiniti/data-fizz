var express = require('express');
var app = express();
var authRoutes = express.Router();

var authenticate = require('../models/authModel.js');

authRoutes.use(authenticate.verify);
authRoutes.get('/', function(req, res) {
  res.json({ success: true, message: 'Authorized' });
});
authRoutes.post('/signout', authenticate.logout)

module.exports = authRoutes;

