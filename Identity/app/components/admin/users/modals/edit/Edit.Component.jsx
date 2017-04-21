import React from 'react';

class Edit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			username: '',
			email: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.edit = this.edit.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	edit(e) {
		e.preventDefault();
		this.props.attemptEditUser(this.state);
	}

	render() {
		const { user, loading, status } = this.props;

		if (loading) {
			return (
				<div>
					<p>Loading</p>
				</div>
			);
		}

		if (status === 'edit-user-success') {
			return (
				<div>
					<p>You have edited your info!</p>
				</div>
			);
		}

		return (
			<div className='edit-user-container'>
				<header className='edit-user-header modal-form-header'>
					<h2>Edit your Info</h2>
				</header>

				<div className='edit-user-body form-container modal-form-container'>
					<div className='form-wrapper'>
						<input type='text' name='name' id='user-name' className='form-input' defaultValue={user.name} onChange={this.handleInputChange} />
						<label htmlFor='user-name'>Name</label>			
					</div>

					<div className='form-wrapper'>
						<input type='text' name='username' id='user-username' className='form-input' defaultValue={user.username} onChange={this.handleInputChange} />
						<label htmlFor='user-username'>Username</label>
					</div>

					<div className='form-wrapper'>
						<input type='email' name='email' id='user-email' className='form-input' defaultValue={user.email} onChange={this.handleInputChange} />
						<label htmlFor='user-email'>Email</label>
					</div>

					<div className='form-submit'>
						<button type='button' onClick={this.edit}>
							Edit
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Edit;