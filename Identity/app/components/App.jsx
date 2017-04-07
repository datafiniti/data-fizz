import React from 'react';
import '../static/styles/main.sass';

import Nav from './shared/Nav';
import Sidebar from './shared/Sidebar';
import Auth from './auth/auth';
import Home from './home/home';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authenticated: false,
		};
	}

	render() {
		if (!this.state.authenticated) {
			return (
				<div className='application-container'>
					<Nav authenticated={this.state.authenticated} />
					<Sidebar authenticated={this.state.authenticated} />
					<Auth />
				</div>
			);
		}

		return (
			<div className='application-container'>
				<Nav authenticated={this.state.authenticated} />
				<Sidebar authenticated={this.state.authenticated} />
				<Home />
			</div>
		);
	}
}

export default App;