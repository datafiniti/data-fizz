import React, { Component } from 'react';
import styles from './dashboard.css';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ChangePasswordForm from './change-password-form';


//Dashboard Component
export default class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	};

		handleOpen() {
		this.setState({ open: true});
	}
	handleClose() {
		this.setState({ open: false});
	}

  render() {
  	const { open } = this.state;

    return (
    	<Paper zDepth={2} rounded={true} className={styles.change_password} onClick={this.handleOpen.bind(this)}>
	    	<div id='change password'>
	    		<h1 className={styles.header}> Change Your Password </h1>
	    	</div>
	    		<ChangePasswordForm open={open}/>
    	</Paper>
    );
  }
}