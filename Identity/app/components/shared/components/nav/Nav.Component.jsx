import React from 'react';
import { Link } from 'react-router';

const Nav = ({ isAuthenticated, user }) => {
	const renderNonAuthed = () => {
		return (
			<div className='nav-right'>
				<div className='nav-item'>
					<Link to='signup'><button>Signup</button></Link>
				</div>

				<div className='nav-item'>
					<Link to='login'><button>Login</button></Link>
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