import React, { PropTypes } from 'react';
import '../static/styles/main.sass';

import Nav from './shared/Nav';
import Sidebar from './shared/Sidebar';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authenticated: false,
		};
	}

	render() {
		return (
			<div className='application-container'>
				<Nav authenticated={this.state.authenticated} />
				<Sidebar authenticated={this.state.authenticated} />
				{this.props.children}
			</div>

		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
};

export default App;