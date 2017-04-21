import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { loginUser } from '../redux/actions';
import Login from './Login.Component';
import validate from '../validate';

const form = reduxForm({
	form: 'login-form',
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
		attemptLogin: (data) => {
			dispatch(loginUser(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(form(Login));