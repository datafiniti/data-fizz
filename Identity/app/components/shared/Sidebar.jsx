import React, { PropTypes } from 'react';

class Sidebar extends React.Component {
	render() {
		if (!this.props.authenticated) {
			return null;
		}

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
}

Sidebar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

export default Sidebar;