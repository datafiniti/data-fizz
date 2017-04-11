import React from 'react';

const Header = (props) => {
	return (
		<div className='user-header'>
			<div className='user-header-info'>
				<div />
				<button>
					{props.user.email}
				</button>
			</div>
		</div>
	);
};

export default Header;