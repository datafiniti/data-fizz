import { connect } from 'react-redux';
import { closeForgotPassword, startPasswordReset, finishPasswordReset } from '../redux/actions';
import Modal from './Modal.Component';

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        status: state.auth.status,
        forgotPasswordOpen: state.auth.forgotPasswordOpen,
        error: state.auth.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closePasswordModal: () => {
            dispatch(closeForgotPassword());
        },

        sendResetToken: (data) => {
            dispatch(startPasswordReset(data));
        },

        resetPassword: (data) => {
            dispatch(finishPasswordReset(data));
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Modal);
