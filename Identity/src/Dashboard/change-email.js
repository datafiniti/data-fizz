import React, { Component } from 'react';
import styles from './dashboard.css';
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
import ChangeEmailForm from './change-email-form';


//Dashboard Component
export default class ChangeEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			notify: false,
			message: ''
		}
	};

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
  	this.setState({ notify: false })
  }

  render() {
  	const { open, notify, message } = this.state;

    return (
    	<Paper zDepth={2} rounded={true} className={styles.change_email} onClick={this.handleOpen.bind(this)}>
	    	<div id='change password'>
	    		<h1 className={styles.header}> Change Your Email </h1>
	    	</div>
    		<ChangeEmailForm 
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
    	</Paper>
    );
  }
}