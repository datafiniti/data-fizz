import { connect } from 'react-redux';
import { logoutUser } from '../actions/users';
import Nav from '../components/shared/Nav';


function mapStateToProps(state) {
	return {
		authenticated: state.users.status === 'authenticated' ? state.users.user.name : null,
		user: state.users.user,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			window.localStorage.removeItem('token');
			dispatch(logoutUser());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);