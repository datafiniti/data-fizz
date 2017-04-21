import React from 'react';
import moment from 'moment';

const Details = ({ user }) => {
	const created = moment(user.created).format('MMMM Do YYYY, h:mm');
	const lastLogin = moment(user.lastLogin).format('MMMM Do YYYY, h:mm');

	return (
		<div className='user-details-container'>
			<div>
				<div className='user-detail'>
					<h3>Name</h3>
					<p>{user.name}</p>
				</div>

				<div className='user-detail'>
					<h3>Username</h3>
					<p>{user.username}</p>
				</div>

				<div className='user-detail'>
					<h3>Email</h3>
					<p>{user.email}</p>
				</div>

				<div className='user-detail'>
					<h3>Created</h3>
					<p>{created}</p>
				</div>

				<div className='user-detail'>
					<h3>Last Log In</h3>
					<p>{lastLogin}</p>
				</div>
			</div>
		</div>
	);
};


export default Details;