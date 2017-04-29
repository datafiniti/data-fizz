import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { loginUser, openForgotPassword } from '../redux/actions';
import Login from './Login.Component';
import validate from '../validate';

const form = reduxForm({
	form: 'login-form',
	validate,
});

const mapStateToProps = (state) => {
	return {
		err: state.auth.err,
		loading: state.auth.loading,
		user: state.auth.user,
		showNotification: state.auth.showNotification,
		notificationType: state.auth.notificationType,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		attemptLogin: (data) => {
			dispatch(loginUser(data));
		},

		openPasswordModal: () => {
			dispatch(openForgotPassword());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(form(Login));