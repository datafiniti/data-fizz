if (process.env.NODE_ENV !== 'production' || (location && location.hostname !== 'localhost')) {
	module.exports = require('./configureStore.dev');
}

