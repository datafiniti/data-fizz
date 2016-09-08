import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import styles from './signup.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailValid: false,
			emailError: '',
			open: false,
			message: ''
		}
	}

	validateEmail(email) {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
	}

	emailChange(e) {
		
		e.preventDefault();
		if(!this.validateEmail(e.target.value)) {
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
		e.preventDefault();
		this.setState({
			password: e.target.value
		});
	}

	closeNotification() {
		this.setState({
			open: false
		});
	}

	signin() {
		console.log('signing in');
		const { email, password, emailValid } = this.state;
		const that = this;
		if(emailValid) {
			console.log('valid');
			axios.post('/signin', {
				email: email,
				password: password
			})
			.then(function(res) {
				console.log('request response', res);
				window.sessionStorage.setItem('email', email);
				window.sessionStorage.setItem('token', res.data.token);
				axios.defaults.headers.common['x-access-email'] = email;
				axios.defaults.headers.common['x-access-token'] = res.data.token;
				browserHistory.push('/dashboard');
			});
		}
		else {
			this.setState({
				message: "Please enter a valid email address before attempting to sign in.",
				open: true
			});
		}
	}

	render() {
		const { emailError, open, message } = this.state; 
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
		    <RaisedButton label='Sign In' primary={true} onClick={this.signin.bind(this)}/>
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