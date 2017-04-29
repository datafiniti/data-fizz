import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './rootReducer';

export default function configureStore(initialState) {
	const logger = createLogger();
	const middleware = applyMiddleware(thunk, logger);
	const createStoreWithMiddleware = compose(middleware);
	const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

	if (module.hot) {
		module.hot
			.accept('./rootReducer', () => {
				const nextRootReducer = require('./rootReducer');
				store.replaceReducer(nextRootReducer);
			});
	}

	return store;
}