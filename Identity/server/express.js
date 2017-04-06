import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'

module.exports = () => {
	const app = express();

	const PATHS = {
		app: path.join(__dirname, '../app'),
		dist: path.join(__dirname, '../dist'),
		modules: path.join(__dirname, '../nodule_modules')
	};

	app.use(bodyParser.json());
	app.use(bodyParser.urlendoded({extended: true}));
	app.use(compression());
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*'),
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
		next();
	});

	app.use(express.static(PATHS.app));
	app.use(express.static(PATHS.dist));
	app.use(express.static(PATHS.modules));

	return app;
};