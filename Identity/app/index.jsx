import React from 'react';
import { render } from 'react-dom';
//import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import routes from './routes';

import App from './components/App';

const store = configureStore();

console.log(store);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app'),	
);