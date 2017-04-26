import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import renderField from '../../libs/RenderField';
import validate from './validate';

import * as actionCreators from '../../actions/auth';

const form = reduxForm({
	form: 'LoginForm',
	validate,
});

class Login extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}


	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}


	login(e) {
		e.preventDefault();

		this.props.actions.loginUser(this.state)
		.then((result) => {
			if (result.payload.data.res.errors) {
				this.props.actions.loginFailure(result.payload.data.res.errors);
			}

			if (result.payload.data.res.token !== 'undefined') {
				window.localStorage.setItem('token', result.payload.data.res.token);
				window.localStorage.setItem('user', JSON.stringify(result.payload.data.res.record));
				this.props.actions.loginComplete(JSON.stringify(result.payload.data.res.record));
				this.context.router.transitionTo('dashboard');
			}
		});
	}

	render() {
		return (
			<div className='auth-form-container'>
				<form name='login-form'>
					<Field
						name='email'
						type='email'
						label='email'
						id='login-email'
						value={window.localStorage.getItem('remembered-email')}
						component={renderField}
						onChange={this.handleInputChange}
					/>

					<Field
						name='password'
						type='password'
						label='password'
						id='login-password'
						component={renderField}
						onChange={this.handleInputChange}
					/>

					<div className='login-options'>
						<div>
							<button>Forgot Password</button>
						</div>
					</div>

					<div className='form-submit'>
						<button type='button' onClick={this.login.bind(this)}>Login</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	error: state.auth.error,
});

const mapDistpatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDistpatchToProps)(form(Login));