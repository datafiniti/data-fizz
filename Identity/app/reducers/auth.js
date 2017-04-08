import * as types from '../actions/auth';

const INITIAL_STATE = {
	user: null,
	loading: false,
	error: null,
	isAuthenticated: false,
};

export default function authReducer(state = INITIAL_STATE, action) {
	let error;

	switch (action.type) {
		case types.SIGNUP_USER:
			return {
				...state,
				loading: true,
			};

		case types.SIGNUP_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: true,
			};

		case types.SIGNUP_USER_FAILURE:
			error = action.payload.data || { message: action.payload.message };
			return {
				...state,
				loading: false,
				error: error,
			};

		default:
			return state;
	}
}