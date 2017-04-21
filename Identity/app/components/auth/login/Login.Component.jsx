import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import renderField from '../../shared/utils/renderField';


class Login extends React.Component {
	static propTypes = {
		router: PropTypes.object,
		attemptLogin: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	login(e) {
		e.preventDefault();
		this.props.attemptLogin(this.state);
	}

	render() {
		return (
			<div className='auth-form-container form-container'>
				<form name='login-form'>
					<Field
						name='email'
						type='email'
						label='email'
						id='login-email'
						wrapperClass='form-wrapper'
						inputClass='form-input'
						component={renderField}
						onChange={this.handleInputChange}
					/>

					<Field
						name='password'
						type='password'
						label='password'
						id='login-password'
						wrapperClass='form-wrapper'
						inputClass='form-input'
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

export default Login; 