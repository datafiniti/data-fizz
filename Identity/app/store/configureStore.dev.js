import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reducer from '../reducers/root';

export default function configureStore(initialState) {
	const makeCreateStore = compose(
		applyMiddleware(promise),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	)(createStore);

	const store = makeCreateStore(reducer, initialState);

	if (module.hot) {
		module.hot.accept('../reducers/root', () => {
			const nextReducer = require('../reducers/root');
			store.replaceReducer(nextReducer);
		});
	}

	return store;	
}