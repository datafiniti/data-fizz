import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import styles from './dashboard.scss';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';


export default class ChangeEmailForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			finished: false,
    	stepIndex: 0,
    	email: '',
			emailError: '',
			emailValid: false,
			password: '',
			passwordError: '',
			passwordValid: false,
			newEmail: '',
			newEmailValid: false,
			confirmEmail: '',
			confirmEmailValid: false,
			nextDisabled: true
		}
	}

	static propTypes = {
		open: PropTypes.bool.isRequired,
		handleClose: PropTypes.func.isRequired,
		handleNotification: PropTypes.func.isRequired
	};

	componentWillUpdate(nextProps, nextState) {
    if(nextState.finished) {
    	this.handleSubmit();
    	nextProps.handleClose();
    	this.setState({ finished: false });
    }
  }

	handleNext() {
    const { stepIndex } = this.state;
	    this.setState({
	      stepIndex: stepIndex + 1,
	      finished: stepIndex >= 3,
	      nextDisabled: true
	    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
    this.enableNext();
  };

  handleSubmit() {
  	const { handleNotification } = this.props;
  	const { email, password, newEmail, confirmEmail } = this.state;
  	const that = this;
  	axios.post('/api/changeEmail', {
  		email: email,
  		password: password,
  		newEmail: newEmail,
  		confirmEmail: confirmEmail
  	})
  	.then(function(res){
  		if(res.data.success) {
  			window.sessionStorage.setItem('email', res.data.email);
  			axios.defaults.headers.common['x-access-email'] = res.data.email;
  		}
  		handleNotification(res.data.message);
  		that.setState({
  			stepIndex: 0,
  			email: '',
  			password: '',
  			newEmail: '',
  			confirmEmail: ''
  		});
  	})
  }

  validateEmail(email) {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
	}

	validatePassword(password) {
		if (password.length > 7 ) return true;
		else return false;
	}

  enableNext() {
  	this.setState({
  		nextDisabled: false
  	});
  }

  disableNext() {
  	this.setState({
  		nextDisabled: true
  	});
  }

	emailChange(e) {
		e.preventDefault();
		if(!this.validateEmail(e.target.value)) {
			this.setState({
				email: e.target.value,
				emailError: 'Please enter a valid email.',
				emailValid: false
			});
			this.disableNext()
		}
		else {
			this.setState({
				email: e.target.value,
				emailError: '',
				emailValid: true
			});
			this.enableNext();
		}
	}

	passwordChange(e) {
		e.preventDefault();
		if(!this.validatePassword(e.target.value)) {
			this.setState({
				password: e.target.value,
				passwordError: 'Password must be at least 8 characters long.',
				passwordValid: false
			});
			this.disableNext()
		}
		else{
			this.setState({
				password: e.target.value,
				passwordError: '',
				passwordValid: true
			});
			this.enableNext();
		}
	}

	newEmailChange(e) {
		e.preventDefault();
		if(!this.validateEmail(e.target.value)) {
			this.setState({
				newEmail: e.target.value,
				emailError: 'Please enter a valid email.',
				newEmailValid: false
			});
			this.disableNext()
		}
		else{
			this.setState({
				newEmail: e.target.value,
				emailError: '',
				newEmailValid: true
			});
			this.enableNext();
		}
	}

	confirmEmailChange(e) {
		const { newEmail } = this.state;

		e.preventDefault();
		if(newEmail != e.target.value) {
			this.setState({
				confirmEmail: e.target.value,
				emailError: 'Emails do not match.',
				confirmEmailValid: false
			});
			this.disableNext();
		}
		else{
			this.setState({
				confirmEmail: e.target.value,
				emailError: '',
				confirmEmailValid: true
			});
		}
		this.enableNext();
	}

	getStepContent(stepIndex) {
		const { email, password, newEmail, confirmEmail, emailError, passwordError } = this.state;
    switch (stepIndex) {
      case 0:
        return (
        	<TextField
        		className={styles.textField}
						onChange={this.emailChange.bind(this)}
						value={email}
						floatingLabelText='Email'
						errorText={emailError}
					/>
      	)
      case 1:
	      return (
					<TextField
						className={styles.textField}
			    	onChange={this.passwordChange.bind(this)}
			    	value={password}
			    	type='password'
			      floatingLabelText='Password'
			      errorText={passwordError}
			    />
		    )
      case 2:
        return (
        	<TextField
        		className={styles.textField}
						onChange={this.newEmailChange.bind(this)}
						value={newEmail}
						floatingLabelText='New Email'
						errorText={emailError}
					/>
      	)
      case 3:
        return (
        	<TextField
        		className={styles.textField}
						onChange={this.confirmEmailChange.bind(this)}
						value={confirmEmail}
						floatingLabelText='Confirm New Email'
						errorText={emailError}
					/>
      	)
    	default:
    		return;
    }
  }


  render() {
  	const { open, handleClose} = this.props;
  	const { stepIndex, nextDisabled, finished, notify, message } = this.state;
  	const contentStyle = { width: '80%', maxWidth: 'none' };
  	const actions = [
      <FlatButton
        label='Back'
        disabled={stepIndex === 0}
        primary={true}
        onTouchTap={this.handlePrev.bind(this)}
      />,
      <FlatButton
        label={stepIndex === 3 ? 'Submit' : 'Next'}
        disabled={nextDisabled}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleNext.bind(this)}
      />,
    ];

    return (
    	<Dialog
    		title='Change Email Form'
    		contentStyle={contentStyle}
    		actions={actions}
    		open={open}
    		onRequestClose={handleClose}>
    		<Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Enter Current Email</StepLabel>
          </Step>
          <Step>
            <StepLabel>Enter Current Password</StepLabel>
          </Step>
          <Step>
            <StepLabel>Enter New Email</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm New Email</StepLabel>
          </Step>
        </Stepper>
      	<div className={styles.formField}> { this.getStepContent(stepIndex) } </div>
  		</Dialog>
    );
  }
}