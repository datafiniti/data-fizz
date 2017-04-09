import React from 'react';
import '../../static/styles/components/auth.sass';

import Tabs from '../shared/ui/Tabs';
import Pane from '../shared/ui/Pane';

import Signup from './signup';
import Login from './login';

class Auth extends React.Component {
	render() {
		return (
			<div className='auth-page-container'>
				<div className='auth-tabs-container'>
					<Tabs>
						<Pane label="Signup">
							<Signup />
						</Pane>

						<Pane label="Login">
							<Login />
						</Pane>
					</Tabs>
				</div>
			</div>
			
		);
	}
}

export default Auth;