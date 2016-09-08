import React, { Component } from 'react';
import styles from './dashboard.css';
import Paper from 'material-ui/Paper'

//Dashboard Component
export default class ChangePassword extends Component {
	constructor(props) {
		super(props);
	};

  render() {
    return (
    	<Paper zDepth={2} rounded={true} className={styles.change_password}>
	    	<div id='change password'>
	    		<h1 className={styles.header}> Change Your Password </h1>
	    	</div>
    	</Paper>
    );
  }
}