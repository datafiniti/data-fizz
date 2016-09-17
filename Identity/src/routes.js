import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Login from './components/login';
import SignUp from './components/sign_up';
import Dash from './components/dashboard';
import RequireAuth from './components/require_auth';


export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="sign_up" component={SignUp} />
      <Route path="dashboard" component={RequireAuth(Dash)} />
    </Route>
  </Router>
);