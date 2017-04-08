import React, { PropTypes } from 'react';


const Nav = ({ authenticated }) => {
	const renderAuthed = () => {
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
	};

	const renderunAthed = () => {
		return (
			<nav className='nav unauthed-nav'>
				<div className='nav-left'>
					<p>Please Login to Continue</p>
				</div>
			</nav>
		);
	};

	if (authenticated) {
		return renderAuthed();
	} 

	return renderunAthed();
};

Nav.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

export default Nav;