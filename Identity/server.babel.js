import http from 'http'
import appConfig from './server/config/config'
import expressConfig from './server/express'
import db from './server/models/db'

import Users from './server/models/users'

const app = expressConfig(db);
const server = http.createServer(app);

server.listen(appConfig.server.port, () => {
	console.log('The application is up and running at ${appConfig.server.host}${appConfig.server.port}');
});

global.config = appConfig;