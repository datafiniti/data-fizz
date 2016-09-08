import React, { Component } from 'react';
import styles from './login.css';
import SignIn from './signin';
import SignUp from './signup';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


//Login Component
export default class Login extends Component {
	constructor(props) {
		super(props);
	};

  render() {
    return (
    	<div id='login' className={styles.login}>
    		<div id='loginContainer' className={styles.loginContainer}>
          <Paper zDepth={2} rounded={true}>
        		<Tabs className={styles.tabs} style={{"border-radius": "10px"}}>
        			<Tab label='Sign In'>
     						<SignIn />
   						</Tab>
        			<Tab label='Sign Up'>
        				<SignUp />
        			</Tab>
      			</Tabs>
          </Paper>
    		</div>
    	</div>
    );
  }
}