import React from 'react';

import Auth from '../auth/auth';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authenticated: false,
		};
	}

	render() {
		if (!this.state.authenticated) {
			return (
				<div>
					<Auth />
				</div>
			);
		}

		return (
			<div><p>Home</p></div>
		);
	}
}

export default Home;