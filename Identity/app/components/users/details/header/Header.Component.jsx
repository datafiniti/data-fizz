import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Header = ({ user, openPasswordModal, openEditModal }) => {
    return (
        <header className='user-details-header'>
            <div>
                <div className='user-details-header-left'>
                    <h2>{user.name}s Details</h2>
                </div>

                <div className='user-details-header-right'>
                    <Dropdown text='actions' className='user-details-header-options'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={openPasswordModal}>
                                Change Password
                            </Dropdown.Item>
                            <Dropdown.Item onClick={openEditModal}>
                                Edit Profile
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;