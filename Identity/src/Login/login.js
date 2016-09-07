import React, { Component } from 'react';
import styles from './login.css';
import SignIn from './signin';
import SignUp from './signup';
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
      				<SignUp />
      			</Tab>
    			</Tabs>
    		</div>
    	</div>
    );
  }
}