import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

import App from './components/App.Container';
import Signup from './components/auth/signup/Signup.Container';
import Login from './components/auth/login/Login.Container';

const store = configureStore();

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<Route path='signup' component={Signup} />
				<Route path='login' component={Login} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app'),
);