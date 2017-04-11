import * as types from '../actions/auth';

const INITIAL_STATE = {
	user: null,
	loading: false,
	error: null,
	status: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
	let error;

	switch (action.type) {
		case types.SIGNUP_USER:
			return {
				...state,
				loading: true,
			};

		case types.SIGNUP_USER_COMPLETE:
			return {
				...state,
				user: action.payload.user,
				status: 'authenticated',
				loading: false,
			};

		case types.SIGNUP_USER_FAILURE:
			error = action.payload.data || { message: action.payload.message };
			return {
				...state,
				loading: false,
				error: error,
			};

		case types.LOGIN_USER: 
			return {
				...state,
				loading: true,
			};

		case types.LOGIN_USER_COMPLETE:
			return {
				...state,
				user: action.payload.user,
				status: 'authenticated',
				loading: false,
			};

		case types.LOGIN_USER_FAILURE:
			error = action.payload.data || { message: action.payload.message };
			return {
				...state,
				loading: false,
				error: error,
			};

		case types.IS_AUTHED:
			return {
				...state,
				status: 'authenticated',
				user: action.payload.user,
			};

		default:
			return state;
	}
}