import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { isAuthed } from './actions/auth';
import configureStore from './store/configureStore';


import App from './components/App';
import Home from './components/home/home';

const store = configureStore();

const token = window.localStorage.getItem('token');
if (token !== null) {
	store.dispatch(isAuthed());
}

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