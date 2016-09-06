'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import Bill from '../components/Bill'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Settings from '../components/Settings'
import Forgot from '../components/Forgot'
import ResetPass from '../components/ResetPass'
import ResetPassSuccess from '../components/ResetPassSuccess'

const routes = (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="forgot" component={Forgot}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={SignUp}/>
      <Route path="bill" component={Bill}/>
      <Route path="settings" component={Settings}/>
      <Route path="reset" component={ResetPass}/>
      <Route path="reset-success" component={ResetPassSuccess}/>
    </Route>
  </Route>
);

export default routes;