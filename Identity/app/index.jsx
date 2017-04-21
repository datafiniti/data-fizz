import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { loadAuth } from './components/auth/redux/actions';
import configureStore from './redux/configureStore';

import './static/styles/shared/shared.sass';

import App from './components/App.Container';
import Signup from './components/auth/signup/Signup.Container';
import Login from './components/auth/login/Login.Container';

import Users from './components/admin/users/Users.Container';

const store = configureStore();
const token = window.localStorage.getItem('token');

if (token !== null) {
	store.dispatch(loadAuth());
}

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<Route path='signup' component={Signup} />
				<Route path='login' component={Login} />
				<Route path='user-management' component={Users} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app'),
);