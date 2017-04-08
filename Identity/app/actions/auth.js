import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_COMPLETE = 'USER_SIGN_UP_COMPLETE';
export const SIGNUP_USER_FAILURE = 'USER_SIGN_UP_ERROR';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_COMPLETE = 'LOGIN_USER_COMPLETE';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
 

export function signUpStart(obj) {
	const request = axios.post('/users', obj);

	return {
		type: SIGNUP_USER,
		payload: request,
	};
}

export function signUpComplete(user) {
	return {
		type: SIGNUP_USER_COMPLETE,
		payload: user,
	};
}

export function signUpFailure(error) {
	return {
		type: SIGNUP_USER_FAILURE,
		payload: error,
	};
}

export function loginUser(obj) {
	const request = axios.post('/users/authenticate', obj);
	
	return {
		type: LOGIN_USER,
		payload: request,
	};
}

export function loginComplete(user) {
	return {
		type: LOGIN_USER_COMPLETE,
		payload: user,
	};
}

export function loginFailure(error) {
	return {
		type: LOGIN_USER_FAILURE,
		payload: error,
	};
}