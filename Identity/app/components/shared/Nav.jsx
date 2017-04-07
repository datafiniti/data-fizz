import React, { PropTypes } from 'react';

class Nav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.authenticated) {
			return (
				<nav className='nav unauthed-nav'>
					<div className='nav-left'>
						<div className='nav-item'>
							<p>Please Login to Continue</p>
						</div>
					</div>
				</nav>
			);
		}

		return (
			<nav className='nav'>
				<div className='nav-right'>
					<div className='nav-item nav-user'>
						<div />
						<p>User Name</p>
					</div>

					<div className='nav-item nav-icon'>
						<button>
							Icon
						</button>
					</div>
				</div>
			</nav>
		);
	}
}

Nav.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

export default Nav;