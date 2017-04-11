import React, { PropTypes } from 'react';


class Nav extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.user && !nextProps.user.user) {
			this.context.router.push('/');
		}
	}

	render() {
		if (this.props.authenticated) {
			return (
				<nav className='nav'>
					<div className='nav-right'>
						<div className='nav-item nav-user'>
							<div />
							<p>{this.props.user.name}</p>
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

		return (
			<div className='nav-unauthed-nav'>
				<div className='nav-left'>
					<p>Please Login to Continue</p>
				</div>
			</div>
		);
	}
 }

export default Nav;