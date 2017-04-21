import axios from 'axios';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export function changePassword(obj) {
	const request = axios.post(`/users/changePassword/${obj.email}`, obj);

	return {
		type: CHANGE_PASSWORD,
		payload: request,
	};
}

export function changePasswordSuccess(user) {
	return {
		type: CHANGE_PASSWORD_SUCCESS,
		payload: user,
	};
}

export function changePasswordFailure(error) {
	return {
		type: CHANGE_PASSWORD_FAILURE,
		payload: error,
	};
}