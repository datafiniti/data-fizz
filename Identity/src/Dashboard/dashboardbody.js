import React, { Component } from 'react';
import styles from './dashboard.css';

//Dashboard Component
export default class DashboardBody extends Component {
	constructor(props) {
		super(props);
	};

  render() {
    return (
    	<div id='dashboardbody' className={styles.dashboardbody}>
    	</div>
    );
  }
}