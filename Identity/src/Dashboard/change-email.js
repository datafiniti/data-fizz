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


//Dashboard Component
export default class ChangeEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailForm: false
		}
	};

	handleOpen() {
		this.setState({ emailForm: true});
	}
	handleClose() {
		this.setState({ emailForm: false});
	}

  render() {
  	const { emailForm } = this.state;

    return (
    	<Paper zDepth={2} rounded={true} className={styles.change_email} onClick={this.handleOpen.bind(this)}>
	    	<div id='change email' >
	    		<h1 className={styles.header}> Change Your Email </h1>
	    	</div>
	    	<Dialog
	    		title="Change Email Form"
	    		open={emailForm}
	    		onRequestClose={this.handleClose.bind(this)}
    		/>
    	</Paper>
    );
  }
}