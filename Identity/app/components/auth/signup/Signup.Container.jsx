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
		error: state.auth.error,
		loading: state.auth.loading,
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