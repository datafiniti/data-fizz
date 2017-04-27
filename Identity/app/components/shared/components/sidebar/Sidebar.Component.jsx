import React from 'react';
import { Link } from 'react-router';

const Sidebar = ({ isAuthenticated, user, attemptLogout }) => {
	if (isAuthenticated) {
		const logout = () => {
			attemptLogout(user._id);
		};

		return (
			<div className='sidebar-container'>
				<header className='sidebar-header'>
					<div />
					<p>{user.name}</p>
				</header>

				<div className='sidebar-body'>
					<ul className='sidebar-list'>
						<li><span className='icon-pie_chart' /><Link to='details'>Details</Link></li>
						<li><span className='icon-content_paste' /><Link to='notifications'>Notifications</Link></li>
						<li><span className='icon-trending_up' /><Link to='messages'>Messages</Link></li>
						<li><span className='icon-event_note' /><Link to='settings'>Settings</Link></li>
						<li><button onClick={logout} type='button'>Logout</button></li>
					</ul>
				</div>
			</div>
		);
	}

	return null;
};

export default Sidebar;