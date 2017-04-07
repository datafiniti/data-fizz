import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reducer from '../reducers/root';

export default function configureStore(initialState) {
	const finalCreateStore = compose(
		applyMiddleware(promise),
	)(createStore);

	const store = finalCreateStore(reducer, initialState);

	return store;
}