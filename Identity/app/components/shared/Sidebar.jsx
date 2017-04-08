import React, { PropTypes } from 'react';

const Sidebar = ({ authenticated }) => {
	if (authenticated) {
		return (
			<div className='side-bar'>
				<div className='side-bar-header'>
					<p>Header</p>
				</div>

				<div className='side-bar-body'>
					<p>Body</p>
				</div>
			</div>
		);
	}

	return null;
};

Sidebar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

export default Sidebar;