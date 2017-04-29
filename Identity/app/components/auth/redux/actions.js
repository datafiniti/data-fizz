import axios from 'axios';
import { browserHistory } from 'react-router';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_AFTER_SUCCESS = 'SIGNUP_USER_AFTER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const SIGNUP_USER_AFTER_FAILURE = 'SIGNUP_USER_AFTER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_AFTER_SUCCESS = 'LOGIN_USER_AFTER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_AFTER_FAILURE = 'LOGIN_USER_AFTER_FAILURE';

export const LOAD_AUTH_SUCCESS = 'LOAD_AUTH_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';

export const OPEN_FORGOT_PASSWORD = 'OPEN_FORGOT_PASSWORD';
export const CLOSE_FORGOT_PASSWORD = 'CLOSE_FORGOT_PASSWORD';

export const REQUEST_PASSWORD_CHANGE = 'REQUEST_PASSWORD_CHANGE';
export const REQUEST_PASSWORD_SUCCESS = 'REQUEST_PASSWORD_SUCCESS';
export const REQUEST_PASSWORD_FAILURE = 'REQUEST_PASSWORD_FAILURE';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export function signupUserStart() {
	return {
		type: SIGNUP_USER,
	};
}

export function signupUserSuccess(user) {
	return {
		type: SIGNUP_USER_SUCCESS,
		payload: user,
	};
}

export function signupUserAfterSuccess() {
	return {
		type: SIGNUP_USER_AFTER_SUCCESS,
	};
}

export function signupUserFailure(err) {
	return {
		type: SIGNUP_USER_FAILURE,
		payload: err,
	};
}

export function signupUserAfterFailure() {
	return {
		type: SIGNUP_USER_AFTER_FAILURE,
	};
}


export function loginUserStart() {
	return {
		type: LOGIN_USER,
	};
}

export function loginUserSuccess(user) {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: user,
	};
}

export function loginUserAfterSuccess() {
	return {
		type: LOGIN_USER_AFTER_SUCCESS,
	};
}

export function loginUserFailure(err) {
	return {
		type: LOGIN_USER_FAILURE,
		payload: err,
	};
}

export function loginUserAfterFailure() {
	return {
		type: LOGIN_USER_AFTER_FAILURE,
	};
}

export function loadAuth() {
	const user = JSON.parse(window.localStorage.getItem('user'));
	return {
		type: LOAD_AUTH_SUCCESS,
		payload: user,
	};
}

export function loadAuthSuccess(user) {
	return {
		type: LOAD_AUTH_SUCCESS,
		payload: user,
	};
}

export function logoutSuccess() {
	return {
		type: LOGOUT_USER,
	};
}

export function openForgotPassword() {
	return {
		type: OPEN_FORGOT_PASSWORD,
	};
}

export function closeForgotPassword() {
	return {
		type: CLOSE_FORGOT_PASSWORD,
	};
}

export function requestPasswordChange() {
	return {
		type: REQUEST_PASSWORD_CHANGE,
	};
}

export function requestPasswordSuccess() {
	return {
		type: REQUEST_PASSWORD_SUCCESS,
	};
}

export function requestPasswordFailure(error) {
	return {
		type: REQUEST_PASSWORD_FAILURE,
		payload: error,
	};
}

export function resetPassword() {
	return {
		type: RESET_PASSWORD,
	};
}

export function resetPasswordSuccess() {
	return {
		type: RESET_PASSWORD_SUCCESS,
	};
}

export function resetPasswordFailure(error) {
	return {
		type: RESET_PASSWORD_FAILURE,
		payload: error,
	};
}

// helpers

function handleStorage(data) {
	window.localStorage.setItem('user', JSON.stringify(data.record));
	window.localStorage.setItem('token', data.token);
}

// Thunk actions

export function signupUser(data) {
	return dispatch => {
		dispatch(signupUserStart());
		return axios.post('/users', data)
		.then((response) => {
			if (response.data.success) {
				handleStorage(response.data.res);
				dispatch(signupUserSuccess(response.data.res.record));
				browserHistory.push('/details');
				setTimeout(() => {
					dispatch(signupUserAfterSuccess());
				}, 2500);
			} else {
				if (response.data.res.type) {
					return;
				}

				dispatch(signupUserFailure(response.data.res.message));
				setTimeout(() => {
					dispatch(signupUserAfterFailure());
				}, 2500);
			}
		});
	};
}

export function loginUser(data) {
	return dispatch => {
		dispatch(loginUserStart());
		return axios.post('/users/authenticate', data)
		.then((response) => {
			if (response.data.success) {
				handleStorage(response.data.res);
				dispatch(loginUserSuccess(response.data.res.record));
				browserHistory.push('/details');
				setTimeout(() => {
					dispatch(loginUserAfterSuccess());
				}, 2500);				
			} else {
				dispatch(loginUserFailure(response.data.res.message));
				setTimeout(() => {
					dispatch(loginUserAfterFailure());
				}, 2500);
			}
		});
	};
}

export function logoutUser(data) {
	return dispatch => {
		axios.post(`/users/logout/${data}`)
		.then(() => {
			window.localStorage.removeItem('user');
			window.localStorage.removeItem('token');
			dispatch(logoutSuccess());
			browserHistory.push('/login');
		});
	};
}

export function startPasswordReset(data) {
	return dispatch => {
		dispatch(requestPasswordChange());
		return axios.post(`/users/forgotPassword/${data}`, data)
		.then((response) => {
			if (response.data.success) {
				dispatch(requestPasswordSuccess());
			} else {
				dispatch(requestPasswordFailure(response.data.res.message));
			}
		});
	};
}

export function finishPasswordReset(data) {
	return dispatch => {
		dispatch(resetPassword());
		return axios.post('/users/reset', data)
		.then((response) => {
			if (response.data.success) {
				dispatch(resetPasswordSuccess());
			} else {
				dispatch(resetPasswordFailure(response.data.res.message));
			}
		});
	};
}

