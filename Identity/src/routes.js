import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Login from './components/login';
import SignUp from './components/sign_up';
import Dash from './components/dashboard';
import Reset from './components/reset_pwd';
import Change from './components/change_pwd';
import RequireAuth from './components/require_auth';


export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="sign_up" component={SignUp} />
      <Route path="resetpwd" component={Reset} />
      <Route path="changePwd" component={Change} />
      <Route path="dashboard" component={RequireAuth(Dash)} />
    </Route>
  </Router>
);