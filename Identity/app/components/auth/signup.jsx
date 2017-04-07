import React from 'react';

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			credentials: {
				name: '',
				username: '',
				email: '',
				password: '',
				confirm: '',
			},
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

	render() {
		return (
			<div className='auth-form-container'>
				<form name='signup-form'>
					<div className='form-wrapper'>
						<label htmlFor='signup-name'>Name</label>
						<input name='name'type='text' id='signup-name' onChange={this.handleInputChange} />
					</div>

					<div className='form-wrapper'>
						<label htmlFor='signup-username'>Username</label>
						<input name='username' type='text' id='signup-username' onChange={this.handleInputChange} />
					</div>

					<div className='form-wrapper'>
						<label htmlFor='signup-email'>Email</label>
						<input name='email' type='email' id='signup-email' onChange={this.handleInputChange} />
					</div>

					<div className='form-wrapper'>
						<label htmlFor='signup-password'>Password</label>
						<input name='password' type='password' id='signup-password' onChange={this.handleInputChange} />
					</div>

					<div className='form-wrapper'>
						<label htmlFor='signup-confirm'>Confirm</label>
						<input name='confirm' type='password' id='signup-confirm' onChange={this.handleInputChange} />
					</div>

					<div className='form-submit'>
						<button type='button'>Sign Up</button>
					</div>
				</form>
			</div> 
		);
	}
}


export default Signup;