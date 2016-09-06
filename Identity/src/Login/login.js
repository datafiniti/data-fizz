import React, { Component } from 'react';
import SignIn from './signin';
import styles from './login.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

injectTapEventPlugin();

//Login Component
export default class Login extends Component {
	constructor(props) {
		super(props);
	};

  render() {
    return (
    	<div id='login' className={styles.login}>
    		<div id='loginContainer' className={styles.loginContainer}>
      		<Tabs className={styles.tabs}>
      			<Tab label='Sign In'>
   						<SignIn />
 						</Tab>
      			<Tab label='Sign Up'>
      				<div className={styles.form}>
	      				<TextField
	      					className={styles.textField}
	      					defaultValue='example@gmail.com'
	      					floatingLabelText="Email"
	  						/>
						    <TextField
						    	className={styles.textField}
						    	defaultValue='Password'
						      floatingLabelText="Password"
						      type="password"
						    />
						    <TextField
						    	className={styles.textField}
						    	defaultValue='Password'
						      floatingLabelText="Re-Enter Password"
						      type="password"
						    />
						    <RaisedButton label='Sign Up' primary={true}/>
					    </div>
      			</Tab>
    			</Tabs>
    		</div>
    	</div>
    );
  }
}