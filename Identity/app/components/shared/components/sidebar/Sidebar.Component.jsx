import React from 'react';
import { Link } from 'react-router';

const Sidebar = ({ isAuthenticated, user }) => {
	if (isAuthenticated) {
		return (
			<div className='sidebar-container'>
				<header className='sidebar-header'>
					<div />
					<p>{user.name}</p>
				</header>

				<div className='sidebar-body'>
					<ul className='sidebar-list'>
						<li><span className='icon-pie_chart' /><Link to='dashboard'>Dashboard</Link></li>
						<li><span className='icon-content_paste' /><Link to='inventory'>Inventory</Link></li>
						<li><span className='icon-trending_up' /><Link to='reports'>Reports</Link></li>
						<li><span className='icon-event_note' /><Link to='orders'>Orders</Link></li>
						<li><span className='icon-person_outline' /><Link to='user-management'>User Details</Link></li>
					</ul>
				</div>
			</div>
		);
	}

	return null;
};

export default Sidebar;