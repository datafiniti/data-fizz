import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reducers from './reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist'


const createStoreWithMiddleware = compose(applyMiddleware(thunk, promise))(createStore);

const store = createStoreWithMiddleware(reducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f, autoRehydrate());

persistStore(store)

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
