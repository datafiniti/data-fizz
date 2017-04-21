import axios from 'axios'; 
import { loginUserSuccess } from '../../../auth/redux/actions';

export const OPEN_CHANGE_PASSWORD = 'OPEN_CHANGE_PASSWORD';
export const CLOSE_CHANGE_PASSWORD = 'CLOSE_CHANGE_PASSWORD';

export const OPEN_EDIT_USER = 'OPEN_EDIT_USER';
export const CLOSE_EDIT_USER = 'CLOSE_EDIT_USER';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

const currentUser = JSON.parse(window.localStorage.getItem('user'));


export function openChangePassword() {
	return {
		type: OPEN_CHANGE_PASSWORD,
	};
}

export function closeChangePassword() {
	return {
		type: CLOSE_CHANGE_PASSWORD,
	};
}

export function openEditUser() {
	return {
		type: OPEN_EDIT_USER,
	};
}

export function closeEditUser() {
	return {
		type: CLOSE_EDIT_USER,
	};
}

export function changePasswordStart() {
	return {
		type: CHANGE_PASSWORD,
	};
}

export function changePasswordSuccess() {
	return {
		type: CHANGE_PASSWORD_SUCCESS,
	};
}

export function changePasswordFailure(error) {
	return {
		type: CHANGE_PASSWORD_FAILURE,
		payload: error,
	};
}

export function editUserStart() {
	return {
		type: EDIT_USER,
	};
}

export function editUserSuccess() {
	return {
		type: EDIT_USER_SUCCESS,
	};
}

export function editUserFailure(error) {
	return {
		type: EDIT_USER_FAILURE,
		payload: error,
	};
}


// Thunk actions


export function changePasswordFinish(user) {
	return function (dispatch) {
		dispatch(loginUserSuccess(user));
		dispatch(changePasswordSuccess());
	};
}

export function changePassword(data) {
	console.log(data);
	return function (dispatch) {
		dispatch(changePasswordStart);
		return axios.post(`/users/changePassword/${data.email}`, data)
		.then((response) => {
			try {
				const user = JSON.stringify(response.data.res.record);
				window.localStorage.setItem('user', user);
				window.localStorage.setItem('token', response.data.res.token);
				dispatch(changePasswordFinish(response.data.res.record));
			} catch (e) {
				dispatch(changePasswordFailure(e));
			}
		})
		.catch(error => {
			dispatch(changePasswordFailure(error));
		});
	};
}


export function editUserFinish(user) {
	return function (dispatch) {
		dispatch(loginUserSuccess(user));
		dispatch(editUserSuccess());
	};
}

export function editUser(data) {
	return function (dispatch) {
		dispatch(editUserStart());
		return axios.post(`/users/editUser/${currentUser.email}`, data)
		.then((response) => {
			try {
				const user = JSON.stringify(response.data.res.record);
				window.localStorage.setItem('user', user);
				window.localStorage.setItem('token', response.data.res.token);
				dispatch(editUserFinish(response.data.res.record));
			} catch (e) {
				dispatch(editUserFailure(e));
			}
		})
		.catch(error => {
			dispatch(editUserFailure(error));
		});
	};
}

