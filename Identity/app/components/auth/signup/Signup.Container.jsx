import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { signupUser } from '../redux/actions';
import Signup from './Signup.Component';
import validate from '../validate';

const form = reduxForm({
	form: 'signupForm',
	validate,
});

const mapStateToProps = (state) => {
	return {
		err: state.auth.err,
		loading: state.auth.loading,
		showNotification: state.auth.showNotification,
		notificationType: state.auth.notificationType,
		user: state.auth.user,

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		attemptSignup: (data) => {
			dispatch(signupUser(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(form(Signup));