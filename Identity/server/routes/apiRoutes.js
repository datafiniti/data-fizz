var express = require('express');
var app = express();
var apiRoutes = express.Router();

var session = require('../models/sessionModel.js');
var user = require('../models/userModel.js')

apiRoutes.use(session.verify);
apiRoutes.get('/', function(req, res) {
  res.json({ success: true, message: 'authorized' });
});
apiRoutes.post('/signout', session.logout)
apiRoutes.post('/changeEmail', user.changeEmail)
apiRoutes.post('/changePassword', user.changePassword)

module.exports = apiRoutes;

