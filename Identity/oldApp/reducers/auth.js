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
				user: action.payload,
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
				user: action.payload,
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

		case types.ME_FROM_TOKEN:
			return {
				...state,
				status: 'storage',
				error: null,
				loading: false,
			};

		case types.ME_FROM_TOKEN_SUCCESS:
			return {
				...state,
				user: action.payload,
				status: 'authenticated',
				error: null,
				loading: false,
			};

		case types.ME_FROM_TOKEN_FAILURE:
			error = action.payload.data || { message: action.payload.data.res.message };

			return {
				...state,
				user: null,
				status: 'unauthenticated',
				error: error,
				loading: false,
			};

		case types.LOGOUT_USER:
			return {
				...state,
				user: null,
				status: 'unauthenticated',
				error: null,
				loading: false,
			};

		default:
			return state;
	}
}