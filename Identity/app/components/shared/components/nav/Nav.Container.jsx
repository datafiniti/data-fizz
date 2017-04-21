import { connect } from 'react-redux';
import Nav from './Nav.Component';

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Nav);