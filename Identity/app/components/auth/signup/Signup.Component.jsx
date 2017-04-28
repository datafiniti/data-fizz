import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import renderField from '../../shared/utils/renderField';
import Notifications from './Notification.Container';

class Signup extends React.Component {
	static propTypes = {
		router: PropTypes.object,
		attemptSignup: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			username: '',
			email: '',
			password: '',
			confirm: '',
		};
	}
		

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	signup(e) {
		e.preventDefault();
		this.props.attemptSignup(this.state);
	}

	render() { 
		return (
			<div className='auth-form-container form-container'>
				<form name='signup-form'>
					<Field 
						name='name'
						type='text'
						label='name'
						id='signup-name'
						wrapperClass='form-wrapper'
						inputClass='form-input'
						component={renderField}
						onChange={this.handleInputChange.bind(this)} 
					/>

					<Field 
						name='username' 
						type='text'
						label='username' 
						id='signup-username'
						component={renderField}
						wrapperClass='form-wrapper'
						inputClass='form-input' 
						onChange={this.handleInputChange.bind(this)} 
					/>

					<Field 
						name='email' 
						type='email' 
						id='signup-email'
						label='email'
						wrapperClass='form-wrapper'
						inputClass='form-input'
						component={renderField} 
						onChange={this.handleInputChange} 
					/>

					<Field 
						name='password' 
						type='password'
						label='password' 
						id='signup-password'
						wrapperClass='form-wrapper'
						inputClass='form-input'
						component={renderField}
						onChange={this.handleInputChange} 
					/>

					<Field 
						name='confirmPassword' 
						type='password'
						label='Confirm Password' 
						id='signup-confirm'
						wrapperClass='form-wrapper'
						inputClass='form-input'
						component={renderField} 
						onChange={this.handleInputChange} 
					/>

					<div className='form-submit'>
						<button type='button' onClick={this.signup.bind(this)}>{this.props.loading ? 'loading' : 'Sign up'}</button>
					</div>
				</form>
				<Notifications
					showNotification={this.props.showNotification}
					notificationType={this.props.notificationType}
					user={this.props.user}
					error={this.props.err}
				/>
			</div> 
		);
	}
}

export default Signup;