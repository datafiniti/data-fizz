import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import '../static/styles/main.sass';

import Nav from './shared/Nav';
import Sidebar from './shared/Sidebar';
import Auth from './auth/auth';

@connect((state) => {
	return {
		authenticated: state.auth.isAuthenticated,
	};
})

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.authenticated) {
			return (
				<div className='application-container'>
					<Nav authenticated={this.props.authenticated} />
					<Sidebar authenticated={this.props.authenticated} />
					<Auth />
				</div>
			);
		} 

		return (
			<div className='authed-application-container'>
				<Nav authenticated={this.props.authenticated} />
				<Sidebar authenticated={this.props.authenticated} />
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object,
};

export default App;