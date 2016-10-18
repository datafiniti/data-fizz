import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import requireAuth from './components/hoc/require_authentication';
import App from './components/app';
import Signin from './components/auth/signin'
import Resources from './components/resources';
import reducers from './reducers';
import Async from './middlewares/async';

const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='signin' component={Signin} />
        <Route path='resources' component={requireAuth(Resources)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
