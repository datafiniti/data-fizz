import React, { Component } from 'react';
import styles from './signin.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	render() {
		return(
			<div className={styles.form}>
				<TextField
					className={styles.textField}
					value={this.state.email}
					floatingLabelText="Email"
					type='email'
					/>
		    <TextField
		    	className={styles.textField}
		    	value={this.state.password}
		      floatingLabelText="Password"
		      type="password"
		    />
		    <RaisedButton label='Sign In' primary={true}/>
	    </div>
		)
	}
}