import React from 'react';
import App from './App.Component';

const AppContainer = ({ children }) => {
	return (
		<App>
			{children}
		</App>
	);
};

export default AppContainer;