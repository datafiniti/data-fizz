var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/User.js');
var serverConfig = require('../server-config.js')


var app = express();
var authRoutes = express.Router();

app.set('secret', serverConfig.secret);