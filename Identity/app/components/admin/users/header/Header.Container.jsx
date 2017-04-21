import { connect } from 'react-redux';
import { openChangePassword, openEditUser } from '../redux/actions';
import Header from './Header.Component';

const mapStateToProps = (state) => {
	return {
		changePasswordOpen: state.users.changePasswordOpen,
		editUserOpen: state.users.editUserOpen,
		loading: state.users.loading,
		status: state.users.status,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		openChangeModal: () => {
			dispatch(openChangePassword());
		},

		openEditModal: () => {
			dispatch(openEditUser());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);