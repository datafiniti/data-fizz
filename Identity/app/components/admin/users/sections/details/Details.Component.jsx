import React from 'react';

const Details = ({ user }) => {
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
					<p>{user.created}</p>
				</div>

				<div className='user-detail'>
					<h3>Last Log In</h3>
					<p>{user.lastLogin}</p>
				</div>
			</div>
		</div>
	);
};


export default Details;