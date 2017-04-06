import http from 'http'
import appConfig from './server/config/config'
import expressConfig from './server/express'

const app = expressConfig();
const server = http.createServer(app);

server.listen(appConfig.server.port, () => {
	console.log('The application is up and running at ${appConfig.server.host}${appConfig.server.port}');
});

global.config = appConfig;