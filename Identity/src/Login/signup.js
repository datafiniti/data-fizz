import React, { Component } from 'react';
import axios from 'axios';
import styles from './signup.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


export default class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmedPassword: '',
			emailValid: false,
			passwordValid: false,
			emailError: '',
			passwordError: '',
			open: false,
			message: 'Please correctly fill in fields.'
		}
	}

	validateEmail(email) {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
	}

	emailChange(e) {
		const { email, emailValid, emailError } = this.state;
		
		e.preventDefault();
		if(!this.validateEmail(email)) {
			this.setState({
				email: e.target.value,
				emailError: 'Please enter a valid email.',
				emailValid: false
			});
		}
		else {
			this.setState({
				email: e.target.value,
				emailError: '',
				emailValid: true
			});
		}
	}

	passwordChange(e) {
		const { confirmedPassword } = this.state;

		e.preventDefault();
		if( confirmedPassword !== e.target.value) {
			this.setState({
				password: e.target.value,
				passwordError: 'Passwords do not match',
				passwordValid: false
			});
		}
		else {
			this.setState({
				password: e.target.value,
				passwordError: '',
				passwordValid: true
			});
		}
	}


	confirmedPasswordChange(e) {
		const { password } = this.state;

		e.preventDefault();
		if(password !== e.target.value) {
			this.setState({
				confirmedPassword: e.target.value,
				passwordError: 'Passwords do not match',
				passwordValid: false
			});
		}
		else {
			this.setState({
				confirmedPassword: e.target.value,
				passwordError: '',
				passwordValid: true
			});
		}
	}

	signup() {
		console.log('signing up');
		const { email, password, emailValid, passwordValid } = this.state;
		const that = this;
		if(emailValid && passwordValid) {
			console.log('valid');
			axios.post('/signup', {
				email: email,
				password: password
			})
			.then(function(res) {
				console.log('response', res);
				that.setState({
					message: res.data.message,
					open: true
				});
			});
		}
		else {
			this.setState({
				message: "Please enter a valid email address and password before attempting to sign up.",
				open: true
			});
		}
	}

	closeNotification() {
		this.setState({
			open: false
		});
	}

	render() {
		const { emailError, passwordError, open, message } = this.state; 
		return (
			<div className={styles.form}>
				<TextField
					className={styles.textField}
					onChange={this.emailChange.bind(this)}
					floatingLabelText="Email"
					errorText={emailError}
				/>
		    <TextField
		    	className={styles.textField}
		    	onChange={this.passwordChange.bind(this)}
		      floatingLabelText="Password"
		      type="password"
		    />
		    <TextField
		    	className={styles.textField}
		    	onChange={this.confirmedPasswordChange.bind(this)}
		      floatingLabelText="Re-Enter Password"
		      type="password"
		      errorText={passwordError}
		    />
		    <RaisedButton label='Sign Up' primary={true} onClick={this.signup.bind(this)}/>
		    <Snackbar
		    	open={open}
		    	message={message}
		    	autoHideDuration={4000}
		    	onRequestClose={this.closeNotification.bind(this)}
	    	/>
	    </div>
		)
	}
}