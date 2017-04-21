import React from 'react';
import Nav from './shared/components/nav/Nav.Container';

const App = ({ children }) => {
	return (
		<div className='application-container'>
			<Nav />
			{children}
		</div>
	);
};

export default App;