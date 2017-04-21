import axios from 'axios';

const EDIT_EMAIL = 'EDIT_EMAIL';
const EDIT_EMAIL_SUCCESS = 'EDIT_EMAIL';
const EDIT_EMAIL_FAILURE = 'EDIT_EMAIL_FAILURE';

export function editEmail(obj) {
	const request = axios.post(`users/changeEmail/${obj}`, obj);

	return {
		type: EDIT_EMAIL,
		payload: request,
	};
}

export function editEmailSuccess(user) {
	return {
		type: EDIT_EMAIL_SUCCESS,
		payload: user,
	};
}

export function editEmailFailure(error) {
	return {
		type: EDIT_EMAIL_FAILURE,
		payload: error,
	};
}