import React from 'react';
import { connect } from 'react-redux';

import forgotpassword from '../../auth/forgotpassword';

const modalConstructor = (props) => {
	switch (props.currentModal) {
		case 'FORGOT_PASSWORD':
			return <forgotpassword {...props} />;

		default:
			return null;
	}
}

