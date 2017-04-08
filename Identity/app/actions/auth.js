import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_COMPLETE = 'USER_SIGN_UP_COMPLETE';
export const SIGNUP_USER_FAILURE = 'USER_SIGN_UP_ERROR';


export function signUpStart(obj) {
	const request = axios.post('/users', obj);
	console.log(obj);
	
	return {
		type: SIGNUP_USER,
		payload: request,
	};
}

export function signUpComplete(obj) {
	return {
		type: SIGNUP_USER_COMPLETE,
		payload: obj.user,
	};
}

export function signUpFailure(error) {
	return {
		type: SIGNUP_USER_FAILURE,
		payload: error,
	};
}