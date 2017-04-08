import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			username: '',
			email: '',
			password: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
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
		this.props.actions.signUpStart(this.state);
	}


	render() { 
		return (
			<div className='auth-form-container'>
				<h2>Sign Up</h2>
				<form name='signup-form'>
					<div className='form-wrapper'>
						<input 
							name='name'
							type='text' 
							id='signup-name'
							onChange={this.handleInputChange} 
							onBlur={this.handleBlur}
						/>
						<label htmlFor='signup-name'>Name</label>
					</div>

					<div className='form-wrapper'>
						<label htmlFor='signup-username'>Username</label>
						<input 
							name='username' 
							type='text' 
							id='signup-username' 
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className='form-wrapper'>
						<label htmlFor='signup-email'>Email</label>
						<input 
							name='email' 
							type='email' 
							id='signup-email' 
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className='form-wrapper'>
						<label htmlFor='signup-password'>Password</label>
						<input 
							name='password' 
							type='password' 
							id='signup-password' 
							onChange={this.handleInputChange} 
						/>
					</div>

					<div className='form-wrapper'>
						<label htmlFor='signup-confirm'>Confirm</label>
						<input 
							name='confirm' 
							type='password' 
							id='signup-confirm' 
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


export default connect(mapStateToProps, mapDispatchToProps)(Signup);