import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import '../static/styles/main.sass';

import Nav from './shared/Nav';
import Sidebar from './shared/Sidebar';
import Home from './home/home';

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
		return (
			<div className='application-container'>
				<Nav authenticated={this.props.authenticated} />
				<Sidebar authenticated={this.props.authenticated} />
				<Home />
			</div>

		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
};

export default App;