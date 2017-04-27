import { connect } from 'react-redux';
import { closeChangePassword, closeEditUser, editUser, changePassword } from '../../redux/actions/users';
import Modal from './Modal.Component';

const mapStateToProps = (state) => {
    return {
        changePasswordOpen: state.users.changePasswordOpen,
        editUserOpen: state.users.editUserOpen,
        error: state.users.error,
        status: state.users.status,
        loading: state.users.loading,
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
