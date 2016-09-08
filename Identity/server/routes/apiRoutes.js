var express = require('express');
var app = express();
var apiRoutes = express.Router();

var authenticate = require('../models/authModel.js');
var user = require('../models/userModel.js')

apiRoutes.use(authenticate.verify);
apiRoutes.get('/', function(req, res) {
  res.json({ success: true, message: 'authorized' });
});
apiRoutes.post('/signout', authenticate.logout)
apiRoutes.post('/changeEmail', user.changeEmail)
apiRoutes.post('/changePassword', user.changePassword)

module.exports = apiRoutes;

