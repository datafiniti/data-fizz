import React from 'react';

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
				<Auth />
			);
		}

		return (
			<Home />
		);
	}
}

export default App;