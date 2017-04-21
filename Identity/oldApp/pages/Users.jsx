import React from 'react';
import UsersContainer from '../containers/UserManagementContainer';
import '../static/styles/shared/components/product/users.sass';

class Users extends React.Component {
	render() {
		return (
			<div className='user-management-container'>
				<UsersContainer />
			</div>
		);
	}
}

export default Users;