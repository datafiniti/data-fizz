import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Nav from '../containers/NavContainer';
import Sidebar from '../containers/SidebarContainer';
import Auth from './auth/auth';


class App extends React.Component {
	componentWillMount() {
		this.props.loadUserFromToken();
	}

	render() {
		if (!this.props.authenticated) {
			return (
				<div className='application-container'>
					<Nav />
					<Sidebar />
					<Auth />
				</div>
			);
		} 

		return (
			<div className='authed-application-container'>
				<Nav />
				<Sidebar />
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authenticated: state.users.status === 'authenticated' || state.auth.status === 'authenticated',
	};
};

App.propTypes = {
	children: PropTypes.object,
};

export default connect(mapStateToProps)(App);