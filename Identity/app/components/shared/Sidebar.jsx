import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => {
	if (props.authenticated) {
		return (
			<div className='side-bar'>
				<div className='side-bar-header'>
					<p>Header</p>
				</div>

				<div className='side-bar-body'>
					<ul>
						<li><Link to='/dashboard' activeClassName='active-link'>Dashboard</Link></li>
						<li><Link to='/inventory' activeClassName='active-link'>Inventory</Link></li>
						<li><Link to='/reports' activeClassName='active-link'>Reports</Link></li>
						<li><Link to='/orders' activeClassName='active-link'>Orders</Link></li>
						<li><Link to='/user-management' activeClassName='active-link'>User Management</Link></li>
					</ul>
				</div>
			</div>
		);
	} 
	
	return null;	
};


export default Sidebar;