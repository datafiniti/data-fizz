import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


import App from './pages/App';
import Dashboard from './components/product/dashboard';
import Inventory from './pages/Inventory';

const store = configureStore();


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