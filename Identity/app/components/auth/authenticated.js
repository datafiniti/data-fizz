import React from 'react';
import { connect } from 'react-redux';

export function requiresAuth(Component) {
	class Authenticated extends React.Component {

		componentWillMount() {
			this.checkAuth(this.props.isAuthenticated);
		}

		componentWillReceiveProps(nextProps) {
			this.checkAuth(nextProps.isAuthenticated);
		}

		checkAuth(isAuthenticated) {
			if (!isAuthenticated) {
				let redirectAfterLogin = this.props.location.pathname;

				// consider implementing a call with push state to 
				// send me to login and then use ?next to redict back
				// to the path where this was called
			}
		}

		render() {
			return (
				<div>
					{this.props.isAuthenticated === true
						? <Component { ...this.props } />
						: null
					}
				</div>
			);
		}
	}

	const mapStateToProps = (state) => {
		user: state.auth.user,
		isAuthenticated: state.auth.isAuthenticated,
	};

	return connect(mapStateToProps)(Authenticated);
}