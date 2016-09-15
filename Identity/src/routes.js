import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import App from 'app.js';
import Login from './Login/login';
import Dashboard from './Dashboard/dashboard';

// Router
function authenticate() {
	axios.defaults.headers.common['x-access-email'] = window.sessionStorage.getItem('email');
	axios.defaults.headers.common['x-access-token'] = window.sessionStorage.getItem('token');
	axios.get('/api')
	.then(function(res) {
		if(!res.data.success) {
			browserHistory.push('/login');
		}
		else {
			browserHistory.push('/dashboard');
		}
	})
}

ReactDOM.render((
  <Router history={browserHistory} >
    <Route path="/" component={App} onEnter={authenticate}>
      <Route path="login" component={Login}/>
      <Route path="dashboard" component={Dashboard} onEnter={authenticate}/>
    </Route>
  </Router>
),  document.getElementById('root'));
