var app = express();
var authRoutes = express.Router();

var authenticate = require('../models/authModels.js');


authRoutes.post('/login', authenticate.login);

