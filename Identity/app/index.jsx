import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { isAuthed } from './actions/auth';
import configureStore from './store/configureStore';


import App from './components/App';
import Dashboard from './components/product/dashboard';
import Inventory from './components/product/inventory';

const store = configureStore();

const token = window.localStorage.getItem('token');
if (token !== null) {
	store.dispatch(isAuthed());
}

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<Route path='dashboard' component={Dashboard} />
				<Route path='inventory' component={Inventory} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app'),	
);