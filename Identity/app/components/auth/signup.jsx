import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import renderField from '../../libs/RenderField';
import validate from './validate';

import * as actionCreators from '../../actions/auth';


const form = reduxForm({
	form: 'SignupForm',
	validate,
});

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			username: '',
			email: '',
			password: '',
		};


		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleBlur(event) {
		const target = event.target;

		if (!target.value) {
			target.classList.add('invalid');
		}
	}

	signup(e) {
		e.preventDefault();
		this.props.actions.signUpStart(this.state)
		.then((result) => {
			if (result.payload.data.res.errors) {
				this.props.actions.signUpFailure(result.payload.data.res.errors);
			}

			if (result.payload.data.res.token !== 'undefined') {
				window.localStorage.setItem('token', result.payload.data.res.token);

				this.props.actions.signUpComplete(result.payload.data.res.record);
			}
		});
	}


	render() { 
		return (
			<div className='auth-form-container'>
				<form name='signup-form'>
					<div className='form-wrapper'>
						<Field 
							name='name'
							type='text'
							label='name'
							id='signup-name'
							component={renderField}
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className='form-wrapper'>
						<Field 
							name='username' 
							type='text'
							label='username' 
							id='signup-username'
							component={renderField} 
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className='form-wrapper'>
						<Field 
							name='email' 
							type='email' 
							id='signup-email'
							label='email'
							component={renderField} 
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className='form-wrapper'>
						<Field 
							name='password' 
							type='password'
							label='password' 
							id='signup-password'
							component={renderField}
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className='form-wrapper'>
						<Field 
							name='confirmPassword' 
							type='password'
							label='Confirm Password' 
							id='signup-confirm'
							component={renderField} 
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className='form-submit'>
						<button type='button' onClick={this.signup.bind(this)}>Sign Up</button>
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

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(form(Signup));