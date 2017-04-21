import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Header = (props) => {
	return (
		<header className='user-management-header'>
			<div>
				<div className='user-management-header-left'>
					<h2>User Management</h2>
				</div>

				<div className='user-management-header-right'>
					<Dropdown text='actions' className='user-management-header-options'>
						<Dropdown.Menu>
							<Dropdown.Item onClick={props.openChangeModal}>Change Password</Dropdown.Item>
							<Dropdown.Item onClick={props.openEditModal}>Edit Info</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
		</header>
	);
};

export default Header;