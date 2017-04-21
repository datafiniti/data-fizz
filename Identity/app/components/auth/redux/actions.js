import axios from 'axios';
import { browserHistory } from 'react-router';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOAD_AUTH_SUCCESS = 'LOAD_AUTH_SUCCESS';

export const LOGOUT_USER = 'LOGOUT_USER';

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

export function signupUserFailure(err) {
	return {
		type: SIGNUP_USER_FAILURE,
		payload: err,
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

export function loginUserFailure(err) {
	return {
		type: LOGIN_USER_FAILURE,
		payload: err,
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

// Thunk actions

export function signupUser(data) {
	return function (dispatch) {
		dispatch(signupUserStart);
		return axios.post('/users', data)
		.then((response) => {
			try {
				window.localStorage.setItem('user', JSON.stringify(response.data.res.record));
				window.localStorage.setItem('token', response.data.res.token);
				dispatch(signupUserSuccess(response.data.res.record));
				browserHistory.push('/user-management');
			} catch (e) {
				dispatch(signupUserFailure(e));
			}
		})
		.catch(error => {
			dispatch(signupUserFailure(error));
		});
	};
}

export function loginUser(data) {
	return function (dispatch) {
		dispatch(loginUserStart);
		return axios.post('/users/authenticate', data)
		.then((response) => {
			try {
				window.localStorage.setItem('user', JSON.stringify(response.data.res.record));
				window.localStorage.setItem('token', response.data.res.token);
				dispatch(loginUserSuccess(response.data.res.record));
				browserHistory.push('/user-management');
			} catch (e) {
				dispatch(loginUserFailure(e));
			}
		})
		.catch(error => {
			dispatch(loginUserFailure(error));
		});
	};
}

export function loadAuth() {
	const user = JSON.parse(window.localStorage.getItem('user'));
	return {
		type: LOAD_AUTH_SUCCESS,
		payload: user,
	};
}

export function logoutUser(data) {
	return function (dispatch) {
		axios.post(`/users/logout/${data}`)
		.then(() => {
			window.localStorage.removeItem('user');
			window.localStorage.removeItem('token');
			dispatch(logoutSuccess());
			browserHistory.push('/');
		});
	};
}