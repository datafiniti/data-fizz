import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import styles from './appbar.css';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';


//Dashboard Component
export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	};

	logout() {
		console.log('starting logout');
		axios.post('/auth/signout')
		.then(function(res) {
			window.sessionStorage.removeItem('token');
			window.sessionStorage.removeItem('email');
			axios.defaults.headers.common['x-access-email'] = null;
			axios.defaults.headers.common['x-access-token'] = null;
			browserHistory.push('/login');
		})
	}

  render() {
    return (
    	<AppBar
		    title={<span>DataFizz</span>}
		    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
		    iconElementRight={<FlatButton label="Logout" onTouchTap={this.logout}/>}
  		/>
    );
  }
}