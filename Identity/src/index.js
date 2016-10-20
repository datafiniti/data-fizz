import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import RequireAuth from './components/hoc/require_authentication';
import App from './components/app';
import Welcome from './components/content/welcome';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Feature from './components/content/feature';
import reducers from './reducers';
import { authUser } from './actions';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
// If the client has a token, consider the user to be signed in/authenticated
const token = localStorage.getItem('token');
if (token) {
  // update app state b/c user authenticated
  store.dispatch(authUser(token));
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Welcome} />
          <Route path='signup' component={Signup} />
          <Route path='signin' component={Signin} />
          <Route path='signout' component={Signout} />
          <Route path='feature' component={RequireAuth(Feature)} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));
