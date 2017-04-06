import mongoose from 'mongoose'

mongoose.connect(`mongodb://${global.config.db.host}${global.config.db.port}/${global.config.db.name}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection failed'));
db.once('open', () => {
	console.log(`connected to the ${global.config.db.name} database`);
});

export default db