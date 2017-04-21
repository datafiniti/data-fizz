import React from 'react';

const Nav = ({ isAuthenticated, user }) => {
	const renderNonAuthed = () => {
		return (
			<div className='nav-right'>
				<div className='nav-item'>
					<button>Signup</button>
				</div>

				<div className='nav-item'>
					<button>Login</button>
				</div>
			</div>
		);
	};

	const renderAuthed = () => {
		return (
			<div className='nav-right'>
				<div className='nav-item nav-user'>
					<div />
					<p>{user.name}</p>
				</div>

				<div className='nav-item'>
					<button>
						Icon
					</button>
				</div>
			</div>
		);
	};

	return (
		<nav className='nav'>
			{!isAuthenticated ? renderNonAuthed() : renderAuthed()}
		</nav>
	);
};

export default Nav;