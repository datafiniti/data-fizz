import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'

import userRoutes from './routes/user.server.routes'

module.exports = (db) => {
	const app = express();

	const PATHS = {
		app: path.join(__dirname, '../app'),
		dist: path.join(__dirname, '../dist'),
		modules: path.join(__dirname, '../node_modules')
	};

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
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

	app.use('/users', userRoutes);

	return app;
};