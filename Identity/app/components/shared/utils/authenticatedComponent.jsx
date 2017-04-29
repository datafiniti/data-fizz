import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export function requireAuthentication(Component) {
	class AuthenticatedComponent extends React.Component {
		componentWillMount() {
			this.checkAuth(this.props.isAuthenticated);
		}

		componentWillReceiveProps(nextProps) {
			this.checkAuth(nextProps.isAuthenticated);
		}

		checkAuth(isAuthenticated) {
			if (!isAuthenticated) {
				browserHistory.push('/login');
			}
		}

		render() {
			return (
				<div>
					{this.props.isAuthenticated === true
						? <Component {...this.props} />
						: null
					}
				</div>
			);
		}
	}

	const mapStateToProps = (state) => ({
		isAuthenticated: state.auth.isAuthenticated,
	});

	return connect(mapStateToProps)(AuthenticatedComponent);
}