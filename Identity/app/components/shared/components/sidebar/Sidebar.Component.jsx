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
						<li><span className='icon-person_outline' /><Link to='details'>Details</Link></li>
						<li><span className='icon-notifications_none' /><Link to='notifications'>Notifications</Link></li>
						<li><span className='icon-chat_bubble_outline' /><Link to='messages'>Messages</Link></li>
						<li><span className='icon-build' /><Link to='settings'>Settings</Link></li>
						<li><span className='icon-navigate_before' /><button onClick={logout} type='button'>Logout</button></li>
					</ul>
				</div>
			</div>
		);
	}

	return null;
};

export default Sidebar;