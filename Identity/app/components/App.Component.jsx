import React from 'react';
import { RouteTransition } from 'react-router-transition';
import Nav from './shared/components/nav/Nav.Container';
import Sidebar from './shared/components/sidebar/Sidebar.Container';

const App = (props) => {
	return (
		<div className='application-container'>
            <Nav />
            <Sidebar />
            <RouteTransition
                pathname={props.location.pathname}
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className='route-transition-wrapper'
            >
                {props.children}   
            </RouteTransition>
		</div>
	);
};


export default App;