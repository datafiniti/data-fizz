import React from 'react';

class Change extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.change = this.change.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	change(e) {
		e.preventDefault();
		this.props.attemptChangePassword(this.state);
	}

	render() {
		const { loading, status } = this.props;

		if (loading) {
			return (
				<div>
					<p>Loading</p>
				</div>
			);
		}

		if (status === 'change-password-success') {
			return (
				<div>
					<p>You have successfully changed your password</p>
				</div>
			);
		}

		return (
			<div className='change-password-container'>
				<header className='change-password-header modal-form-header'>
					<h2>Change your password</h2>
				</header>

				<div className='change-password-body form-container modal-form-container'>
					<div className='form-wrapper'>
						<input 
							type='email' 
							name='email' 
							id='user-email' 
							className='form-input'
							onChange={this.handleInputChange}
						/>
						<label htmlFor='user-email'>Email</label>
					</div>

					<div className='form-wrapper'>
						<input
							type='password'
							name='oldPassword'
							id='user-password'
							className='form-input'
							onChange={this.handleInputChange}
						/>
						<label htmlFor='user-password'>Old Password</label>
					</div>

					<div className='form-wrapper'>
						<input
							type='password'
							name='newPassword'
							id='user-new-password'
							className='form-input'
							onChange={this.handleInputChange}
						/>
						<label htmlFor='user-new-password'>New Password</label>
					</div>

					<div className='form-wrapper'>
						<input
							type='password'
							name='confirmNewPassword'
							id='user-confirm-password'
							className='form-input'
							onChange={this.handleInputChange}
						/>
						<label htmlFor='user-confirm-password'>Confirm New Password</label>
					</div>

					<div className='form-submit'>
						<button type='button' onClick={this.change}>Submit</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Change;