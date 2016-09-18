const Authentication = require('./controllers/authentication');



module.exports = function (app){
	// on a GET request
	app.get('/', function(req, res, next){
		//next is an error handler
		res.send({ hi:'there' })
	})



}