import React, { Component } from 'react';
import styles from './dashboard.css';
import AppBar from './appbar';
import DashboardBody from './dashboardbody';

//Dashboard Component
export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	};

  render() {
    return (
    	<div id='dashboard' className={styles.dashboard}>
        <AppBar />
        <DashboardBody />
    	</div>
    );
  }
}