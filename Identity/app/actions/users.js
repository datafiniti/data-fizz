import axios from 'axios';

export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';
export const RESET_USER = 'RESET_USER';

export const LOGOUT_USER = 'LOGOUT_USER';

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

export function resetToken() {
	return {
		type: RESET_TOKEN,
	};
}

export function resetUser() {
	return {
		type: RESET_USER,
	};
}

export function logoutUser() {
	return {
		type: LOGOUT_USER,
	};
}

