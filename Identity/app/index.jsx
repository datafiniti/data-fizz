import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Signup from 'auth/signup/Signup.Container';
import Login from 'auth/login/Login.Container';
import Details from 'users/details/Details.Container';
import Notifications from 'users/notifications/Notifications.Container';
import Settings from 'users/settings/Settings.Container';
import { loadAuth } from 'auth/redux/actions';
import { requireAuthentication } from 'shared/utils/authenticatedComponent';

import configureStore from './redux/configureStore';
import './static/styles/shared/shared.sass';
import App from './components/App.Component';

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
				<Route path='details' component={requireAuthentication(Details)} />
				<Route path='notifications' component={requireAuthentication(Notifications)} />
				<Route path='settings' component={requireAuthentication(Settings)} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app'),
);