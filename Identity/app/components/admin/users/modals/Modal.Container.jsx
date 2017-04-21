import { connect } from 'react-redux';
import { closeChangePassword, closeEditUser, changePassword, editUser } from '../redux/actions';
import Modal from './Modal.Component';

const mapStateToProps = (state) => {
	return {
		changePasswordOpen: state.users.changePasswordOpen,
		editUserOpen: state.users.editUserOpen,
		loading: state.users.loading,
		status: state.users.status,
		error: state.users.error,
		user: state.auth.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		attemptChangePassword: (data) => {
			dispatch(changePassword(data));
		},

		attemptEditUser: (data) => {
			dispatch(editUser(data));
		},

		closePasswordModal: () => {
			dispatch(closeChangePassword());
		},

		closeEditModal: () => {
			dispatch(closeEditUser());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

