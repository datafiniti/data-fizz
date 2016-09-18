const Authentication = require('./controllers/authentication');



module.exports = function (app){
	// on a GET request
	app.get('/', function(req, res, next){
		//next is an error handler
		res.send({ hi:'there' })
	})

  app.post('/login', Authentication.login);
  app.post('/signup', Authentication.signup);
   app.post('/resetPwd', Authentication.reset)


}