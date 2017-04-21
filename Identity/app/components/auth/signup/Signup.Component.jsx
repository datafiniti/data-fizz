import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import renderField from '../../shared/utils/renderField';

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
						onChange={this.handleInputChange} 
					/>

					<Field 
						name='username' 
						type='text'
						label='username' 
						id='signup-username'
						component={renderField}
						wrapperClass='form-wrapper'
						inputClass='form-input' 
						onChange={this.handleInputChange} 
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
						<button type='button' onClick={this.signup.bind(this)}>Sign Up</button>
					</div>
				</form>
			</div> 
		);
	}
}

export default Signup;