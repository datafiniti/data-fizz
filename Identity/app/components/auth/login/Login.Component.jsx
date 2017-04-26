import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import renderField from '../../shared/utils/renderField';
import Modal from '../modals/Modal.Container';
import Notifications from './Notification.Container';

import '../../../static/styles/components/auth/auth.sass';


class Login extends React.Component {
	static propTypes = {
		router: PropTypes.object,
		attemptLogin: PropTypes.func,
	};

	constructor(props) {
		super(props);

		console.log(this.props);

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
					<img src='../../../static/images/login.png' alt='Login Form Icon' />
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
						<button type='button' onClick={this.props.openPasswordModal} >Forgot Password</button>
					</div>

					<div className='form-submit'>
						<button type='button' onClick={this.login.bind(this)}>Log in</button>
					</div>
				</form>
				<Modal />
				<Notifications 
					showNotification={this.props.showNotification}
					notificationType={this.props.notificationType}
					error={this.props.err}
					user={this.props.user}
				/>
			</div>
		);
	}
}

export default Login; 