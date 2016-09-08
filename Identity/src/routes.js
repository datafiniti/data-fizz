import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import App from 'app.js';
import Login from './Login/login';
import Dashboard from './Dashboard/dashboard';

// Router
function authenticate() {
	axios.defaults.headers.common['email'] = window.sessionStorage.getItem('email');
	axios.defaults.headers.common['x-access-token'] = window.sessionStorage.getItem('token')
	axios.get('/auth')
	.then(function(res) {
		if(!res.data.success) {
			browserHistory.push('/');
		}
	})
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="dashboard" component={Dashboard} onEnter={authenticate}/>
    </Route>
  </Router>
),  document.getElementById('root'));
