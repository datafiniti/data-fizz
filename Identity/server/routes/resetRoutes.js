var express = require('express');
var resetRoutes = express.Router();
var reset = require('../models/resetModel.js');

//Config for password reset middleware

resetRoutes.post('/forgot', reset.create);
resetRoutes.post('/password', reset.password);

module.exports = resetRoutes;