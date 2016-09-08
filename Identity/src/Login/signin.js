import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import styles from './signin.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import ResetPasswordForm from './reset-password-form.js';

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			emailValid: false,
			emailError: '',
			notify: false,
			open: false,
			message: ''
		}
	}

	handleOpen() {
		this.setState({ open: true});
	}
	handleClose() {
		this.setState({ open: false});
	}

	handleNotification(message) {
		this.setState({ notify: true, message: message });
	}
	closeNotification() {
		this.setState({
			notify: false
		});
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


	signin() {
		const { email, password, emailValid } = this.state;
		const that = this;
		if(emailValid) {
			axios.post('/signin', {
				email: email,
				password: password
			})
			.then(function(res) {
				if(res.data.success) {
					window.sessionStorage.setItem('email', res.data.email);
					window.sessionStorage.setItem('token', res.data.token);
					axios.defaults.headers.common['x-access-email'] = res.data.email;
					axios.defaults.headers.common['x-access-token'] = res.data.token;
					browserHistory.push('/dashboard');
				}
				that.setState({ notify: true, message: res.data.message })

			});
		}
		else {
			this.setState({
				message: "Please enter a valid email address before attempting to sign in.",
				notify: true
			});
		}
	}

	render() {
		const { emailError, open, message, notify } = this.state; 

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
		    <br/>
		    <RaisedButton 
		    	className={styles.signinbutton} 
		    	label='Sign In' primary={true} 
		    	onClick={this.signin.bind(this)}
	    	/>
		    <br/>
		    <RaisedButton 
		    	className={styles.forgotbutton} 
		    	label='Forgot Password?' 
		    	secondary={true} 
		    	onClick={this.handleOpen.bind(this)}
	    	/>
		   	<ResetPasswordForm 
    			open={open}
    			handleClose={this.handleClose.bind(this)}
    			handleNotification={this.handleNotification.bind(this)}
  			/>
		    <Snackbar
		    	open={notify}
		    	message={message}
		    	autoHideDuration={4000}
		    	onRequestClose={this.closeNotification.bind(this)}
	    	/>
	    </div>
		)
	}
}