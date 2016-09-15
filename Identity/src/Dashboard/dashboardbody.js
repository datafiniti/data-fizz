import React, { Component } from 'react';
import styles from './dashboard.scss';
import ChangeEmail from './change-email';
import ChangePassword from './change-password';

//Dashboard Component
export default class DashboardBody extends Component {
	constructor(props) {
		super(props);
	};

  render() {
    return (
    	<div id='dashboardbody' className={styles.dashboardbody}>
        <ChangeEmail />
        <ChangePassword />
    	</div>
    );
  }
}