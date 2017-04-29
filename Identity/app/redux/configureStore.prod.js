import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './rootReducer';

export default function configureStore(initialState) {
    const middleware = applyMiddleware(thunk);
    const createStoreWithMiddleware = compose(middleware);
    const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

    return store;
}