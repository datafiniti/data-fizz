import React from 'react';
import Header from './header/Header.Container';
import Modal from './modals/Modal.Container';
import Tabs from '../../shared/ui/tabs/Tabs';
import Pane from '../../shared/ui/tabs/Pane';

import Details from './sections/details/Details.Component';

import '../../../static/styles/components/users/users.sass';

const Users = ({ user, getNotifications }) => {
	getNotifications();

	return (
		<div className='user-management-container authed-container'>
			<Header />
			<Modal />
			<div className='user-management-tabs-container'>
				<Tabs className='user-management-tabs'>
					<Pane label='details'>
						<Details user={user} />
					</Pane>

					<Pane label='messages'>
						<p>Messages</p>
					</Pane>

					<Pane label='notifications'>
						<p>Notifications</p>
					</Pane>

					<Pane label='settings'>
						<p>Settings</p>
					</Pane>
				</Tabs>
			</div>
		</div>
	);
};


export default Users;