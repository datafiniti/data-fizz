import { connect } from 'react-redux';
import { logoutUser } from '../../../auth/redux/actions';
import Sidebar from './Sidebar.Component';

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		attemptLogout: (data) => {
			dispatch(logoutUser(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);