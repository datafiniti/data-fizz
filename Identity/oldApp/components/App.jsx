import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from './shared/Nav';
import Sidebar from './shared/Sidebar';
import Auth from './auth/auth';

import * as actionCreators from '../actions/auth';


class App extends React.Component {
	componentWillMount() {
		this.props.loadUserFromToken();
	}

	render() {
		console.log(this.props);

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
				<Nav authenticated={this.props.authenticated} user={this.props.user} />
				<Sidebar 
					logout={this.props.actions.logoutUser}
					authenticated={this.props.authenticated}
					user={this.props.user}
				/>
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authenticated: state.auth.status === 'authenticated',
		user: state.auth.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch),
});

App.propTypes = {
	children: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);