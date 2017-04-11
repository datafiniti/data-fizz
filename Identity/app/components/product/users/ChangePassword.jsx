import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import renderField from '../../../libs/RenderField';
import validate from './validate';

import * as actionCreators from '../../../actions/password';

const form = reduxForm({
	form: 'changePassword',
	validate,
});

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		};
	}

	handleInputChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	};

	changePassword = (e) => {
		e.preventDefault();

		this.props.actions.changePassword(this.state)
		.then((result) => {

			if (result.payload.data.res.errors) {
				this.props.actions.changePasswordFailure(result.payload.data.res.errors);
			}

			if (result.payload.data.res.token !== 'undefined') {
				window.localStorage.removeItem('user');
				window.localStorage.removeItem('token');

				window.localStorage.setItem('token', result.payload.data.res.token);
				window.localStorage.setItem('user', JSON.stringify(result.payload.data.res.record));
				this.props.actions.changePasswordSuccess(JSON.stringify(result.payload.data.res.record));
			}
		});
	};

	render() {
		return (
			<div className='change-password-container'>
				<header className='change-password-header'>
					<h2>Change your Password</h2>
				</header>

				<div className='change-password-form'>
					<form name='change-password'>
						<Field
							name='email'
							type='email'
							label='email'
							wrapperClass='change-password-wrapper'
							inputClass='change-password-input'
							id='change-password-email'
							component={renderField}
							onChange={this.handleInputChange}
						/>

						<Field
							name='oldPassword'
							type='password'
							label='Old Password'
							id='change-password-password'
							inputClass='change-password-input'
							component={renderField}
							onChange={this.handleInputChange}
						/>

						<Field
							name='newPassword'
							type='password'
							label='New Password'
							id='change-password-new-password'
							inputClass='change-password-input'
							component={renderField}
							onChange={this.handleInputChange}
						/>

						<Field
							name='confirmNewPassword'
							type='password'
							label='Confirm New Password'
							id='change-password-confirm-password'
							inputClass='change-password-input'
							component={renderField}
							onChange={this.handleInputChange}
						/>

						<div className='form-submit'>
							<button type='button' onClick={this.changePassword}>Change Password</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.password.loading,
	error: state.password.error,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(form(ChangePassword));