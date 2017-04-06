import development from './development'

let config = {};

switch (process.env.NODE_ENV) {
	default:
		config = Object.assign({}, development);
		break;
}

export default config