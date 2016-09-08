import React, { Component } from 'react';
import styles from './dashboard.css';
import Paper from 'material-ui/Paper'

//Dashboard Component
export default class ChangeEmail extends Component {
	constructor(props) {
		super(props);
	};

  render() {
    return (
    	<Paper zDepth={2} rounded={true} className={styles.change_email}>
	    	<div id='change email' >
	    		<h1 className={styles.header}> Change Your Email </h1>
	    	</div>
    	</Paper>
    );
  }
}