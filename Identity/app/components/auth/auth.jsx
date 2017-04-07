import React from 'react';
import '../../static/styles/components/auth.sass';

import Tabs from '../shared/ui/Tabs';
import Pane from '../shared/ui/Pane';

import Signup from './signup';

class Auth extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			signup: true,
			login: false,
		};
	}

	render() {
		return (
			<div className='auth-page-container'>
				<Tabs>
					<Pane label="Signup">
						<Signup />
					</Pane>

					<Pane label="Login">
						<div><p>Login Stuff</p></div>
					</Pane>
				</Tabs>
			</div>
			
		);
	}
}

export default Auth;