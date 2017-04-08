import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';


import App from './components/App';
import Home from './components/home/home';

const store = configureStore();

console.log(store);

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app'),	
);