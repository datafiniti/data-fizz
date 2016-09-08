import React, { Component } from 'react';
import styles from './dashboard.css';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


//Dashboard Component
export default class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			passwordForm: false
		}
	};

	handleOpen() {
		this.setState({ passwordForm: true});
	}
	handleClose() {
		this.setState({ passwordForm: false});
	}

  render() {
  	const { passwordForm } = this.state;

    return (
    	<Paper zDepth={2} rounded={true} className={styles.change_password} onClick={this.handleOpen.bind(this)}>
	    	<div id='change password'>
	    		<h1 className={styles.header}> Change Your Password </h1>
	    	</div>
	    	<Dialog
	    		title="Change Password Form"
	    		open={passwordForm}
	    		onRequestClose={this.handleClose.bind(this)}
    		/>
    	</Paper>
    );
  }
}