import React from 'react';
import Nav from './shared/components/nav/Nav.Container';
import Sidebar from './shared/components/sidebar/Sidebar.Container';

const App = ({ children }) => {
	return (
		<div className='application-container'>
			<Nav />
			<Sidebar />
			{children}
		</div>
	);
};


export default App;