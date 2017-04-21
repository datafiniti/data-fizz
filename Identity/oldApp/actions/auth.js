import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_COMPLETE = 'USER_SIGN_UP_COMPLETE';
export const SIGNUP_USER_FAILURE = 'USER_SIGN_UP_ERROR';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_COMPLETE = 'LOGIN_USER_COMPLETE';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

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

export function meFromToken(storedToken) {
	const request = axios.post(`/users/meFromToken/${storedToken}`, storedToken);

	return {
		type: ME_FROM_TOKEN,
		payload: request,
	};
}

export function meFromTokenSuccess(currentUser) {
	return {
		type: ME_FROM_TOKEN_SUCCESS,
		payload: currentUser,
	};
}

export function meFromTokenFailure(error) {
	return {
		type: ME_FROM_TOKEN_FAILURE,
		payload: error,
	};
}

export function logoutUser(userId) {
	const request = axios.post(`/users/logout/${userId}`);

	return {
		type: LOGOUT_USER,
		payload: request,
	};
}